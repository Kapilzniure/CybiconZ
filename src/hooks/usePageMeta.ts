import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
  image?: string
}

const SITE = 'CybiconZ'
const BASE_URL = 'https://cybiconz.com'
const DEFAULT_IMAGE = `${BASE_URL}/cybiconz-logo.png`

function setMeta(selector: string, content: string, attr = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, selector)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function usePageMeta({ title, description, image = DEFAULT_IMAGE }: PageMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE}`
    const url = `${BASE_URL}${window.location.pathname}`

    document.title = fullTitle

    setMeta('description', description)
    setLink('canonical', url)

    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', SITE, 'property')
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:image:alt', `${title} — CybiconZ`, 'property')
    setMeta('og:locale', 'en_US', 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:site', '@cybiconz')
    setMeta('twitter:creator', '@cybiconz')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)
  }, [title, description, image])
}
