import React, { useEffect, useRef, useState } from 'react';
import gamestackTexture2Large from '~/assets/FormFixer_home.jpg';
import gamestackTexture2Placeholder from '~/assets/FormFixer_home.jpg';
import gamestackTexture2 from '~/assets/FormFixer_home.jpg';
import gamestackTextureLarge from '~/assets/FormFixer_camera.png';
import gamestackTexturePlaceholder from '~/assets/FormFixer_camera.png';
import gamestackTexture from '~/assets/FormFixer_camera.png';
import sliceTextureLarge from '~/assets/MAiSTRO.png';
import sliceTexturePlaceholder from '~/assets/MAiSTRO.png';
import sliceTexture from '~/assets/MAiSTRO.png';
import sprTextureLarge from '~/assets/Elkor.png';
import sprTexturePlaceholder from '~/assets/Elkor.png';
import sprTexture from '~/assets/Elkor.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import config from '~/config.json';
import styles from './home.module.css';

export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Software Engineer',
    description: `${config.name} Portfolio — A fun, passionate, and results-oriented software engineer who loves traveling to learn about different cultures.`,
  });
};

// 7) The main Home component (plain JS/JSX)
export function Home() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  // Refs for each section
  const intro = useRef(null);
  const projectOne = useRef(null);
  const projectTwo = useRef(null);
  const projectThree = useRef(null);
  const details = useRef(null);

  // Intersection observer logic
  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prev) => [...prev, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach((sec) => {
      if (sec.current) sectionObserver.observe(sec.current);
    });

    if (intro.current) indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      {/* 1) Intro section */}
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      {/* 2) Project #1 */}
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Elkor Technologies Inc Website"
        description="Canadian-based electrical and electronic manufacturing company, delivering precision-engineered solutions through innovation and advanced design."
        buttonText="View Website"
        buttonLink="https://www.elkor.net/"
        model={{
          type: 'laptop',
          alt: 'Elkor website preview',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      {/* 3) Project #2 */}
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="FormFixer.AI"
        description="AI-powered fitness app that delivers real-time exercise form feedback, customizable workout routines, and personalized meal preparation."
        buttonText="View Project"
        buttonLink="https://github.com/DasolLim/FormFixer.AI"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />

      {/* 4) Project #3 */}
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="MAiSTRO"
        description="Real-time AI-powered piano composition based on user input using MIDI-trained models and dynamic visualizations."
        buttonText="View project"
        buttonLink="https://github.com/DasolLim/MAiSTRO"
        model={{
          type: 'laptop',
          alt: 'MAiSTRO preview',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      {/* 6) Profile section */}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />


      {/* 7) Footer */}
      <Footer />
    </div>
  );
}
