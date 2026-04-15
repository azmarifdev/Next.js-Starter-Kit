import { DemoPreviewSection } from "@/components/landing/DemoPreviewSection";
import { DeveloperExperienceSection } from "@/components/landing/DeveloperExperienceSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden" style={{ color: "var(--text)" }}>
      <HeroSection />
      <FeaturesSection />
      <DemoPreviewSection />
      <DeveloperExperienceSection />
      <FooterSection />
    </div>
  );
}
