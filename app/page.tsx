import { About } from "./components/About";
import { Contact } from "./components/Contact";
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
      <Header />
      <main id="portfolio-pages" className="portfolio-pages">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
