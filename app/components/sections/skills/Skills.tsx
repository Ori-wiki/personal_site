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
      className='motion-section h-screen min-h-screen snap-start overflow-hidden'
      aria-describedby='skills-description'
      aria-labelledby='skills-title'
    >
      <CodeGlow position='top-right' />
      <CodeGlow position='bottom-left' />

      <div className='section-content relative z-10 mx-auto flex h-screen w-full max-w-[1500px] flex-col items-center justify-center px-8 text-center lg:px-[130px]'>
        <p className='text-base uppercase text-zinc-500'>
          A problem is an opportunity to do your best.
        </p>
        <h2
          id='skills-title'
          className='mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl xl:text-[58px]'
        >
          Skills &amp; Experience
        </h2>
        <p
          id='skills-description'
          className='mt-8 max-w-3xl text-base font-bold leading-7 text-zinc-100'
        >
          I specialize in crafting engaging and high-quality client-side web
          applications.
        </p>
        <p className='mt-5 max-w-[700px] text-base font-bold leading-7 text-zinc-100'>
          My experience includes HTML, CSS, and JavaScript, building projects
          with React and Vue, developing custom features and plugins, creating
          animations, and coding interactive layouts. I also have full-stack
          experience, including working with Node.js, and Go.
        </p>
        <p className='mt-5 text-base font-bold text-zinc-100'>
          For a deeper look at my work and experience, visit my{' '}
          <a
            target='blank'
            href='https://spb.hh.ru/resume/33cc3ec3ff0b768f8d0039ed1f433375464777'
            className='text-amber-400 hover:text-[#b82ce0]'
          >
            Linkedin
          </a>
          <span className=''> or </span>
          <a
            target='blank'
            href='https://spb.hh.ru/resume/33cc3ec3ff0b768f8d0039ed1f433375464777'
            className='text-amber-400 hover:text-[#b82ce0]'
          >
            HH
          </a>
        </p>

        <div className='mt-12 flex w-full max-w-[960px] flex-wrap justify-center gap-x-5 gap-y-7'>
          {skills.map((skill, index) => (
            <div
              key={skill.label}
              className='flex w-[88px] flex-col items-center gap-3'
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
              <div className='grid h-[64px] w-[64px] place-items-center rounded-md border border-white/10 bg-white/[0.04] shadow-[0_0_28px_rgba(184,44,224,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#b82ce0]/50 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(184,44,224,0.22)]'>
                <Image
                  src={skill.icon}
                  alt={`${skill.label} logo`}
                  height={44}
                  width={44}
                  className={`h-11 w-11 object-contain ${
                    skill.invert ? 'invert' : ''
                  }`}
                />
              </div>
              <p className='text-sm font-semibold text-zinc-200'>
                {skill.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
