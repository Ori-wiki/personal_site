export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="rounded-lg border border-stone-200 bg-[linear-gradient(135deg,#ffffff,#eef3ea)] p-8 shadow-sm md:p-12">
        <p className="text-sm font-semibold text-emerald-800">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">Let&apos;s work together</h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
          I&apos;m currently open to new opportunities. Feel free to reach out.
        </p>
        <a
          className="mt-8 inline-flex rounded-md bg-emerald-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-900"
          href="mailto:hello@example.com"
        >
          Send me a message
        </a>
      </div>
    </section>
  );
}
