export const slides = [
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

export type ProjectSlide = (typeof slides)[number];

export const firstProjectIndex = slides.findIndex((slide) =>
  Boolean(slide.image),
);

export const projectSlides = slides
  .map((slide, index) => ({ ...slide, index }))
  .filter((slide) => Boolean(slide.image));

export const carouselSlides = [...slides, slides[firstProjectIndex]];
export const firstProjectCloneIndex = slides.length;
