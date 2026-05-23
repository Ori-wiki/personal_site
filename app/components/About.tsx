import Image from 'next/image';
import { CodeGlow } from './CodeGlow';

export function About() {
  return (
    <section id='about' className='portfolio-section'>
      <CodeGlow position='top-left' />
      <CodeGlow position='bottom-right' />
      <a
        className='absolute bottom-[56px] left-[50px] z-20 text-3xl font-black text-white'
        href='https://github.com'
      >
        gh
      </a>
      <div className='absolute left-[53%] top-[21%] h-16 w-16 rotate-12 bg-[#a52ac2] shadow-[0_24px_40px_rgba(165,42,194,0.35)] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]' />
      <div className='absolute left-[17%] bottom-[20%] h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-zinc-700 to-sky-950 opacity-60 shadow-[0_26px_40px_rgba(0,0,0,0.35)]' />

      <div className='section-content relative z-10 mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-12 px-8 pt-28 lg:grid-cols-[0.83fr_1fr] lg:px-[130px]'>
        <div className='pt-14'>
          <h2 className='text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-[58px]'>
            Hi, I&apos;m Denis
            <br />
            Web Developer
          </h2>
          <p className='mt-7 text-xl tracking-wide text-zinc-500'>
            JavaScript Enthusiast / Creative Problem Solver
          </p>
        </div>

        <div className='relative pt-20'>
          <div className='absolute -left-60 -top-16 hidden h-[405px] w-[405px] opacity-35 lg:block'>
            <Image
              src='/images/perImg.png'
              alt=''
              fill
              sizes='405px'
              className='scale-95 object-cover object-[center_35%]'
            />
            <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,24,0.98)_0_30%,rgba(18,19,24,0.45)_30%_68%,rgba(18,19,24,0.98)_68%)]' />
          </div>
          <div className='relative max-w-[650px] space-y-8 text-base font-bold leading-[1.5] text-zinc-100'>
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
