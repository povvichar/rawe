"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // force3D keeps every tweened transform on a GPU layer (translate3d/matrix3d)
  // instead of a 2D matrix that repaints on each scroll frame.
  gsap.defaults({ force3D: true });
}

export { gsap, ScrollTrigger };
