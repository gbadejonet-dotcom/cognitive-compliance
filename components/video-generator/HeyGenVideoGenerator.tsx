'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, PlayCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HeyGenVideoGeneratorProps {
  script: string
  spokenScript: string
  sceneCount: number
}

type StatusState = 'idle' | 'generating' | 'polling' | 'completed' | 'failed'

interface StatusResponse {
  video_id: string
  status: string
  video_url?: string
  thumbnail_url?: string
  error?: string
}

const SAVED_VIDEO_ID_KEY = 'cognitive-compliance-heygen-video-id'
const POLL_INTERVAL_MS = 15000

export function HeyGenVideoGenerator({
  script,
  spokenScript,
  sceneCount,
}: HeyGenVideoGeneratorProps) {
  const [videoId, setVideoId] = useState('')
  const [status, setStatus] = useState<StatusState>('idle')
  const [heyGenStatus, setHeyGenStatus] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastCheckedAt, setLastCheckedAt] = useState('')
  const pollTimeoutRef = useRef<number | null>(null)

  const wordCount = useMemo(
    () => spokenScript.trim().split(/\s+/).filter(Boolean).length,
    [spokenScript]
  )

  useEffect(() => {
    const savedVideoId = window.localStorage.getItem(SAVED_VIDEO_ID_KEY)
    if (savedVideoId) {
      setVideoId(savedVideoId)
      void checkStatus(savedVideoId, true)
    }

    return () => {
      if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current)
    }
  }, [])

  async function generateVideo() {
    setStatus('generating')
    setErrorMessage('')
    setVideoUrl('')
    setHeyGenStatus('')

    try {
      const response = await fetch('/api/heygen/generate', {
        method: 'POST',
      })
      const body = await response.json()

      if (!response.ok) {
        setStatus('failed')
        setErrorMessage(body.error ?? 'Unable to start HeyGen generation')
        return
      }

      setVideoId(body.video_id)
      window.localStorage.setItem(SAVED_VIDEO_ID_KEY, body.video_id)
      await checkStatus(body.video_id, true)
    } catch (error) {
      setStatus('failed')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start HeyGen generation')
    }
  }

  async function checkStatus(currentVideoId = videoId, shouldContinuePolling = false) {
    if (!currentVideoId) return

    setStatus((currentStatus) => (currentStatus === 'completed' ? currentStatus : 'polling'))
    setErrorMessage('')

    try {
      const response = await fetch(
        `/api/heygen/status?video_id=${encodeURIComponent(currentVideoId)}`
      )
      const body: StatusResponse | { error?: string } = await response.json()
      const checkedAt = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setLastCheckedAt(checkedAt)

      if (!response.ok) {
        setStatus('failed')
        setErrorMessage(body.error ?? 'Unable to check HeyGen status')
        return
      }

      const result = body as StatusResponse
      setHeyGenStatus(result.status)

      if (result.status === 'completed' && result.video_url) {
        setStatus('completed')
        setVideoUrl(result.video_url)
        return
      }

      if (result.status === 'failed') {
        setStatus('failed')
        setErrorMessage(result.error ?? 'HeyGen reported that video generation failed')
        return
      }

      if (shouldContinuePolling) {
        if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current)
        pollTimeoutRef.current = window.setTimeout(() => {
          void checkStatus(currentVideoId, true)
        }, POLL_INTERVAL_MS)
      }
    } catch (error) {
      setStatus('failed')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to check HeyGen status')
    }
  }

  function clearSavedVideo() {
    if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current)
    window.localStorage.removeItem(SAVED_VIDEO_ID_KEY)
    setVideoId('')
    setStatus('idle')
    setHeyGenStatus('')
    setVideoUrl('')
    setErrorMessage('')
    setLastCheckedAt('')
  }

  const isWorking = status === 'generating' || status === 'polling'

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Loaded from content/video</Badge>
            <Badge variant="secondary">{sceneCount} HeyGen scenes</Badge>
            <Badge variant="secondary">{wordCount.toLocaleString('en-GB')} spoken words</Badge>
          </div>
          <CardTitle className="mt-3">Documentary source script</CardTitle>
          <CardDescription>
            This page loads the canonical Markdown script from the repository and sends the
            extracted spoken narration to HeyGen via secure server-side API routes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[680px] overflow-auto rounded-lg border border-slate-200 bg-slate-950 p-5 text-sm leading-relaxed text-slate-200">
            <pre className="whitespace-pre-wrap font-mono">{script}</pre>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <Badge variant="dark" className="w-fit border-slate-600 bg-slate-800">
              HeyGen workflow
            </Badge>
            <CardTitle className="text-white">Generate in HeyGen</CardTitle>
            <CardDescription className="text-slate-300">
              Starts a server-side request to HeyGen&apos;s video generation API using the
              configured avatar and voice environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button size="lg" className="w-full" disabled={isWorking} onClick={generateVideo}>
              {isWorking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {status === 'generating' ? 'Generating…' : 'Polling status…'}
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Generate in HeyGen
                </>
              )}
            </Button>

            {videoId && (
              <div className="rounded-lg border border-slate-700 bg-slate-950 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Saved video ID
                </div>
                <div className="mt-1 break-all font-mono text-sm text-slate-100">{videoId}</div>
              </div>
            )}

            {videoId && (
              <div className="flex gap-3">
                <Button
                  variant="outline-white"
                  className="flex-1"
                  disabled={isWorking}
                  onClick={() => checkStatus(videoId, true)}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Check status
                </Button>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={clearSavedVideo}
                >
                  Clear
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>
              The browser polls this app&apos;s API route; the API route talks to HeyGen with the
              private key.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Workflow
                </div>
                <div className="mt-1 font-medium capitalize text-slate-900">{status}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  HeyGen
                </div>
                <div className="mt-1 font-medium text-slate-900">
                  {heyGenStatus || 'Not started'}
                </div>
              </div>
            </div>

            {lastCheckedAt && (
              <p className="text-xs text-slate-500">Last status check: {lastCheckedAt}</p>
            )}

            {status === 'completed' && videoUrl && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-green-950">Video ready</h3>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block break-all text-sm font-medium text-green-800 underline"
                    >
                      {videoUrl}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-red-950">Generation issue</h3>
                    <p className="mt-1 text-sm text-red-800">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
