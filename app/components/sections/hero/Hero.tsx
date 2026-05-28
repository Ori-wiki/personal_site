import Image from 'next/image';
import { CodeGlow } from '../../shared/CodeGlow';
import { IsometricWorkspace } from './IsometricWorkspace';

const aboutLinkClassName = `
  group relative mt-9 inline-flex w-fit items-center gap-4 pb-1.5
  text-lg font-semibold drop-shadow-[0_0_18px_rgba(184,44,224,0.18)]
  transition-[color,filter,transform] duration-200
  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:content-['']
  after:origin-left after:rounded-full after:bg-[#b82ce0] after:transition-[width] after:duration-500 after:ease-out
  hover:text-[#b82ce0] hover:drop-shadow-[0_0_18px_rgba(184,44,224,0.55)]
  hover:after:w-[calc(100%+0.5rem)]
  focus-visible:text-[#b82ce0] focus-visible:outline-2 focus-visible:outline-offset-[0.34rem] focus-visible:outline-[#f4c8ff]/60
  focus-visible:after:w-[calc(100%-2.55rem)]
  motion-reduce:transition-none motion-reduce:after:transition-none
`;

const aboutLinkArrowClassName = `
  h-2.5 w-2.5 rotate-[-45deg] border-b-2 border-r-2 border-current
  transition-transform duration-500 ease-out
  group-hover:translate-x-1.5 group-hover:rotate-45
  group-focus-visible:translate-x-1.5 group-focus-visible:rotate-45
  motion-reduce:transition-none
`;

export function Hero() {
  return (
    <section
      id='top'
      className='relative h-screen min-h-screen snap-start overflow-hidden bg-[radial-gradient(circle_at_58%_43%,rgba(255,255,255,0.026)_0_2px,transparent_2px_44px),#121318] text-[#eef4fb]'
    >
      <div className='pointer-events-none absolute left-[40%] top-[28%] hidden h-[210px] w-[52%] bg-[radial-gradient(circle,#3f414a_1.7px,transparent_2px)] bg-[length:42px_42px] lg:block' />
      <CodeGlow position='bottom-left' />

      <div className='section-content relative z-10 mx-auto grid h-screen w-full max-w-[1500px] items-center gap-8 px-8 lg:grid-cols-[0.72fr_1fr] lg:px-[130px]'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute left-[45%] top-[58%] z-20 hidden h-40 w-40 -translate-x-1/2 rotate-12 opacity-90 drop-shadow-[0_28px_36px_rgba(184,44,224,0.24)] lg:block xl:h-52 xl:w-52'
          data-reveal='tilt-right'
          data-reveal-delay='1'
        >
          <Image
            alt=''
            className='object-contain'
            fill
            sizes='208px'
            src='/images/5.png'
          />
        </div>
        <div data-hero-text>
          <h1 className='max-w-[650px] text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-[58px]'>
            Frontend Developer
          </h1>
          <p className='mt-8 max-w-[420px] text-base font-semibold leading-[1.7] text-zinc-100'>
            Building modern web interfaces with React, Next.js and TypeScript.
            Focused on clean UI, motion and scalable frontend architecture.
          </p>
          <a
            className={aboutLinkClassName}
            href='#about'
          >
            <span>About me</span>
            <span className={aboutLinkArrowClassName} aria-hidden='true' />
          </a>
        </div>
        <div
          className='relative hidden -translate-x-4 justify-center lg:flex'
          data-hero-visual='isometric'
          data-reveal='right'
          data-reveal-delay='1'
        >
          <IsometricWorkspace />
        </div>
      </div>
    </section>
  );
}
