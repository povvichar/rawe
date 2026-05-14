import type { ComponentType } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LifestyleSection from "@/components/sections/LifestyleSection";
import CommunitySection from "@/components/sections/CommunitySection";

export type SectionEntry = {
  id: string;
  Component: ComponentType;
};

export const sections: SectionEntry[] = [
  { id: "hero", Component: HeroSection },
  { id: "products", Component: ProductsSection },
  { id: "lifestyle", Component: LifestyleSection },
  { id: "community", Component: CommunitySection },
];
