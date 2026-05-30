import Image from 'next/image';
import type { CSSProperties } from 'react';
import { CodeGlow } from '../../shared/CodeGlow';
import { skills } from './data';

const motionTiming = {
  firstSkillRevealDelayMs: 80,
  skillRevealStepMs: 85,
};

export function Skills() {
  return (
    <section
      id='skills'
      className='motion-section h-svh min-h-svh snap-start overflow-hidden'
      aria-describedby='skills-description'
      aria-labelledby='skills-title'
    >
      <CodeGlow position='top-right' />
      <CodeGlow position='bottom-left' />

      <div className='section-content relative z-10 mx-auto flex h-svh w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-8 pt-28 text-center sm:px-8 sm:pt-32 lg:px-[130px] lg:pb-0 lg:pt-0'>
        <p className='text-xs uppercase text-zinc-500 sm:text-base'>
          A problem is an opportunity to do your best.
        </p>
        <h2
          id='skills-title'
          className='mt-3 text-[34px] font-black leading-none tracking-tight text-white sm:mt-4 sm:text-6xl xl:text-[58px]'
        >
          Skills &amp; Experience
        </h2>
        <p
          id='skills-description'
          className='mt-5 max-w-3xl text-sm font-bold leading-6 text-zinc-100 sm:mt-8 sm:text-base sm:leading-7'
        >
          I specialize in crafting engaging and high-quality client-side web
          applications.
        </p>
        <p className='mt-4 hidden max-w-[700px] text-base font-bold leading-7 text-zinc-100 sm:block'>
          My experience includes HTML, CSS, and JavaScript, building projects
          with React and Vue, developing custom features and plugins, creating
          animations, and coding interactive layouts. I also have full-stack
          experience, including working with Node.js, and Go.
        </p>
        <p className='mt-4 text-sm font-bold text-zinc-100 sm:mt-5 sm:text-base'>
          For a deeper look at my work and experience, visit my{' '}
          <a
            target='blank'
            href='https://spb.hh.ru/resume/33cc3ec3ff0b768f8d0039ed1f433375464777'
            className='text-amber-400 hover:text-[#b82ce0]'
          >
            HH
          </a>
        </p>

        <div className='mt-6 flex w-full max-w-[960px] flex-wrap justify-center gap-x-2.5 gap-y-3 sm:mt-12 sm:gap-x-5 sm:gap-y-7'>
          {skills.map((skill, index) => (
            <div
              key={skill.label}
              className='flex w-[54px] flex-col items-center gap-2 sm:w-[88px] sm:gap-3'
              data-skill-reveal
              style={
                {
                  '--reveal-delay': `${
                    motionTiming.firstSkillRevealDelayMs +
                    index * motionTiming.skillRevealStepMs
                  }ms`,
                } as CSSProperties
              }
            >
              <div className='grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.04] shadow-[0_0_28px_rgba(184,44,224,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#b82ce0]/50 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(184,44,224,0.22)] sm:h-[64px] sm:w-[64px]'>
                <Image
                  src={skill.icon}
                  alt={`${skill.label} logo`}
                  height={44}
                  width={44}
                  className={`h-8 w-8 object-contain sm:h-11 sm:w-11 ${
                    skill.invert ? 'invert' : ''
                  }`}
                />
              </div>
              <p className='text-[11px] font-semibold leading-4 text-zinc-200 sm:text-sm'>
                {skill.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
