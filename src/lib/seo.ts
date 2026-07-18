import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import type { ToolMeta } from "@/lib/tools/registry";
import { CATEGORY_LABELS } from "@/lib/tools/types";

export function homeMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} — Developer Utilities`,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `${SITE_NAME} — Developer Utilities`,
      description: SITE_DESCRIPTION,
      type: "website",
      url: SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Developer Utilities`,
      description: SITE_DESCRIPTION,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export function toolMetadata(tool: ToolMeta): Metadata {
  const title = tool.name;
  const description = tool.description;
  const url = `/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function toolJsonLd(tool: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        url: `${SITE_URL}/tools/${tool.slug}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        browserRequirements: "Requires JavaScript",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: CATEGORY_LABELS[tool.category],
            item: `${SITE_URL}/#${tool.category}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tool.name,
            item: `${SITE_URL}/tools/${tool.slug}`,
          },
        ],
      },
    ],
  };
}
