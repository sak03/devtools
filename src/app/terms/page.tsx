import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${SITE_NAME} — free browser-based developer utilities. Provided as-is for lawful use; we are not responsible for misuse.`,
  alternates: {
    canonical: "/terms/",
  },
  openGraph: {
    title: `Terms of Use — ${SITE_NAME}`,
    description: `Terms governing use of ${SITE_NAME} developer utilities.`,
    url: "/terms/",
    siteName: SITE_NAME,
    type: "website",
  },
};

const lastUpdated = "July 18, 2026";

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: {lastUpdated}</p>

      <div className="prose-legal mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            1. Acceptance of these terms
          </h2>
          <p>
            By accessing or using {SITE_NAME} at{" "}
            <a
              href={SITE_URL}
              className="text-foreground underline-offset-2 hover:underline"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>{" "}
            (the “Service”), you agree to these Terms of Use. If you do not
            agree, do not use the Service.
          </p>
          <p>
            These terms are a general site policy for a free public utility
            site. They are not personalized legal advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Purpose</h2>
          <p>
            {SITE_NAME} provides free, browser-based developer utilities (for
            example formatters, encoders, converters, and generators) to make
            everyday development work easier. The Service is offered for
            legitimate, lawful technical use by developers and similar users.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. No account; provided “as is”
          </h2>
          <p>
            The Service is provided free of charge, without requiring an
            account, and on an “as is” and “as available” basis. We do not
            warrant that the Service will be uninterrupted, error-free, or fit
            for any particular purpose. Tool outputs may contain mistakes; you
            are responsible for verifying results before relying on them in
            production systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Client-side processing
          </h2>
          <p>
            To the best of our design intent, tool inputs you paste or upload
            in the browser are processed locally in your device. We do not
            operate an application backend that receives your tool paste
            content for processing. Hosting providers may still operate
            standard infrastructure (see our{" "}
            <Link
              href="/privacy/"
              className="text-foreground underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            ).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Acceptable use
          </h2>
          <p>You agree to use the Service only for lawful purposes. You must not use the Service to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Violate any applicable law or regulation</li>
            <li>
              Engage in fraud, unauthorized access, harassment, or other harmful
              activity
            </li>
            <li>
              Attempt to disrupt, overload, or abuse the Service or related
              infrastructure
            </li>
            <li>
              Misrepresent the Service’s output as professional legal, security,
              or compliance advice
            </li>
          </ul>
          <p>
            You are solely responsible for how you use the tools and for any
            content you process with them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            6. No liability for misuse or damages
          </h2>
          <p>
            This Service is offered to help the public and the developer
            community. If someone misuses the tools, that is solely their
            responsibility. We have no involvement in and accept no liability
            for misuse of the Service by you or any third party.
          </p>
          <p>
            To the maximum extent permitted by law, {SITE_NAME} and its
            maintainer are not liable for any direct, indirect, incidental,
            consequential, or special damages arising from your use of—or
            inability to use—the Service, including loss of data, profits, or
            business interruption, even if advised of the possibility of such
            damages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            7. Intellectual property
          </h2>
          <p>
            The {SITE_NAME} name, branding, site design, and source materials we
            publish remain owned by their respective owners. You retain all
            rights to content you input into the tools and to outputs generated
            from your content. You grant no license to us for that content
            beyond what is needed for the tool to run locally in your browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            8. Third-party links
          </h2>
          <p>
            The Service may link to external sites (including the maintainer’s
            portfolio). We do not control those sites and are not responsible
            for their content, policies, or practices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Changes</h2>
          <p>
            We may update these Terms of Use from time to time. The “Last
            updated” date at the top will change when we do. Continued use of
            the Service after changes means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
          <p>
            Questions about these terms can be directed via{" "}
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
