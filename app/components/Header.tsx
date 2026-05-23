export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex h-[145px] w-full items-center justify-between px-8 sm:px-[55px]">
        <a className="flex items-center gap-3 text-[28px] font-black tracking-[0.19em] text-white" href="#top">
          <span className="grid h-[23px] w-[29px] place-items-center bg-white text-base font-black leading-none text-[#121318]">
            &gt;
          </span>
          DVLPR
        </a>
        <a
          className="rounded-md border-2 border-zinc-100 px-8 py-3 text-base font-black text-white transition-colors hover:bg-white hover:text-[#121318]"
          href="#contact"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
