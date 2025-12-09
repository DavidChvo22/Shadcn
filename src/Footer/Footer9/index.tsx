'use client'

import { CircleCheck, LifeBuoy, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Button } from '@/components/ui/button'
import { SCROLL_TARGET_STORAGE_KEY } from '@/components/ScrollToAnchor'
import { Link } from '@/i18n/navigation'
import { useRouter } from 'next/navigation'
const sectionConfig = [
  {
    key: 'services',
    linkKeys: [
      { key: 'configurator', href: '/sk/#konfigurator-2' },
      { key: 'addons', href: '/sk/#možnosti-5' },
    ] as const,
  },
  {
    key: 'resources',
    linkKeys: [
      { key: 'blog', href: '/sk/blog' },
      { key: 'pricing', href: '/sk/pricing' },
      { key: 'gallery', href: '/sk/gallery' },
      { key: 'faq', href: '/sk/#faq-6' },
    ] as const,
  },
  {
    key: 'about',
    linkKeys: [{ key: 'references', href: '/sk/#referencie-3' }] as const,
  },
] as const

const featureKeys = ['responsive', 'sections', 'support'] as const

const Footer9 = ({}: { locale?: string } = {}) => {
  const t = useTranslations('Footer9')
  const router = useRouter()
  const sections = sectionConfig.map(({ key, linkKeys }) => ({
    title: t(`sections.${key}.title`),
    links: linkKeys.map((linkItem) => ({
      href: linkItem.href,
      name: t(`sections.${key}.links.${linkItem.key}`),
    })),
  }))

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href) return

    // Handle anchor links on the same page
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    // Handle links with anchor that might be on different page
    if (href.includes('#')) {
      try {
        const targetUrl = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
        const currentUrl = new URL(typeof window !== 'undefined' ? window.location.href : 'http://localhost')
        const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
        const decodeHash = (hash: string) => {
          if (!hash) return ''
          try {
            return decodeURIComponent(hash)
          } catch {
            return hash
          }
        }

        // Same page - scroll to anchor
        if (normalize(targetUrl.pathname) === normalize(currentUrl.pathname)) {
          e.preventDefault()
          const rawHash = targetUrl.hash.replace('#', '')
          const hash = decodeHash(rawHash)
          if (hash) {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          return
        }
        // Different page - navigate and then scroll after page loads
        else {
          e.preventDefault()
          const rawHash = targetUrl.hash.replace('#', '')
          const hash = decodeHash(rawHash)
          if (hash && typeof window !== 'undefined') {
            window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, hash)
          }
          const nextPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
          router.push(nextPath)
        }
      } catch {
        // If URL parsing fails, let default navigation handle it
        router.push(href)
      }
    } else {
      // Regular link without anchor
      e.preventDefault()
      router.push(href)
    }
  }

  const metaLinks = [
    { href: '#', label: t('metaLinks.privacy') },
    { href: '#', label: t('metaLinks.terms') },
  ]

  return (
    <section className="bg-zinc-950 text-white py-32">
      <div className="container px-16">
        <footer>
          <div className="mb-14 flex flex-col justify-between gap-11 md:items-start xl:flex-row xl:items-center xl:gap-6">
            <div>
              <h1 className="mb-4 text-4xl font-semibold text-white">{t('heading')}</h1>
              <p className="text-zinc-300 mb-8 text-xl">{t('subheading')}</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  className="h-10 bg-white text-zinc-950 hover:bg-white/90 hover:scale-105 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    const href = '/sk/#konfigurator-2'
                    try {
                      const targetUrl = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
                      const currentUrl = new URL(typeof window !== 'undefined' ? window.location.href : 'http://localhost')
                      const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
                      const decodeHash = (hash: string) => {
                        if (!hash) return ''
                        try {
                          return decodeURIComponent(hash)
                        } catch {
                          return hash
                        }
                      }

                      // Same page - scroll to anchor
                      if (normalize(targetUrl.pathname) === normalize(currentUrl.pathname)) {
                        const rawHash = targetUrl.hash.replace('#', '')
                        const hash = decodeHash(rawHash)
                        if (hash) {
                          document
                            .getElementById(hash)
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                        return
                      }
                      // Different page - navigate and then scroll after page loads
                      const rawHash = targetUrl.hash.replace('#', '')
                      const hash = decodeHash(rawHash)
                      if (hash && typeof window !== 'undefined') {
                        window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, hash)
                      }
                      const nextPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
                      router.push(nextPath)
                    } catch {
                      // If URL parsing fails, fallback to simple navigation
                      router.push(href)
                    }
                  }}
                >
                  {t('primaryCta')}
                </Button>
              </div>
            </div>
            <div className="bg-background text-zinc-700 flex flex-col justify-between gap-6 rounded-2xl p-6 shadow-lg md:flex-row">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex text-6xl font-semibold">{t('price')}</div>
                <div className="text-sm">{t('priceLabel')}</div>
              </div>
              <div className="bg-muted-foreground/30 h-[1px] w-full md:h-auto md:w-[1px]" />
              <ul className="text-zinc-700 flex flex-col justify-center space-y-3">
                {featureKeys.map((featureKey) => (
                  <li
                    key={featureKey}
                    className="hover:text-primary flex items-center gap-2 font-medium"
                  >
                    <CircleCheck className="text-primary h-5 w-5" />
                    <p className="text-zinc-700">{t(`features.${featureKey}`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t border-zinc-700 pt-20 lg:grid-cols-5">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                <ul className="text-zinc-400 space-y-4">
                  {section.links.map((link, linkIdx) => {
                    const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://') || link.href.startsWith('//')
                    const isAnchor = link.href.startsWith('#')

                    if (isExternal) {
                      return (
                        <li key={linkIdx} className="hover:text-primary font-medium">
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.name}
                          </a>
                        </li>
                      )
                    }

                    if (isAnchor) {
                      return (
                        <li key={linkIdx} className="hover:text-primary font-medium">
                          <a href={link.href} onClick={(e) => {
                            e.preventDefault()
                            const targetId = link.href.slice(1)
                            if (targetId) {
                              document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}>
                            {link.name}
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={linkIdx} className="hover:text-primary font-medium">
                        <Link href={link.href}>
                          {link.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-zinc-400 mt-20 flex flex-col items-start justify-between gap-4 border-t border-zinc-700 pt-8 text-center text-sm font-medium lg:flex-row lg:items-right">
            <ul className="flex items-center justify-end gap-4 lg:ml-auto">
              {metaLinks.map((metaLink, idx) => (
                <li key={idx}>
                  <a
                    href={metaLink.href}
                    onClick={(e) => handleLinkClick(e, metaLink.href)}
                    className="hover:text-primary"
                  >
                    {metaLink.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="text-white">{t('followUs')}</span>
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  className="flex items-center h-10 gap-2 hover:scale-105 transition-all duration-200"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer9 }
