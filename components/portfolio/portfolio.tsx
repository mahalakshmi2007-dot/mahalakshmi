'use client'

import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { IntroContext } from '@/lib/motion'
import { About } from './about'
import { Certifications } from './certifications'
import { Contact } from './contact'
import { CustomCursor } from './custom-cursor'
import { Education } from './education'
import { Experience } from './experience'
import { Footer } from './footer'
import { Hero } from './hero'
import { IntroLoader } from './intro-loader'
import { Navbar } from './navbar'
import { Projects } from './projects'
import { ResumeCta } from './resume-cta'
import { SiteBackground } from './site-background'
import { Skills } from './skills'

export function Portfolio() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <IntroLoader onDone={() => setIntroDone(true)} />
        <CustomCursor />
        <SiteBackground />
        <Navbar />
        <main id="main" className="relative">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Education />
          <ResumeCta />
          <Contact />
        </main>
        <Footer />
      </IntroContext.Provider>
    </MotionConfig>
  )
}
