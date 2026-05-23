import { CodeGlow } from './CodeGlow';
import styles from './Hero.module.css';
import { IsometricWorkspace } from './IsometricWorkspace';

export function Hero() {
  return (
    <section id='top' className='portfolio-section'>
      <div className='absolute left-[43%] right-[9%] top-[37%] hidden h-px bg-[radial-gradient(circle,#3f414a_1.5px,transparent_2px)] bg-[length:40px_1px] lg:block' />
      <CodeGlow position='bottom-left' />
      <a
        className='absolute bottom-[56px] left-[50px] z-20 text-3xl font-black text-white'
        href='https://github.com'
      >
        gh
      </a>

      <div className='section-content relative z-10 mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-8 px-8 pt-28 lg:grid-cols-[0.72fr_1fr] lg:px-[130px]'>
        <div className='pt-[88px]'>
          <h1 className='max-w-[650px] text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-[58px]'>
            Frontend Developer
          </h1>
          <p className='mt-8 max-w-[420px] text-base font-semibold leading-[1.7] text-zinc-100'>
            Building modern web interfaces with React, Next.js and TypeScript.
            Focused on clean UI, motion and scalable frontend architecture.
          </p>
          <a
            className={`${styles.aboutLink} mt-9 inline-flex items-center gap-4 text-lg font-semibold text-[#b82ce0] transition-colors hover:text-[#f4c8ff] focus-visible:text-[#f4c8ff]`}
            href='#about'
          >
            <span className={styles.aboutLinkLabel}>About me</span>
            <span className={styles.aboutLinkArrow} aria-hidden='true'>
              &gt;
            </span>
          </a>
        </div>
        <div className='hidden -translate-x-4 translate-y-4 justify-center lg:flex'>
          <IsometricWorkspace />
        </div>
      </div>
    </section>
  );
}
