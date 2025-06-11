"use client";
import Hero from "@/components/hero";
import PlantDiseaseLandingPage from "@/components/landing-page";
import PlantAnalyzer from "@/components/plant-analyser";
import { currentUser } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default function Home() {
  return <Hero />;
}
