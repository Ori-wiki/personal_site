import { CodeGlow } from '../../shared/CodeGlow';
import { ContactCopyButton } from './ContactCopyButton';
import { ContactStringLazy } from './ContactStringLazy';
import { contactLinks } from './data';

export function Contact() {
  return (
    <footer
      id='contact'
      className='motion-section h-screen min-h-screen snap-start overflow-visible'
      aria-describedby='contact-description'
      aria-labelledby='contact-title'
    >
      <CodeGlow position='top-right' />
      <CodeGlow position='bottom-left' />
      <div className='absolute right-[16%] bottom-[13%] h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-zinc-100 to-sky-950 shadow-[0_26px_40px_rgba(0,0,0,0.45)]' />
      <div className='section-content relative z-10 mx-auto grid h-screen w-full max-w-[1500px] items-center gap-14 px-8 lg:grid-cols-[1fr_0.82fr] lg:px-28'>
        <div className='hidden lg:block' data-reveal='left'>
          <ContactStringLazy />
        </div>
        <div className='max-w-[560px] text-left'>
          <p
            id='contact-title'
            className='text-lg font-black leading-8 text-zinc-100'
            data-reveal='right'
            data-reveal-delay='1'
          >
            Have a project in mind or looking for a frontend developer?
          </p>
          <p
            id='contact-description'
            className='mt-7 text-lg font-semibold leading-8 text-zinc-100'
            data-reveal='right'
            data-reveal-delay='2'
          >
            I&apos;m always open to discussing new ideas, interesting products
            and development opportunities.
          </p>
          <div className='mt-10 flex flex-col items-start gap-4 text-3xl font-black tracking-tight text-white sm:text-[34px]'>
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
                className='break-all text-2xl transition-colors hover:text-[#b82ce0] sm:text-[30px]'
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
