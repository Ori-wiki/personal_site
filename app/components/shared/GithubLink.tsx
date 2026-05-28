import Image from 'next/image';

export function GithubLink() {
  return (
    <a
      className='fixed bottom-[56px] left-[50px] z-40 grid h-[64px] w-[64px] place-items-center
        rounded-md border border-white/10 bg-white/[0.04] shadow-[0_0_28px_rgba(184,44,224,0.08)]
        transition duration-300 hover:-translate-y-1 hover:border-[#b82ce0]/50 hover:bg-white/[0.07]
        hover:shadow-[0_0_32px_rgba(184,44,224,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-white'
      href='https://github.com/Ori-wiki'
      target='_blank'
      rel='noreferrer'
      aria-label='GitHub profile'
    >
      <Image
        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
        alt='github'
        height={44}
        width={44}
        className='h-11 w-11 object-contain invert'
      />
    </a>
  );
}
