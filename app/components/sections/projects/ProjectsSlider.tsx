'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const slides = [
  {
    eyebrow: 'Selected Projects',
    title: 'Portfolio & Previous Projects',
    description:
      'A selection of interfaces built with attention to structure, responsive behavior and clear user flows. Each project focuses on turning a familiar product idea into a polished, usable web experience.',
    builtWith: '',
    linkLabel: 'See Projects',
    href: '',
  },
  {
    eyebrow: 'Social Platform UI',
    title: 'X / Twitter Clone',
    description:
      'A scalable social media interface inspired by X, featuring interactive timelines, authentication, dynamic routing and reusable UI architecture.',
    builtWith: 'Next.js, TypeScript, TailwindCSS, JSON Server.',
    linkLabel: 'Open project',
    codeHref: 'https://github.com/Ori-wiki/next_x_tweet',
    liveHref: 'https://next-x-tweet.vercel.app',
    image: '/images/xtweet.png',
  },
  {
    eyebrow: 'Product Website',
    title: 'VPN Website',
    description:
      'Conversion-focused VPN platform interface designed to present product features clearly, increase engagement and support scalable content.',
    builtWith: 'Next.js, TypeScript, Tailwind CSS, REST API',
    linkLabel: 'Open project',
    liveHref: 'https://hirovpn.com/ru',
    image: '/images/vpn.png',
  },
];

const firstProjectIndex = slides.findIndex((slide) => Boolean(slide.image));
const projectSlides = slides
  .map((slide, index) => ({ ...slide, index }))
  .filter((slide) => Boolean(slide.image));
const slideStartDelayMs = 40;
const slideTransitionDurationMs = 1200;
const carouselSlides = [...slides, slides[firstProjectIndex]];
const firstProjectCloneIndex = slides.length;

function ArrowMark() {
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
  src,
}: {
  className: string;
  imageClassName?: string;
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
        sizes='180px'
        src={src}
      />
    </div>
  );
}

function ProjectPreview({ image, title }: { image: string; title: string }) {
  return (
    <div className='relative w-full max-w-[720px] [perspective:1100px]'>
      <div className='relative z-10 rounded-[30px] border-[9px] border-black bg-black shadow-[0_30px_80px_rgba(0,0,0,0.54),0_0_0_1px_rgba(255,255,255,0.12)]'>
        <div className='overflow-hidden rounded-[18px] bg-black'>
          <div className='relative aspect-[16/9]'>
            <Image
              alt={`${title} preview`}
              className='scale-[1.01] object-cover object-top'
              fill
              sizes='720px'
              src={image}
            />
          </div>
        </div>
      </div>
      <div className='relative z-10 mx-auto h-3 w-[88%] rounded-b-[18px] bg-gradient-to-b from-zinc-500 to-zinc-900 shadow-[0_18px_26px_rgba(0,0,0,0.38)]' />
    </div>
  );
}

function ProjectSlideDecorations() {
  return (
    <>
      <FloatingPreviewImage
        className='bottom-2 left-[36%] hidden h-52 w-52 opacity-95 [transform:rotateZ(8deg)] lg:block'
        src='/images/3.png'
      />
      <FloatingPreviewImage
        className='right-0 top-4 hidden h-48 w-48 opacity-95 [transform:rotateZ(12deg)] lg:block'
        src='/images/4.png'
      />
    </>
  );
}

function IntroDecorations() {
  return (
    <>
      <FloatingPreviewImage
        className='-left-24 top-12 hidden h-24 w-24 opacity-90 [transform:rotateZ(-10deg)] sm:block'
        src='/images/1.png'
      />
      <FloatingPreviewImage
        className='-right-28 bottom-16 hidden h-36 w-36 opacity-95 [transform:rotateZ(8deg)] sm:block'
        src='/images/2.png'
      />
    </>
  );
}

