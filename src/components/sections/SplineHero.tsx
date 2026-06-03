import { SplineLoader, HeroPlaceholder } from '@/components/ui/SplineLoader'

interface SplineHeroProps {
  onLoad?: () => void
}

export default function SplineHero({ onLoad }: SplineHeroProps) {
  return (
    <SplineLoader
      scene="https://prod.spline.design/Muui7g5HLutyfcP4/scene.splinecode"
      rootMargin="0px"
      width="100%"
      height="100%"
      onLoad={onLoad}
      placeholder={<HeroPlaceholder />}
    />
  )
}
