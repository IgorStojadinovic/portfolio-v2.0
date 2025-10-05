import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Skills() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript"],
    "frontend frameworks": ["React", "Next.js"],
    "state management": ["Redux", "Zustand", "TanStack Query", "Context API"],
    "cms & backend": [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "REST APIs",
      "GraphQL",
      "Headless CMS",
      "WordPress",
    ],
    styling: ["Tailwind CSS", "Bootstrap", "SASS/SCSS", "Styled Components"],
    "design tools": ["Figma", "Photoshop"],
    animation: ["GreenSock(GSAP)", "Framer Motion", "CSS Animations"],
    "devOps/tools": ["Git/GitHub", "Jira", "CI/CD", "Webpack"],
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        markers: false,
        toggleActions: "play none none none",
      },
    });

    // Fade in/out za glavni container
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

    // Fade in za svaku kategoriju
    categoriesRef.current.forEach((category, index) => {
      if (category) {
        tl.fromTo(
          category,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
          },
        );
      }
    });
  });
  return (
    <div ref={containerRef} className="h-screen w-full p-24">
      <h2 className="mb-8 text-3xl font-bold uppercase">Current Skills</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], index) => (
          <div
            ref={(el) => {
              if (el) {
                categoriesRef.current[index] = el;
              }
            }}
            key={category}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-orange-400 uppercase">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((skill) => (
                <li key={skill} className="flex items-center uppercase">
                  <span className="mr-2 h-2 w-2  border border-stone-500" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
