import Image from "next/image";
import Link from "next/link";

import { DemoBanner } from "@/components/common/demo-banner";
import messages from "@/i18n/messages/en.json";

export default function MarketingPage() {
  const marketing = messages.marketing;

  return (
    <section className="content-shell marketing stack">
      <DemoBanner />

      <div className="hero-card stack">
        <div className="row between">
          <Image src="/assets/logo.png" alt="Template Logo" width={64} height={64} />
          <span className="muted">{marketing.projectName}</span>
        </div>

        <h1>{marketing.title}</h1>
        <p>{marketing.subtitle}</p>

        <Image
          src="/assets/banner.png"
          alt="Next.js Starter Kit banner"
          width={1200}
          height={450}
          className="hero-image"
          priority
        />

        <div className="row">
          <Link className="btn" href="/login">
            {marketing.ctaPrimary}
          </Link>
          <Link className="btn secondary" href="/dashboard">
            {marketing.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>{marketing.featuresTitle}</h2>
        <ul className="list">
          {marketing.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
