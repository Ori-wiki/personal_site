import Image from 'next/image';
import { CodeGlow } from '../../shared/CodeGlow';

export function About() {
  return (
    <section
      id='about'
      className='relative h-screen min-h-screen snap-start overflow-hidden bg-[radial-gradient(circle_at_58%_43%,rgba(255,255,255,0.026)_0_2px,transparent_2px_44px),#121318] text-[#eef4fb]'
    >
      <CodeGlow position='top-left' />
      <CodeGlow position='bottom-right' />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 hidden overflow-hidden lg:block'
      >
        <div className='absolute right-[9%] top-[18%] h-[300px] w-[520px] -rotate-6 border border-white/[0.08] bg-white/[0.018] shadow-[0_38px_90px_rgba(0,0,0,0.28)]' />
        <div className='absolute right-[15%] top-[25%] h-[300px] w-[520px] -rotate-6 border border-fuchsia-400/25' />
        <div className='absolute right-[20%] top-[31%] h-px w-[360px] -rotate-6 bg-gradient-to-r from-transparent via-fuchsia-300/45 to-transparent' />
        <div className='absolute right-[18%] top-[40%] h-px w-[300px] -rotate-6 bg-gradient-to-r from-transparent via-sky-300/35 to-transparent' />
        <div className='absolute right-[27%] top-[49%] h-px w-[240px] -rotate-6 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent' />
        <div className='absolute left-[33%] bottom-[18%] h-24 w-24 rotate-45 border border-sky-300/20 bg-sky-300/[0.03] shadow-[0_24px_52px_rgba(14,165,233,0.16)]' />
      </div>

      <div className='section-content relative z-10 mx-auto grid h-screen w-full max-w-[1500px] items-center gap-12 px-8 lg:grid-cols-[0.83fr_1fr] lg:px-[130px]'>
        <div className='relative z-20'>
          <h2 className='text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-[58px]'>
            Hi, I&apos;m Denis
            <br />
            Web Developer
          </h2>
          <p className='mt-7 text-xl tracking-wide text-zinc-500'>
            JavaScript Enthusiast / Creative Problem Solver
          </p>
        </div>

        <div className='relative z-10'>
          <div className='pointer-events-none absolute -left-60 -top-16 z-0 hidden h-[405px] w-[405px] opacity-35 lg:block'>
            <Image
              src='/images/perImg.png'
              alt=''
              fill
              sizes='405px'
              className='scale-95 object-cover object-[center_35%]'
            />
            <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,24,0.98)_0_30%,rgba(18,19,24,0.45)_30%_68%,rgba(18,19,24,0.98)_68%)]' />
          </div>
          <div className='relative z-10 max-w-[650px] space-y-8 text-base font-bold leading-[1.5] text-zinc-100'>
            <p>
              Professionally focused on frontend development and modern web
              applications.
            </p>
            <p>
              I&apos;m a frontend developer experienced in building scalable and
              maintainable applications. I enjoy solving complex technical
              challenges, improving performance and working with application
              architecture to create reliable digital products.
            </p>
            <p>
              Outside of projects, I explore modern development approaches,
              architecture patterns and new tools to continuously improve my
              skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
