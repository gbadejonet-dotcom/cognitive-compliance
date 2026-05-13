import fs from 'fs'
import path from 'path'

export type HeyGenVideoStatus = 'pending' | 'waiting' | 'processing' | 'completed' | 'failed'

export interface HeyGenStatusResult {
  video_id: string
  status: HeyGenVideoStatus | string
  video_url?: string
  thumbnail_url?: string
  error?: string
}

const HEYGEN_API_BASE_URL = 'https://api.heygen.com'
const MAX_SCENE_TEXT_LENGTH = 4500
const SCRIPT_PATH = path.join(
  process.cwd(),
  'content/video/ownership-structures-documentary-heygen.md'
)

const SPOKEN_SECTION_HEADINGS = new Set([
  '### Voiceover',
  '### Presenter script',
  '### Final narration',
])

export function getHeyGenDocumentaryScript() {
  const markdown = fs.readFileSync(SCRIPT_PATH, 'utf8')
  const spokenScript = extractSpokenScript(markdown)
  const scenes = splitIntoHeyGenScenes(spokenScript)

  return {
    markdown,
    spokenScript,
    scenes,
  }
}

function extractSpokenScript(markdown: string): string {
  const lines = markdown.split('\n')
  const spokenLines: string[] = []
  let isCapturing = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (SPOKEN_SECTION_HEADINGS.has(trimmed)) {
      isCapturing = true
      continue
    }

    if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      isCapturing = false
      continue
    }

    if (!isCapturing) continue
    if (!trimmed || trimmed === '---') continue
    if (trimmed.startsWith('`') && trimmed.endsWith('`')) continue

    spokenLines.push(trimmed)
  }

  return spokenLines.join('\n\n')
}

function splitIntoHeyGenScenes(script: string): string[] {
  const paragraphs = script
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const scenes: string[] = []
  let current = ''

  for (const paragraph of paragraphs) {
    if (paragraph.length > MAX_SCENE_TEXT_LENGTH) {
      if (current) {
        scenes.push(current)
        current = ''
      }
      scenes.push(...splitLongParagraph(paragraph))
      continue
    }

    const candidate = current ? `${current}\n\n${paragraph}` : paragraph
    if (candidate.length > MAX_SCENE_TEXT_LENGTH) {
      scenes.push(current)
      current = paragraph
    } else {
      current = candidate
    }
  }

  if (current) scenes.push(current)
  return scenes
}

function splitLongParagraph(paragraph: string): string[] {
  const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [paragraph]
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences.map((item) => item.trim()).filter(Boolean)) {
    const candidate = current ? `${current} ${sentence}` : sentence
    if (candidate.length > MAX_SCENE_TEXT_LENGTH) {
      if (current) chunks.push(current)
      current = sentence
    } else {
      current = candidate
    }
  }

  if (current) chunks.push(current)
  return chunks
}

export function buildHeyGenGeneratePayload(avatarId: string, voiceId: string, scenes: string[]) {
  return {
    title: 'Ownership Structures: Defensible Understanding in Modern KYC',
    caption: true,
    video_inputs: scenes.map((inputText) => ({
      character: {
        type: 'avatar',
        avatar_id: avatarId,
        avatar_style: 'normal',
      },
      voice: {
        type: 'text',
        input_text: inputText,
        voice_id: voiceId,
        speed: 0.92,
      },
      background: {
        type: 'color',
        value: '#0f172a',
      },
    })),
    dimension: {
      width: 1280,
      height: 720,
    },
  }
}

function getHeyGenApiKey() {
  const apiKey = process.env.HEYGEN_API_KEY
  if (!apiKey) {
    throw new Error('HEYGEN_API_KEY is not configured')
  }
  return apiKey
}

export async function generateHeyGenVideo() {
  const apiKey = getHeyGenApiKey()
  const avatarId = process.env.HEYGEN_AVATAR_ID
  const voiceId = process.env.HEYGEN_VOICE_ID

  if (!avatarId || !voiceId) {
    throw new Error('HEYGEN_AVATAR_ID and HEYGEN_VOICE_ID must be configured')
  }

  const { scenes } = getHeyGenDocumentaryScript()

  if (scenes.length === 0) {
    throw new Error('No spoken documentary script scenes were found')
  }

  if (scenes.length > 50) {
    throw new Error('HeyGen supports a maximum of 50 scenes per generation request')
  }

  const response = await fetch(`${HEYGEN_API_BASE_URL}/v2/video/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(buildHeyGenGeneratePayload(avatarId, voiceId, scenes)),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(getHeyGenErrorMessage(payload, `HeyGen generation failed (${response.status})`))
  }

  const videoId = payload?.data?.video_id ?? payload?.video_id
  if (!videoId || typeof videoId !== 'string') {
    throw new Error('HeyGen generation response did not include a video_id')
  }

  return {
    video_id: videoId,
    scene_count: scenes.length,
  }
}

export async function getHeyGenVideoStatus(videoId: string): Promise<HeyGenStatusResult> {
  const apiKey = getHeyGenApiKey()
  const response = await fetch(
    `${HEYGEN_API_BASE_URL}/v1/video_status.get?video_id=${encodeURIComponent(videoId)}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    }
  )

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      getHeyGenErrorMessage(payload, `HeyGen status check failed (${response.status})`)
    )
  }

  const data = payload?.data ?? payload
  return {
    video_id: videoId,
    status: data?.status ?? 'pending',
    video_url: data?.video_url,
    thumbnail_url: data?.thumbnail_url,
    error: data?.error?.message ?? data?.error,
  }
}

function getHeyGenErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') return fallback

  const body = payload as {
    error?: string | { message?: string }
    message?: string
    data?: { error?: string | { message?: string } }
  }

  if (typeof body.error === 'string') return body.error
  if (typeof body.error?.message === 'string') return body.error.message
  if (typeof body.message === 'string') return body.message
  if (typeof body.data?.error === 'string') return body.data.error
  if (typeof body.data?.error?.message === 'string') return body.data.error.message

  return fallback
}
