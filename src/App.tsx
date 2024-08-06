// import { useState } from 'react'
import { LandingPrimaryImageCtaSection } from './components/landing/cta/LandingPrimaryCta'
import { Button } from '@/components/shared/ui/button';
import { LandingProductFeature } from './components/landing/LandingProductFeature';
import { LandingProductFeatureKeyPoints } from './components/landing/LandingProductFeatureKeyPoints';
import { Tweet } from 'react-tweet';
import { LandingMarquee } from './components/landing/LandingMarquee';
import Backtesting from './components/landing/Backtesting';

const keyPoints = [
  {
    title: 'Fast',
    description:
      'Capture screenshots in seconds. No more waiting. No more fiddling with scripts.',
  },
  {
    title: 'Secure',
    description:
      '100% encrypted and secure. Your data is safe with us, always. Privacy first.',
  },
  {
    title: 'Support',
    description:
      '24/7 customer support. We are here to help you at any time of the day. Just ask.',
  },
];

function App() {
  return (
    <>
      <div style={{ width: '100%' }}>
        <LandingPrimaryImageCtaSection
          title="Stop roundtripping... please"
          description="Get 10x more done with Shadcn UI, React & Next.js, and say goodbye to repetitive tasks. You'll never go back."
          imageSrc='/ctaImage.png'
          imageAlt='cta-image'
          variant='primary'
          withBackground={true}
          withBackgroundGlow={true}
          backgroundGlowVariant='primary'
        >
          <Button size="xl" asChild>
            <a href="#" className='text-white'>Test Strategies</a>
          </Button>
        </LandingPrimaryImageCtaSection>
        
        <div>
          <LandingMarquee animationDirection='right'>
        
            <Tweet id="1820298304028090650" />
            <Tweet id="1819390987812135258" />
            <Tweet id="1820298304028090650" />
            <Tweet id="1820298304028090650" />
          </LandingMarquee>
        </div>


        <LandingProductFeature
          title="Crystal clear captures"
          descriptionComponent={
            <>
              <LandingProductFeatureKeyPoints keyPoints={keyPoints} />
            </>
          }
          imageSrc="/ctaImage.png"
          imageAlt="Screenshot of the product"
          imagePosition="left"
          imagePerspective="right"
        />

        <Backtesting/>
      </div>



    </>
  )
}

export default App
