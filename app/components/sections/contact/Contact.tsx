'use client';

import { useState } from 'react';
import { CodeGlow } from '../../shared/CodeGlow';
import { ContactString } from './ContactString';

const EMAIL = 'ori21wiki@gmail.com';
const TELEGRAM_HANDLE = '@denis_web_03';

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1400);
  }

  async function copyTelegram() {
    await navigator.clipboard.writeText(TELEGRAM_HANDLE);
    setCopiedTelegram(true);
    window.setTimeout(() => setCopiedTelegram(false), 1400);
  }

  return (
    <footer
      id='contact'
      className='relative h-screen min-h-screen snap-start overflow-hidden bg-[radial-gradient(circle_at_58%_43%,rgba(255,255,255,0.026)_0_2px,transparent_2px_44px),#121318] text-[#eef4fb]'
    >
      <CodeGlow position='top-right' />
      <CodeGlow position='bottom-left' />
      <div className='absolute right-[16%] bottom-[13%] h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-zinc-100 to-sky-950 shadow-[0_26px_40px_rgba(0,0,0,0.45)]' />
      <div className='section-content relative z-10 mx-auto grid h-screen w-full max-w-[1500px] items-center gap-14 px-8 lg:grid-cols-[1fr_0.82fr] lg:px-28'>
        <ContactString />
        <div className='max-w-[560px] text-left'>
          <p className='text-lg font-black leading-8 text-zinc-100'>
            Have a project in mind or looking for a frontend developer?
          </p>
          <p className='mt-7 text-lg font-semibold leading-8 text-zinc-100'>
            I&apos;m always open to discussing new ideas, interesting products
            and development opportunities.
          </p>
          <div className='mt-10 flex flex-col items-start gap-4 text-3xl font-black tracking-tight text-white sm:text-[34px]'>
            <div className='flex max-w-full items-center gap-3'>
              <a
                target='_blank'
                className='transition-colors hover:text-[#b82ce0]'
                href='https://t.me/denis_web_03'
                rel='noreferrer'
              >
                Telegram
              </a>
              <button
                aria-label={
                  copiedTelegram ? 'Telegram copied' : 'Copy Telegram'
                }
                className='relative block h-7 w-7 shrink-0 cursor-pointer border-0 bg-transparent text-white/75 outline-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:text-[#b82ce0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b82ce0]'
                onClick={copyTelegram}
                type='button'
              >
                <span className='pointer-events-none absolute left-1.5 top-1 block h-[15px] w-3 box-border rounded-tl-[2px] border-l-2 border-t-2 border-current' />
                <span
                  className={`pointer-events-none absolute left-2.5 top-2 block h-[17px] w-3.5 box-border rounded-[2px] border-2 border-current transition-transform duration-300 ease-out ${
                    copiedTelegram ? '-translate-x-1 -translate-y-1' : ''
                  }`}
                />
              </button>
            </div>
            <div className='flex max-w-full items-center gap-3'>
              <a
                className='break-all text-2xl transition-colors hover:text-[#b82ce0] sm:text-[30px]'
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
              <button
                aria-label={copiedEmail ? 'Email copied' : 'Copy email'}
                className='relative block h-7 w-7 shrink-0 cursor-pointer border-0 bg-transparent text-white/75 outline-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:text-[#b82ce0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b82ce0]'
                onClick={copyEmail}
                type='button'
              >
                <span className='pointer-events-none absolute left-1.5 top-1 block h-[15px] w-3 box-border rounded-tl-[2px] border-l-2 border-t-2 border-current' />
                <span
                  className={`pointer-events-none absolute left-2.5 top-2 block h-[17px] w-3.5 box-border rounded-[2px] border-2 border-current transition-transform duration-300 ease-out ${
                    copiedEmail ? '-translate-x-1 -translate-y-1' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
