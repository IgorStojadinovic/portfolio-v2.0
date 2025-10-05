"use client";
import { useRef, useState } from "react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const startFromTime = (timeString: string) => {
    if (audioRef.current) {
      try {
        // Konvertujemo string format "2:07" u sekunde
        const [minutes, seconds] = timeString.split(":").map(Number);
        const timeInSeconds = minutes * 60 + seconds;

        audioRef.current.currentTime = timeInSeconds;
        audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Error starting from time:", error);
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.log("Error starting from time:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <header className="navbar bg-background top-0 left-0 z-50 w-full border-b border-stone-800 px-6 py-10">
      <nav className="relative flex justify-between items-end">
   
        <div className="fixed top-5 right-5 flex items-center rounded-full bg-black/50 p-2">
          <audio ref={audioRef} src="/Brainwave.mp3" />
          <button
            onClick={() => {
              startFromTime("1:56");
              togglePlay();
            }}
            className="text-white transition-colors hover:text-orange-400"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
