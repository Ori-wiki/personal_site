import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { GithubLink } from "./components/GithubLink";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { ScrollRail } from "./components/ScrollRail";
import { ScrollSnapController } from "./components/ScrollSnapController";
import { Skills } from "./components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollSnapController />
      <ScrollRail />
      <GithubLink />
      <Header />
      <main
        id="portfolio-pages"
        className="fixed inset-0 min-h-screen w-full overflow-visible transition-[transform] duration-[620ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform [transform:translate3d(0,var(--initial-section-offset),0)]"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
