import { NextRequest, NextResponse } from 'next/server'
import { getHeyGenVideoStatus } from '@/lib/heygen'

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('video_id')

  if (!videoId) {
    return NextResponse.json({ error: 'video_id is required' }, { status: 400 })
  }

  try {
    const result = await getHeyGenVideoStatus(videoId)
    return NextResponse.json(result)
  } catch (error) {
    console.error('[heygen] Video status check failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to check HeyGen video status' },
      { status: 500 }
    )
  }
}
