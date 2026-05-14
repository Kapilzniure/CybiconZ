import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

const SITE = "CybiconZ";
const DEFAULT_OG_IMAGE = "/og-default.jpg";

function ensureMeta(name: string, attr: "name" | "property", value: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.content = value;
}

export function usePageMeta({ title, description, ogImage }: PageMeta) {
  useEffect(() => {
    document.title = `${title} | ${SITE}`;

    ensureMeta("description", "name", description);
    ensureMeta("og:title", "property", `${title} | ${SITE}`);
    ensureMeta("og:description", "property", description);
    ensureMeta("og:image", "property", ogImage ?? DEFAULT_OG_IMAGE);
    ensureMeta("twitter:image", "name", ogImage ?? DEFAULT_OG_IMAGE);
  }, [title, description, ogImage]);
}
