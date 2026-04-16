import { DemoPreviewSection } from "@/components/landing/DemoPreviewSection";
import { DeveloperExperienceSection } from "@/components/landing/DeveloperExperienceSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { DemoBanner } from "@/components/shared/demo-banner";
import { getSessionUser } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSessionUser();

  return (
    <div className="overflow-hidden" style={{ color: "var(--text)" }}>
      <HeroSection isLoggedIn={Boolean(session)} />

      <section className="content-shell" style={{ paddingTop: 0 }}>
        <DemoBanner />
      </section>

      <FeaturesSection />
      <DemoPreviewSection />
      <DeveloperExperienceSection />
      <FooterSection />
    </div>
  );
}
