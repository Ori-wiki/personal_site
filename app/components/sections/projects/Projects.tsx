import { CodeGlow } from '../../shared/CodeGlow';
import { ProjectsSlider } from './ProjectsSlider';

export function Projects() {
  return (
    <section
      id='work'
      className='motion-section h-screen min-h-screen snap-start overflow-hidden'
    >
      <CodeGlow position='top-left' />
      <CodeGlow position='bottom-right' />

      <div className='absolute left-[16%] top-[10%] hidden h-[78%] w-[340px] -skew-y-6 rounded-[28px] border border-white/[0.035] bg-[radial-gradient(circle,#4b4d56_1.5px,transparent_2px)] bg-[length:42px_42px] opacity-45 shadow-[24px_36px_80px_rgba(0,0,0,0.28)] [mask-image:linear-gradient(180deg,transparent,black_12%,black_78%,transparent)] lg:block' />

      <div className='section-content relative z-10 flex h-screen w-full items-center'>
        <ProjectsSlider />
      </div>
    </section>
  );
}
