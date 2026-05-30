export function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav className='flex h-24 w-full max-w-full items-center gap-3 pl-4 pr-8 sm:h-[145px] sm:px-[55px]'>
        <a
          className='flex min-w-0 shrink-0 items-center gap-2 text-lg font-black tracking-[0.1em] text-white sm:gap-3 sm:text-[28px] sm:tracking-[0.2em]'
          href='#top'
        >
          <span className='grid h-6 w-8 place-items-center bg-white font-mono text-base font-black leading-none tracking-[0.03em] text-[#121318] sm:h-[26px] sm:w-[35px] sm:text-[18px] sm:tracking-[0.04em]'>
            &lt;/&gt;
          </span>
          DVLPR
        </a>
        <div className='ml-auto flex shrink-0 items-center gap-1.5 max-[420px]:-translate-x-8 sm:translate-x-0 sm:gap-3'>
          <a
            className='rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-2 text-[11px] font-black text-[#121318] transition-colors hover:border-[#b82ce0] hover:bg-transparent hover:text-zinc-100 sm:px-6 sm:py-3 sm:text-base'
            href='/pdf/Казаков%20Денис%20Андреевич%20(2).pdf'
            target='_blank'
            rel='noreferrer'
          >
            Resume
          </a>
          <a
            className='rounded-md border-2 border-zinc-100 px-2 py-2 text-[11px] font-black text-white transition-colors hover:bg-white hover:text-[#121318] sm:px-6 sm:py-3 sm:text-base'
            href='#contact'
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
