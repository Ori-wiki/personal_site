import { CodeGlow } from '../../shared/CodeGlow';
import { ContactCopyButton } from './ContactCopyButton';
import { ContactStringLazy } from './ContactStringLazy';
import { contactLinks } from './data';

export function Contact() {
  return (
    <footer
      id='contact'
      className='motion-section h-svh min-h-svh snap-start overflow-visible'
      aria-describedby='contact-description'
      aria-labelledby='contact-title'
    >
      <CodeGlow position='top-right' />
      <CodeGlow position='bottom-left' />
      <div className='absolute bottom-[13%] right-[16%] hidden h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-zinc-100 to-sky-950 shadow-[0_26px_40px_rgba(0,0,0,0.45)] sm:block' />
      <div className='section-content relative z-10 mx-auto grid h-svh w-full max-w-[1500px] items-center gap-10 px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1fr_0.82fr] lg:gap-14 lg:px-28 lg:pb-0 lg:pt-0'>
        <div className='hidden lg:block' data-reveal='left'>
          <ContactStringLazy />
        </div>
        <div className='max-w-[560px] text-left'>
          <p
            id='contact-title'
            className='text-base font-black leading-7 text-zinc-100 sm:text-lg sm:leading-8'
            data-reveal='right'
            data-reveal-delay='1'
          >
            Have a project in mind or looking for a frontend developer?
          </p>
          <p
            id='contact-description'
            className='mt-5 text-base font-semibold leading-7 text-zinc-100 sm:mt-7 sm:text-lg sm:leading-8'
            data-reveal='right'
            data-reveal-delay='2'
          >
            I&apos;m always open to discussing new ideas, interesting products
            and development opportunities.
          </p>
          <div className='mt-8 flex flex-col items-start gap-4 text-[28px] font-black tracking-tight text-white sm:mt-10 sm:text-[34px]'>
            <div
              className='flex max-w-full items-center gap-3'
              data-reveal='tilt-right'
              data-reveal-delay='3'
            >
              <a
                target='_blank'
                className='transition-colors hover:text-[#b82ce0]'
                href={contactLinks.telegramHref}
                rel='noreferrer'
              >
                Telegram
              </a>
              <ContactCopyButton
                copiedLabel='Telegram copied'
                label='Copy Telegram'
                value={contactLinks.telegramHandle}
              />
            </div>
            <div
              className='flex max-w-full items-center gap-3'
              data-reveal='tilt-right'
              data-reveal-delay='4'
            >
              <a
                className='break-all text-[22px] transition-colors hover:text-[#b82ce0] sm:text-[30px]'
                href={`mailto:${contactLinks.email}`}
              >
                {contactLinks.email}
              </a>
              <ContactCopyButton
                copiedLabel='Email copied'
                label='Copy email'
                value={contactLinks.email}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
