'use client';

import {
  carouselSlides,
  firstProjectCloneIndex,
  firstProjectIndex,
  slides,
} from './data';
import { ProjectArticle, SliderControls } from './ProjectParts';
import { useProjectSlider } from './useProjectSlider';

export function ProjectsSlider() {
  const {
    activeIndex,
    changeSlide,
    exitingTextTrackIndex,
    goToNext,
    goToPrevious,
    isChangingSlide,
    isTrackSnapping,
    reduceMotion,
    resettingTextTrackIndex,
    slideDirection,
    swipeHandlers,
    trackIndex,
  } = useProjectSlider();

  return (
    <div
      className='relative w-screen touch-pan-y overflow-hidden pb-28 pt-20 sm:pt-24 lg:pb-16 lg:pt-0'
      {...swipeHandlers}
    >
      <p className='sr-only' aria-live='polite'>
        Current project slide: {slides[activeIndex].title}
      </p>
      <div
        className={`flex ${
          isTrackSnapping
            ? ''
            : reduceMotion
              ? ''
              : 'transition-transform duration-[var(--motion-duration-project-slide)] ease-[var(--motion-ease-project)]'
        }`}
        style={{
          width: `${carouselSlides.length * 100}%`,
          transform: `translate3d(-${trackIndex * (100 / carouselSlides.length)}%, 0, 0)`,
        }}
      >
        {carouselSlides.map((slide, slideIndex) => {
          const canonicalSlideIndex =
            slideIndex === firstProjectCloneIndex
              ? firstProjectIndex
              : slideIndex;

          return (
            <div
              aria-hidden={activeIndex !== canonicalSlideIndex}
              className='min-h-[calc(100svh-128px)] shrink-0 lg:min-h-[560px]'
              inert={activeIndex !== canonicalSlideIndex}
              key={`${slide.title}-${slideIndex}`}
              style={{ width: `${100 / carouselSlides.length}%` }}
            >
              <div className='relative mx-auto grid min-h-[calc(100svh-128px)] w-full max-w-[1500px] items-center gap-6 px-5 sm:px-8 lg:min-h-[560px] lg:grid-cols-[0.74fr_1fr] lg:gap-12 lg:px-[130px] lg:pt-0'>
                <ProjectArticle
                  changeSlide={changeSlide}
                  isTextExiting={exitingTextTrackIndex === slideIndex}
                  isTextResetting={resettingTextTrackIndex === slideIndex}
                  reduceMotion={reduceMotion}
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
