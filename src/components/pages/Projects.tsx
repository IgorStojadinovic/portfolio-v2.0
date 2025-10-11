"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = [
    {
      title: "Audiophile",
      description: "Ecommerce website.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Zustand",
        "Prisma",
        "Zod",
        "Shadcn/UI",
        "React-Hook-Form",
      ],
      link: "https://audiophile-prod.netlify.app/",
    },
    {
      title: "Finace Dashboard",
      description:
        "Fullstack dashboard for managing finances, with features for budgeting, tracking expenses, and generating reports.",
      technologies: [
        "React",
        "Vite",
        "Tailwind",
        "Zustand",
        "React Query",
        "Chart.js",
        "Prisma",
        "PostgreSQL",
        "Node.js",
        "Express",
      ],
      link: "https://finance-dashboard-psi-sand.vercel.app/",
    },
    {
      title: "Ruess Group",
      description: "German marketing agency website.",
      technologies: ["Prismic", "Next.js", "SASS/SCSS"],
      link: "https://ruess-group.com/en/",
    },
  ];
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        markers: false,
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
    );
  });

  return (
    <div ref={containerRef} className="h-screen w-full p-24">
      <h2 className="mb-8 text-3xl font-bold uppercase">Projects</h2>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={project.title}
            className="rounded-xs border border-stone-800 p-6 transition-all hover:border-stone-500"
          >
            <h3 className="mb-2 text-xl font-semibold text-orange-400">
              {project.title}
            </h3>
            <p className="mb-4 text-stone-400">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-stone-800 px-2 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
