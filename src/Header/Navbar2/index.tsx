'use client'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { Book, Menu, Settings, Sunset, Trees, Zap } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import { cn } from '@/utilities/ui'
import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SCROLL_TARGET_STORAGE_KEY } from '@/components/ScrollToAnchor'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface Navbar2Props {
  logo?: {
    url?: string
    title?: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
  }
}

const Navbar2 = ({
  logo = {
    url: '/',
    title: 'eighty',
  },
  menu,
  auth,
}: Navbar2Props) => {
  const t = useTranslations('Navbar2')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fallbackMenu: MenuItem[] = [
    {
      title: t('menu.features.title'),
      url: '#',
      items: [
        {
          title: t('menu.features.items.blog.title'),
          description: t('menu.features.items.blog.description'),
          icon: <Book className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: t('menu.features.items.how-works.title'),
          description: t('menu.features.items.how-works.description'),
          icon: <Zap className="size-5 shrink-0" />,
          url: '/sk/ako-to-funguje',
        },
        {
          title: t('menu.features.items.manage-web.title'),
          description: t('menu.features.items.manage-web.description'),
          icon: <Settings className="size-5 shrink-0" />,
          url: '/sk/ako-spravovat-web',
        },
      ],
    },
    {
      title: t('menu.links.gallery'),
      url: '/sk/gallery',
    },
    {
      title: t('menu.links.contact'),
      url: '/sk/kontakt',
    },
  ]

  const menuToRender = menu && menu.length > 0 ? menu : fallbackMenu
  const fallbackAuth = { login: { title: t('auth.login'), url: '#' } }
  const resolvedAuth = auth ?? fallbackAuth
  const resolvedAuthLogin = resolvedAuth.login ?? fallbackAuth.login

  return (
    <section
      className={cn(
        'sticky top-0 z-50 py-4 transition-colors duration-300',
        isScrolled ? 'bg-background shadow-md' : 'bg-transparent shadow-md',
      )}
    >
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <span className={cn('text-3xl font-bold tracking-tight transition-colors')}>
              {logo.title}
            </span>
          </a>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenuWithoutViewport>
                <NavigationMenuList className="relative">
                  {menuToRender.map((item) => renderMenuItem(item, isScrolled))}
                </NavigationMenuList>
              </NavigationMenuWithoutViewport>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              className={cn('h-10 rounded-md px-4 hover:scale-105 transition-all duration-200')}
              onClick={(e) => {
                e.preventDefault()
                const href = '/sk/#konfigurator-2'
                try {
                  const targetUrl = new URL(href, window.location.origin)
                  const currentUrl = new URL(window.location.href)
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
                  if (hash) {
                    window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, hash)
                  }
                  const nextPath = `${targetUrl.pathname}${targetUrl.search}`
                  window.location.assign(nextPath)
                } catch {
                  // If URL parsing fails, fallback to simple navigation
                  window.location.href = href
                }
              }}
            >
              {t('ctaPrimary')}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <span className="text-2xl font-bold tracking-tight">{logo.title}</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menuToRender.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="h-10 px-6"
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById('konfigurator-2')
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }}
                    >
                      {t('ctaPrimary')}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem, isScrolled: boolean) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            'bg-transparent text-sm font-medium focus-visible:outline-none transition-colors',
            'hover:bg-accent hover:text-foreground',
            'data-[state=open]:bg-accent data-[state=open]:text-foreground',
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="origin-top-center data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 relative bg-popover z-50 top-11 w-full overflow-hidden rounded-md border shadow md:absolute md:left-1/2 md:w-80 md:-translate-x-1/2">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-full">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className={cn(
          'bg-transparent group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-foreground',
        )}
        onClick={(e) => {
          if (!item.url) return

          if (item.url.startsWith('#')) {
            e.preventDefault()
            const targetId = item.url.slice(1)
            if (targetId) {
              document
                .getElementById(targetId)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            return
          }

          if (item.url.includes('#')) {
            try {
              const targetUrl = new URL(item.url, window.location.origin)
              const currentUrl = new URL(window.location.href)
              const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
              const decodeHash = (hash: string) => {
                if (!hash) return ''
                try {
                  return decodeURIComponent(hash)
                } catch {
                  return hash
                }
              }

              if (normalize(targetUrl.pathname) === normalize(currentUrl.pathname)) {
                e.preventDefault()
                const rawHash = targetUrl.hash.replace('#', '')
                const hash = decodeHash(rawHash)
                if (hash) {
                  document
                    .getElementById(hash)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                return
              }

              const rawHash = targetUrl.hash.replace('#', '')
              const hash = decodeHash(rawHash)
              if (hash) {
                e.preventDefault()
                window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, hash)
                const nextPath = `${targetUrl.pathname}${targetUrl.search}`
                window.location.assign(nextPath)
              }
            } catch {
              // ignore parsing errors, fallback to default navigation
            }
          }
        }}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-muted-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
        )}
      </div>
    </a>
  )
}

const NavigationMenuWithoutViewport = ({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) => {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      {/* The Viewport needs to be removed to center align submenus under their parents. You could remove this from the shadcn/ui component */}
      {/* {viewport && <NavigationMenuViewport />} */}
    </NavigationMenuPrimitive.Root>
  )
}

export { Navbar2 }
