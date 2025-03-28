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

const experiencesData = [
  {
    id: 1,
    title: 'Google Cloud Skills Boost: Implement DevOps Workflows',
    dateRange: '',
    description:
      'Completed hands-on labs and a challenge lab to earn the Google Cloud Skill Badge. Gained experience with Cloud Source Repositories, deploying and managing apps on GKE, and building CI/CD pipelines to automate container builds and deployments.',
    tags: ['Kubernetes (GKE)', 'CI/CD', 'DevOps', 'Cloud Computing'],
    logo: 'app/assets/GoogleIcon.png',
    certificateImage: 'app/assets/GCP.png',
  },
  {
    id: 2,
    title: 'AWS: Introduction to Cloud 101',
    dateRange: '',
    description:
      'AWS Training and Certification builds your competence, confidence, and credibility with practical cloud skills that help you innovate and advance your professional future. Whether you’re exploring new ideas, sharpening your cloud skills, learning about services, or preparing for certification, we have training to help you reach your goals. Use our digital badges to showcase your achievements, including AWS Certifications, which validate your cloud skills with an industry-recognized credential.',
    tags: ['Amazon EC2', 'Amazon S3', 'RDS', 'Deployment'],
    logo: 'app/assets/AwsIcon.png',
    certificateImage: 'app/assets/AWS.png',
  },
  {
    id: 3,
    title: 'HackerRank: Node.js (Intermediate) Certificate',
    dateRange: '',
    description:
      'HackerRank certification test for Node.js(Intermediate).',
    tags: ['Node.js', 'JavaScript', 'Git', 'Frontend'],
    logo: 'app/assets/HackerrankIcon.png',
    certificateImage: 'app/assets/NodeJS.png',
  },
  {
    id: 4,
    title: 'HackerRank: React (Basic) Certificate',
    dateRange: '',
    description:
      'React (Basic) It covers topics like Basic Routing, Rendering Elements,State Management (Internal Component State), Handling Events, ES6 and JavaScript and Form Validation.',
    tags: ['React.js', 'JavaScript', 'Git', 'Frontend'],
    logo: 'app/assets/HackerrankIcon.png',
    certificateImage: 'app/assets/ReactJS.png',
  },
  {
    id: 5,
    title: 'Kaggle: 5-Day Gen AI Intensive Badge',
    dateRange: '',
    description:
      'Completed the 5-Day Gen AI Intensive Course. This course was run in November 2024. Participants attended daily seminars, studied white papers, and completed daily assignments about Generative AI.',
    tags: ['LLM', 'Neural Network', 'Google Gemini', 'Python', 'MLOps'],
    logo: 'app/assets/KaggleIcon.png',
    certificateImage: 'app/assets/kaggle_badge.jpg',
  },
  {
    id: 6,
    title: 'IBM: Fundamentals & Concepts Certification',
    dateRange: '',
    description:
      'Completed mainframe fundamentals, including file management, JCL, USS, and security.',
    tags: ['Mainframe', 'JCL', 'Operating System', 'COBOL', 'Linux', 'USS', 'REXX', 'Python'],
    logo: 'app/assets/IbmIcon.png',
    certificateImage: 'app/assets/IbmCertifcate.png',
  },
];

function ExperienceItem(props) {
  const {
    title,
    dateRange,
    description,
    tags,
    logo,
    certificateImage,
  } = props;
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <div className={styles.experienceItem}>
      <div className={styles.experienceHeader} onClick={handleToggle}>
        {/* Left side: small logo + title */}
        <div className={styles.headerLeft}>
          {logo && (
            <img
              src={logo}
              alt={`${title} logo`}
              className={styles.certificateLogo}
            />
          )}
          <strong>{title}</strong>
        </div>

        {/* Right side: date + expand icon */}
        <div className={styles.headerRight}>
          <span>{dateRange}</span>
          <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>
            {expanded ? '−' : '+'}
          </span>
        </div>
      </div>

      {expanded && (
        <div className={styles.experienceDetails}>
          {/* Smaller, centered certificate image */}
          {certificateImage && (
            <div className={styles.certificateImageWrapper}>
              <img
                src={certificateImage}
                alt={`${title} certificate`}
                className={styles.certificateImage}
              />
            </div>
          )}

          {description && <p style={{ margin: '0.5rem 0' }}><strong>Description: </strong></p>}

          {description && <p style={{ margin: '0.5rem 0' }}>{description}</p>}

          {tags && tags.length > 0 && (
            <div className={styles.experienceTags}>
              {tags.map((tag) => (
                <strong><span key={tag} className={styles.experienceTag}>
                  {tag}
                </span></strong>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 6) Container for all experiences
function WorkExperienceList({ sectionRef, visible, id }) {
  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.experienceSection}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <h2 className={styles.experienceHeading}>Certifications & Training</h2>
      {experiencesData.map((exp) => (
        <ExperienceItem key={exp.id} {...exp} />
      ))}
    </section>
  );
}

// 7) The main Home component (plain JS/JSX)
export function Home() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  // Refs for each section
  const intro = useRef(null);
  const projectOne = useRef(null);
  const projectTwo = useRef(null);
  const projectThree = useRef(null);
  const experienceRef = useRef(null);
  const details = useRef(null);

  // Intersection observer logic
  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, experienceRef, details];

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

      {/* 5) Work Experience section (the purple toggle cards) */}
      <WorkExperienceList
        sectionRef={experienceRef}
        visible={visibleSections.includes(experienceRef.current)}
        id="experience"
      />

      {/* 7) Footer */}
      <Footer />
    </div>
  );
}
