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
    title: 'Flexible',
    description:
      'Pick from a variety of popular coins to test your skills',
  },
  {
    title: 'Simple',
    description:
      'Each strategy comes with an explanation and pros and cons list',
  },
  {
    title: 'Applicable',
    description:
      'Easy guides to get started and a community to help you along the way',
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

            <Tweet id="1816277195691810931" />
            <Tweet id="1798967005728694550" />
            <Tweet id="1785293845808525520" />
            <Tweet id="1779435680193556628" />
            <Tweet id="1779261503599702235" />
            <Tweet id="1775965959448154420" />
            <Tweet id="1775218912252367240" />

          </LandingMarquee>
        </div>


        <LandingProductFeature
          title="Battle test your strategies"
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

        <Backtesting />
      </div>
      
      <div className="mb-8">
      </div>


    </>
  )
}

export default App
