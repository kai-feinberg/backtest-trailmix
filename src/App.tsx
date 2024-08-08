// import { useState } from 'react'
import { LandingPrimaryImageCtaSection } from './components/landing/cta/LandingPrimaryCta'
import { Button } from '@/components/shared/ui/button';
import { LandingProductFeature } from './components/landing/LandingProductFeature';
import { LandingProductFeatureKeyPoints } from './components/landing/LandingProductFeatureKeyPoints';
import { Tweet } from 'react-tweet';
import { LandingMarquee } from './components/landing/LandingMarquee';
import Backtesting from './components/landing/Backtesting';
import LogoWhite from './components/landing/logo-white';

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
  const scrollDown = () => {
    const backtestingDiv = document.getElementById('backtesting');
    if (backtestingDiv) {
      backtestingDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className="bg-gray-600 flex justify-center p-6 w-[80%]">
          <div className='flex justify-start'>
            <LogoWhite />
          </div>
        </div>
        <LandingPrimaryImageCtaSection
          title="Stop roundtripping... please"
          description="Find the strategy that works for you. Take profits, cut losses, and make it to the otherside. You got this!"
          imageSrc='/ctaImage.png'
          imageAlt='cta-image'
          variant='primary'
          withBackground={true}
          withBackgroundGlow={true}
          backgroundGlowVariant='primary'
        >
          <Button size="xl" asChild onClick={scrollDown}>
            <a className='text-white'>Test Strategies</a>
          </Button>
        </LandingPrimaryImageCtaSection>

        <div >
          <LandingMarquee animationDirection='right' >
            <Tweet id="1816277195691810931" />
            <Tweet id="1798967005728694550" />
            <Tweet id="1785293845808525520" />
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

        <div id="backtesting">
          <Backtesting />
        </div>
      </div>

      <div className="mb-8">
      </div>


    </>
  )
}

export default App