function ProjectLinks({
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
          className='group inline-flex cursor-pointer items-center gap-4 text-base font-black text-white transition-colors hover:text-[#8be36d]'
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
          className='group inline-flex cursor-pointer items-center gap-4 text-base font-black text-[#f4a949] transition-colors hover:text-white'
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

function SliderControls({
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
            className={`h-2.5 cursor-pointer rounded-full transition-all ${
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
          className='group grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-[#8be36d]/60 hover:bg-[#8be36d]/10 hover:text-[#8be36d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d]'
          disabled={isChangingSlide}
          onClick={goToPrevious}
          type='button'
        >
          <SliderArrow direction='previous' />
        </button>
        <button
          aria-label='Next project'
          className='group grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-[#8be36d]/60 hover:bg-[#8be36d]/10 hover:text-[#8be36d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be36d]'
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

function ProjectArticle({
  changeSlide,
  isTextResetting,
  isTextExiting,
  slideDirection,
  slide,
}: {
  changeSlide: (index: number) => void;
  isTextResetting: boolean;
  isTextExiting: boolean;
  slideDirection: 'previous' | 'next';
  slide: (typeof slides)[number];
}) {
  const textMotionClass = isTextExiting
    ? slideDirection === 'next'
      ? '-translate-x-[72vw]'
      : 'translate-x-[72vw]'
    : 'translate-x-0';
  const textTransitionClass = isTextResetting
    ? 'transition-none'
    : 'transition-transform duration-[920ms] ease-[cubic-bezier(0.55,0,0.2,1)]';

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
          className='group relative z-10 mt-8 inline-flex cursor-pointer items-center gap-4 text-lg font-black text-[#b82ce0] transition-colors hover:text-white'
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

export function ProjectsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [exitingTextTrackIndex, setExitingTextTrackIndex] = useState<
    number | null
  >(null);
  const [resettingTextTrackIndex, setResettingTextTrackIndex] = useState<
    number | null
  >(null);
  const [isTrackSnapping, setIsTrackSnapping] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'previous' | 'next'>(
    'next',
  );
  const textExitTimeoutRef = useRef<number | null>(null);
  const slideCleanupTimeoutRef = useRef<number | null>(null);
  const textResetRafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (textExitTimeoutRef.current) {
        window.clearTimeout(textExitTimeoutRef.current);
      }

      if (slideCleanupTimeoutRef.current) {
        window.clearTimeout(slideCleanupTimeoutRef.current);
      }

      if (textResetRafRef.current) {
        window.cancelAnimationFrame(textResetRafRef.current);
      }
    };
  }, []);

  const changeSlide = useCallback((index: number) => {
    if (index === activeIndex || exitingTextTrackIndex !== null) {
      return;
    }

    if (textExitTimeoutRef.current) {
      window.clearTimeout(textExitTimeoutRef.current);
    }

    if (slideCleanupTimeoutRef.current) {
      window.clearTimeout(slideCleanupTimeoutRef.current);
    }

    if (textResetRafRef.current) {
      window.cancelAnimationFrame(textResetRafRef.current);
    }

    const lastProjectIndex = projectSlides[projectSlides.length - 1].index;
    const isLastToFirstProject =
      activeIndex === lastProjectIndex && index === firstProjectIndex;
    const nextTrackIndex = isLastToFirstProject
      ? firstProjectCloneIndex
      : index;

    setSlideDirection(nextTrackIndex > trackIndex ? 'next' : 'previous');
    const previousTrackIndex = trackIndex;

    setExitingTextTrackIndex(previousTrackIndex);

    textExitTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(index);
      setTrackIndex(nextTrackIndex);

      slideCleanupTimeoutRef.current = window.setTimeout(() => {
        setResettingTextTrackIndex(previousTrackIndex);
        setExitingTextTrackIndex(null);

        textResetRafRef.current = window.requestAnimationFrame(() => {
          textResetRafRef.current = window.requestAnimationFrame(() => {
            setResettingTextTrackIndex(null);
          });
        });

        if (isLastToFirstProject) {
          setIsTrackSnapping(true);
          setTrackIndex(firstProjectIndex);

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              setIsTrackSnapping(false);
            });
          });
        }
      }, slideTransitionDurationMs);
    }, slideStartDelayMs);
  }, [activeIndex, exitingTextTrackIndex, trackIndex]);

  const goToPrevious = useCallback(() => {
    const currentProjectIndex = projectSlides.findIndex(
      (slide) => slide.index === activeIndex,
    );

    if (currentProjectIndex <= 0) {
      changeSlide(projectSlides[projectSlides.length - 1].index);
      return;
    }

    changeSlide(projectSlides[currentProjectIndex - 1].index);
  }, [activeIndex, changeSlide]);

  const goToNext = useCallback(() => {
    const currentProjectIndex = projectSlides.findIndex(
      (slide) => slide.index === activeIndex,
    );

    if (
      currentProjectIndex === -1 ||
      currentProjectIndex === projectSlides.length - 1
    ) {
      changeSlide(projectSlides[0].index);
      return;
    }

    changeSlide(projectSlides[currentProjectIndex + 1].index);
  }, [activeIndex, changeSlide]);

  const isChangingSlide = exitingTextTrackIndex !== null;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') ||
        document.documentElement.dataset.activeSection !== '3'
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';

      if (isEditableTarget || isChangingSlide) {
        return;
      }

      event.preventDefault();

      if (!slides[activeIndex].image) {
        changeSlide(
          event.key === 'ArrowRight'
            ? firstProjectIndex
            : projectSlides[projectSlides.length - 1].index,
        );
        return;
      }

      if (event.key === 'ArrowRight') {
        goToNext();
        return;
      }

      goToPrevious();
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [activeIndex, changeSlide, goToNext, goToPrevious, isChangingSlide]);

  return (
    <div className='relative w-screen overflow-hidden pb-16'>
      <div
        className={`flex ${
          isTrackSnapping
            ? ''
            : 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.88,0,0.265,1)]'
        }`}
        style={{
          width: `${carouselSlides.length * 100}%`,
          transform: `translate3d(-${trackIndex * (100 / carouselSlides.length)}%, 0, 0)`,
        }}
      >
        {carouselSlides.map((slide, slideIndex) => {
          const canonicalSlideIndex =
            slideIndex === firstProjectCloneIndex ? firstProjectIndex : slideIndex;

          return (
          <div
            aria-hidden={activeIndex !== canonicalSlideIndex}
            className='min-h-[560px] shrink-0'
            key={`${slide.title}-${slideIndex}`}
            inert={activeIndex !== canonicalSlideIndex}
            style={{ width: `${100 / carouselSlides.length}%` }}
          >
            <div className='relative mx-auto grid min-h-[560px] w-full max-w-[1500px] items-center gap-12 px-8 lg:grid-cols-[0.74fr_1fr] lg:px-[130px]'>
              <ProjectArticle
                changeSlide={changeSlide}
                isTextResetting={resettingTextTrackIndex === slideIndex}
                isTextExiting={exitingTextTrackIndex === slideIndex}
                slide={slide}
                slideDirection={slideDirection}
              />
            </div>
          </div>
          );
        })}
      </div>
      {slides[activeIndex].image ? (
        <SliderControls
          activeIndex={activeIndex}
          changeSlide={changeSlide}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
          isChangingSlide={isChangingSlide}
        />
      ) : null}
    </div>
  );
}
