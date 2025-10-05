"use client";
import Navbar from "@/components/navbar";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useRef, useState } from "react";
import NavLink from "@/components/NavLink";
import About from "@/components/pages/About";
import Skills from "@/components/pages/Skills";
import Projects from "@/components/pages/Projects";
import Contact from "@/components/pages/Contact";

gsap.registerPlugin(
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollToPlugin,
  ScrollSmoother,
);
export default function Home() {
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeLink, setActiveLink] = useState<string>("About");
  const isScrollingRef = useRef(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    // Kreiranje ScrollTrigger-a za svaku sekciju
    const sections = [
      { ref: aboutRef.current, name: "About" },
      { ref: skillsRef.current, name: "Skills" },
      { ref: projectsRef.current, name: "Projects" },
      { ref: contactRef.current, name: "Contact" },
    ];

    sections.forEach(({ ref, name }) => {
      ScrollTrigger.create({
        trigger: ref,
        start: "top 40%", // Aktivira se kada sekcija dostigne 40% visine ekrana
        end: "bottom 40%",
        onEnter: () => !isScrollingRef.current && setActiveLink(name),
        onEnterBack: () => !isScrollingRef.current && setActiveLink(name),
        markers: false, // Isključeni markeri u produkciji
      });
    });

  /*   ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
    }); */
  });

  const components = {
    About,
    Skills,
    Projects,
    Contact,
  };

  const PageComponent = components[activeLink as keyof typeof components];
  const handleMouseEnter = (index: number) => {
    const target = linkRefs.current[index];
    if (target) {
      const linkElement = target.querySelector("a");
      if (linkElement) {
        const originalText = ["About", "Skills", "Projects", "Contact"][index];
        gsap.to(linkElement, {
          duration: 0.2,
          scrambleText: {
            text: originalText,
            chars: "!@#$%^&*()",
            revealDelay: 0.1,
            speed: 0.3,
          },
        });
      }
    }
  };
  const handleMouseLeave = (index: number) => {
    const target = linkRefs.current[index];
    if (target) {
      const linkElement = target.querySelector("a");
      if (linkElement) {
        const originalText = ["About", "Skills", "Projects", "Contact"][index];
        gsap.to(linkElement, {
          duration: 0.2,
          scrambleText: {
            text: originalText,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            revealDelay: 0.1,
            speed: 0.3,
          },
        });
      }
    }
  };

  const handleLinkClick = (text: string) => {
    setActiveLink(text);
    isScrollingRef.current = true;

    // Pronalazimo odgovarajuću referencu za sekciju
    const sectionRefs = {
      About: aboutRef,
      Skills: skillsRef,
      Projects: projectsRef,
      Contact: contactRef,
    };

    // Uzimamo referencu za kliknutu sekciju
    const targetRef = sectionRefs[text as keyof typeof sectionRefs];

    if (targetRef?.current) {
      // Smooth scroll do sekcije
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: targetRef.current,
          offsetY: 0,
        },
        ease: "power2.inOut",
        onComplete: () => {
          // Reset isScrolling nakon što se animacija završi
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 100);
        },
      });
    }
  };

  return (
    <div className="flex">
      <div className="flex h-screen w-1/3 flex-col">
        {/*    <Navbar /> */}
        <section className="bg-background fixed z-10 h-full w-1/3 border-r border-l border-stone-800 text-white">
          <article className="flex h-full w-full flex-col p-24">
            <h1 className="text-4xl font-bold uppercase">Igor Stojadinovic</h1>
            <h3 className="mt-2"> Fullstack Developer</h3>

            <div className="w-[300px mt-2">
              I build accessible, pixel-perfect digital experiences for the web.
            </div>

            <ul className="mt-2 flex flex-1 flex-col justify-evenly uppercase">
              {["About", "Skills", "Projects", "Contact"].map((text, index) => (
                <NavLink
                  key={text}
                  href={`#${text.toLowerCase()}`}
                  text={text}
                  isActive={activeLink === text}
                  index={index}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  mouseEnter={handleMouseEnter}
                  mouseLeave={handleMouseLeave}
                  onClick={handleLinkClick}
                />
              ))}
            </ul>
          </article>
        </section>
      </div>
      <div className="w-2/3">
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <section className="flex-col" ref={containerRef}>
              {/*    <PageComponent /> */}

              <div ref={aboutRef} data-lag="2">
                <About />
              </div>
              <div ref={skillsRef} data-lag="2">
                <Skills />
              </div>
              <div ref={projectsRef} data-lag="2">
                <Projects />
              </div>
              <div ref={contactRef} data-lag="2">
                <Contact />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
