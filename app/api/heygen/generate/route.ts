import { NextResponse } from 'next/server'
import { generateHeyGenVideo } from '@/lib/heygen'

export async function POST() {
  try {
    const result = await generateHeyGenVideo()
    return NextResponse.json(result)
  } catch (error) {
    console.error('[heygen] Video generation failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to generate HeyGen video' },
      { status: 500 }
    )
  }
}
