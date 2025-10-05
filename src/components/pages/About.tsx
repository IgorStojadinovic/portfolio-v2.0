"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function About() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef(null);
  const hobbyRef = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.8,
      },
    );
    gsap.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 1.1,
      },
    );
    gsap.fromTo(
      hobbyRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: 1.3,
      },
    );
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: 200,
        duration: 1,
      },
      {
        opacity: 0.5,
        x: 0,
        duration: 0.2,
        delay: 1.5,
      },
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        scrub: 1,
        markers: false,
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      containerRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    );
  });

  return (
    <div className="relative flex h-full flex-col items-center justify-center p-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 right-0 -z-10 h-full min-h-full w-2/3 object-cover opacity-30"
      >
        <source src="/vhs-tape.mp4" type="video/mp4" />
      </video>
      <div ref={containerRef} className="">
        <p className="text-7xl font-bold uppercase" ref={titleRef}>
          I’m a FullStack Developer passionate about creating responsive,
          user-friendly applications with{" "}
          <span className="text-orange-400">clean</span> and{" "}
          <span className="text-orange-400">efficient</span> code.
        </p>
        <p
          className="text-4xl leading-12 tracking-widest uppercase"
          ref={descriptionRef}
        >
          I enjoy combining technical skills with creativity to deliver seamless
          digital experiences.
        </p>
        {/*  <p className="text-xl tracking-widest uppercase" ref={hobbyRef}>
          When I&apos;m not coding, you&apos;ll probably find at the gym,
          lifting steel while enjoying latest metal hits.
        </p>
 */}{/* 
        <Image
          ref={imageRef}
          src="/logo.png"
          alt="About"
          width={200}
          height={200}
          priority
          className="absolute right-0 bottom-0 mr-5 mb-5"
        /> */}
      </div>
    </div>
  );
}
