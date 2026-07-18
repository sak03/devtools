import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Tool inputs are processed locally in your browser; we do not collect or sell your paste content.`,
  alternates: {
    canonical: "/privacy/",
  },
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    description: `How ${SITE_NAME} handles privacy for browser-based developer tools.`,
    url: "/privacy/",
    siteName: SITE_NAME,
    type: "website",
  },
};

const lastUpdated = "July 18, 2026";

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: {lastUpdated}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Summary</h2>
          <p>
            {SITE_NAME} is built so that the content you paste into tools is
            processed in your browser. We do not collect, store, sell, or use
            your tool paste content for advertising or profiling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            2. What we process (and where)
          </h2>
          <p>
            When you use a tool (for example a formatter, encoder, QR
            generator, or hash utility), transformations run locally on your
            device using client-side code. We do not operate an application
            server that receives your tool inputs for processing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. What we do not collect
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Tool paste content, files you convert, or generated outputs</li>
            <li>Accounts, profiles, or login credentials (there are none)</li>
            <li>
              Payment information (the Service is free and has no checkout)
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Hosting and infrastructure logs
          </h2>
          <p>
            The site is hosted as a static website (currently via GitHub Pages)
            at{" "}
            <a
              href={SITE_URL}
              className="text-foreground underline-offset-2 hover:underline"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
            . Hosting providers, CDNs, and DNS operators may automatically
            process standard technical logs (such as IP address, user agent,
            and requested URLs) as part of delivering websites. We do not use
            those logs to read or reconstruct the content you type into tools,
            and we do not control every third-party infrastructure policy in
            full.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Local preferences (theme)
          </h2>
          <p>
            Preference data such as your color theme may be stored in your
            browser’s <code className="text-foreground">localStorage</code> so
            the site remembers light/dark/system settings. That data stays on
            your device and is not sent to us as tool content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            6. Cookies and analytics
          </h2>
          <p>
            {SITE_NAME} does not currently use third-party advertising cookies
            or analytics products that track tool usage content. If that ever
            changes, we will update this Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Children</h2>
          <p>
            The Service is not directed at children under 13, and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last
            updated” date at the top will change when we do. Continued use of
            the Service after changes means you accept the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            9. Related terms
          </h2>
          <p>
            Use of the Service is also governed by our{" "}
            <Link
              href="/terms/"
              className="text-foreground underline-offset-2 hover:underline"
            >
              Terms of Use
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
          <p>
            Privacy questions can be directed via{" "}
            <a
              href="https://sartajalam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:underline"
            >
              sartajalam.in
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
