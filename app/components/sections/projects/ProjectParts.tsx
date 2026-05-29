import Image from 'next/image';
import { firstProjectIndex, projectSlides, type ProjectSlide } from './data';

export function ArrowMark() {
  return (
    <span
      aria-hidden='true'
      className='h-2.5 w-2.5 rotate-[-45deg] border-b-2 border-r-2 border-current transition-transform duration-300 group-hover:translate-x-1'
    />
  );
}

function SliderArrow({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <span
      aria-hidden='true'
      className={`relative block h-4 w-5 transition-transform duration-300 ${
        direction === 'previous'
          ? 'group-hover:-translate-x-0.5'
          : 'group-hover:translate-x-0.5'
      }`}
    >
      <span className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current' />
      <span
        className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-current ${
          direction === 'previous'
            ? 'left-0 border-b border-l'
            : 'right-0 border-r border-t'
        }`}
      />
    </span>
  );
}

function FloatingPreviewImage({
  className,
  imageClassName = '',
  sizes,
  src,
}: {
  className: string;
  imageClassName?: string;
  sizes: string;
  src: string;
}) {
  return (
    <div
      aria-hidden='true'
      className={`pointer-events-none absolute drop-shadow-[0_22px_34px_rgba(0,0,0,0.42)] ${className}`}
    >
      <Image
        alt=''
        className={`object-contain ${imageClassName}`}
        fill
        sizes={sizes}
        src={src}
      />
    </div>
  );
}

export function ProjectPreview({
  image,
  title,
  variant = 'desktop',
}: {
  image: string;
  title: string;
  variant?: 'desktop' | 'mobile';
}) {
  const previewClassName =
    variant === 'mobile'
      ? 'relative w-full max-w-[520px] [perspective:900px]'
      : 'relative w-full max-w-[720px] [perspective:1100px]';
  const sizes =
    variant === 'mobile'
      ? '(max-width: 1023px) calc(100vw - 64px), 0px'
      : '(min-width: 1500px) 685px, (min-width: 1024px) calc((100vw - 308px) / 1.74), 0px';

  return (
    <div className={previewClassName}>
      <div className='relative z-10 rounded-[22px] border-[7px] border-black bg-black shadow-[0_30px_80px_rgba(0,0,0,0.54),0_0_0_1px_rgba(255,255,255,0.12)] lg:rounded-[30px] lg:border-[9px]'>
        <div className='overflow-hidden rounded-[13px] bg-black lg:rounded-[18px]'>
          <div className='relative aspect-[16/9]'>
            <Image
              alt={`${title} preview`}
              className='scale-[1.01] object-cover object-top'
              fill
              sizes={sizes}
              src={image}
            />
          </div>
        </div>
      </div>
      <div className='relative z-10 mx-auto h-2 w-[88%] rounded-b-[14px] bg-gradient-to-b from-zinc-500 to-zinc-900 shadow-[0_18px_26px_rgba(0,0,0,0.38)] lg:h-3 lg:rounded-b-[18px]' />
    </div>
  );
}

export function ProjectSlideDecorations() {
  return (
    <>
      <FloatingPreviewImage
        className='bottom-2 left-[36%] hidden h-52 w-52 opacity-95 [transform:rotateZ(8deg)] lg:block'
        sizes='208px'
        src='/images/3.png'
      />
      <FloatingPreviewImage
        className='right-0 top-4 hidden h-48 w-48 opacity-95 [transform:rotateZ(12deg)] lg:block'
        sizes='192px'
        src='/images/4.png'
      />
    </>
  );
}

export function IntroDecorations() {
  return (
    <>
      <FloatingPreviewImage
        className='-left-24 top-12 hidden h-24 w-24 opacity-90 [transform:rotateZ(-10deg)] sm:block'
        sizes='96px'
        src='/images/1.png'
      />
      <FloatingPreviewImage
        className='-right-28 bottom-16 hidden h-36 w-36 opacity-95 [transform:rotateZ(8deg)] sm:block'
        sizes='144px'
        src='/images/2.png'
      />
    </>
  );
}

export function ProjectLinks({
  codeHref,
  liveHref,
  linkLabel,
}: {
  codeHref?: string;
  liveHref?: string;
  linkLabel: string;
}) {
  return (
    <div className='flex flex-col items-start gap-3'>
      {codeHref ? (
        <a
          className='group inline-flex cursor-pointer items-center gap-4 text-base font-black text-white transition-colors hover:text-[#8be36d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d]'
          href={codeHref}
          rel='noreferrer'
          target='_blank'
        >
          View the code
          <ArrowMark />
        </a>
      ) : null}
      {liveHref ? (
        <a
          className='group inline-flex cursor-pointer items-center gap-4 text-base font-black text-[#f4a949] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d]'
          href={liveHref}
          rel='noreferrer'
          target='_blank'
        >
          {linkLabel}
          <ArrowMark />
        </a>
      ) : null}
    </div>
  );
}

export function SliderControls({
  activeIndex,
  isChangingSlide,
  goToNext,
  goToPrevious,
  changeSlide,
}: {
  activeIndex: number;
  isChangingSlide: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  changeSlide: (index: number) => void;
}) {
  return (
    <div
      className='absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-7'
      data-reveal='up'
      data-reveal-delay='5'
    >
      <div className='flex gap-4'>
        {projectSlides.map((item, dotIndex) => (
          <button
            aria-label={`Show project ${dotIndex + 1}: ${item.title}`}
            aria-current={activeIndex === item.index ? 'true' : undefined}
            className={`h-2.5 cursor-pointer rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d] disabled:cursor-default disabled:opacity-70 ${
              activeIndex === item.index
                ? 'w-12 bg-[#8be36d]'
                : 'w-2.5 bg-zinc-600 hover:bg-zinc-400'
            }`}
            disabled={isChangingSlide}
            key={item.title}
            onClick={() => changeSlide(item.index)}
            type='button'
          />
        ))}
      </div>
      <div className='flex items-center gap-3'>
        <button
          aria-label='Previous project'
          className='group grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-[#8be36d]/60 hover:bg-[#8be36d]/10 hover:text-[#8be36d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d] disabled:cursor-default disabled:opacity-60'
          disabled={isChangingSlide}
          onClick={goToPrevious}
          type='button'
        >
          <SliderArrow direction='previous' />
        </button>
        <button
          aria-label='Next project'
          className='group grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-[#8be36d]/60 hover:bg-[#8be36d]/10 hover:text-[#8be36d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d] disabled:cursor-default disabled:opacity-60'
          disabled={isChangingSlide}
          onClick={goToNext}
          type='button'
        >
          <SliderArrow direction='next' />
        </button>
      </div>
    </div>
  );
}

export function ProjectArticle({
  reduceMotion,
  changeSlide,
  isTextResetting,
  isTextExiting,
  slideDirection,
  slide,
}: {
  reduceMotion: boolean;
  changeSlide: (index: number) => void;
  isTextResetting: boolean;
  isTextExiting: boolean;
  slideDirection: 'previous' | 'next';
  slide: ProjectSlide;
}) {
  const textMotionClass = isTextExiting
    ? slideDirection === 'next'
      ? '-translate-x-[72vw]'
      : 'translate-x-[72vw]'
    : 'translate-x-0';
  const textTransitionClass = isTextResetting
    ? 'transition-none'
    : reduceMotion
      ? 'transition-none'
      : 'transition-transform duration-[var(--motion-duration-hero-exit)] ease-[var(--motion-ease-exit)]';

  if (!slide.image) {
    return (
      <article
        className={`pointer-events-auto relative col-span-full row-start-1 mx-auto flex min-h-[430px] max-w-[820px] flex-col items-center justify-center text-center ${textTransitionClass} ${textMotionClass}`}
      >
        <IntroDecorations />
        <h2
          className='relative z-10 max-w-[820px] text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl xl:text-[58px]'
          data-reveal='scale'
        >
          {slide.title}
        </h2>
        <p
          className='relative z-10 mt-8 max-w-[690px] text-base font-bold leading-7 text-zinc-100'
          data-reveal='up'
          data-reveal-delay='1'
        >
          {slide.description}
        </p>
        <button
          className='group relative z-10 mt-8 inline-flex cursor-pointer items-center gap-4 text-lg font-black text-[#b82ce0] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b82ce0]'
          data-reveal='tilt-left'
          data-reveal-delay='2'
          onClick={() => changeSlide(firstProjectIndex)}
          type='button'
        >
          {slide.linkLabel}
          <ArrowMark />
        </button>
      </article>
    );
  }

  return (
    <>
      <ProjectSlideDecorations />
      <article
        className={`pointer-events-auto relative col-start-1 row-start-1 min-h-[430px] max-w-[620px] ${textTransitionClass} ${textMotionClass}`}
      >
        <p className='text-base uppercase text-zinc-500' data-reveal='down'>
          {slide.eyebrow}
        </p>
        <h2
          className='mt-4 max-w-[650px] text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl xl:text-[58px]'
          data-reveal='left'
          data-reveal-delay='1'
        >
          {slide.title}
        </h2>
        <div className='mt-8 lg:hidden' data-reveal='up' data-reveal-delay='2'>
          <ProjectPreview
            image={slide.image}
            title={slide.title}
            variant='mobile'
          />
        </div>
        <p
          className='mt-10 max-w-[560px] text-base font-bold leading-7 text-zinc-100'
          data-reveal='up'
          data-reveal-delay='2'
        >
          {slide.description}
        </p>
        <p
          className='mt-6 max-w-[590px] text-base font-black leading-7 text-zinc-100'
          data-reveal='up'
          data-reveal-delay='3'
        >
          Stack: <span className='font-semibold'>{slide.builtWith}</span>
        </p>

        <div className='mt-11' data-reveal='tilt-left' data-reveal-delay='4'>
          <ProjectLinks
            codeHref={slide.codeHref}
            linkLabel={slide.linkLabel}
            liveHref={slide.liveHref}
          />
        </div>
      </article>
      <div
        className='relative hidden min-h-[560px] items-center justify-center overflow-visible lg:flex'
        data-reveal='right'
        data-reveal-delay='3'
      >
        <ProjectPreview image={slide.image} title={slide.title} />
      </div>
    </>
  );
}
