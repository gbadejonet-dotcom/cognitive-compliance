import { Container } from '@/components/shared/Container'
import { Badge } from '@/components/ui/badge'
import { HeyGenVideoGenerator } from '@/components/video-generator/HeyGenVideoGenerator'
import { getHeyGenDocumentaryScript } from '@/lib/heygen'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'HeyGen Video Generator',
  description:
    'Generate the Cognitive Compliance ownership structures documentary through HeyGen using secure server-side API routes.',
  path: '/video-generator',
})

export default function VideoGeneratorPage() {
  const { markdown, spokenScript, scenes } = getHeyGenDocumentaryScript()

  return (
    <>
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="dark" className="mb-4">
              Internal production workflow
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              HeyGen documentary generator
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Load the cinematic ownership-structures documentary script, trigger a secure HeyGen
              generation request, save the returned video ID, and poll until the final video URL is
              ready.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <HeyGenVideoGenerator
            script={markdown}
            spokenScript={spokenScript}
            sceneCount={scenes.length}
          />
        </Container>
      </section>
    </>
  )
}
