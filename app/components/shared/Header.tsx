export function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav className='flex h-[145px] w-full items-center justify-between px-4 sm:px-[55px]'>
        <a
          className='flex items-center gap-2 text-xl font-black tracking-[0.16em] text-white sm:gap-3 sm:text-[28px] sm:tracking-[0.19em]'
          href='#top'
        >
          <span className='grid h-[23px] w-[29px] place-items-center bg-white text-base font-black leading-none text-[#121318]'>
            &gt;
          </span>
          DVLPR
        </a>
        <div className='flex items-center gap-2 sm:gap-3'>
          <a
            className='rounded-md border-2 border-zinc-100 bg-zinc-100 px-3 py-2 text-sm font-black text-[#121318] transition-colors hover:border-[#b82ce0] hover:bg-[#b82ce0] hover:text-white sm:px-6 sm:py-3 sm:text-base'
            href='/pdf/Казаков%20Денис%20Андреевич%20(2).pdf'
            target='_blank'
            rel='noreferrer'
          >
            Resume
          </a>
          <a
            className='rounded-md border-2 border-zinc-100 px-3 py-2 text-sm font-black text-white transition-colors hover:bg-white hover:text-[#121318] sm:px-6 sm:py-3 sm:text-base'
            href='#contact'
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
