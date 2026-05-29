export const sectionIds = ['top', 'about', 'skills', 'work', 'contact'];

export const sectionLabels = [
  'Hero',
  'About',
  'Skills',
  'Projects',
  'Contact',
];

export const goToSectionEventName = 'portfolio-go-to-section';
export const sectionChangeEventName = 'portfolio-section-change';

export const activeSectionClasses = sectionIds.map(
  (_, index) => `active-section-${index}`,
);

export const previousSectionClasses = sectionIds.map(
  (_, index) => `previous-section-${index}`,
);

export const directionClasses = ['section-direction-up', 'section-direction-down'];

export const phaseClasses = [
  'phase-about-intro',
  'phase-hero-text-exit',
  'phase-skills-intro',
];
