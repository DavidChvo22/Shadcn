'use client'

import { useEffect } from 'react'

export const SCROLL_TARGET_STORAGE_KEY = 'pending-scroll-target'

export const ScrollToAnchor: React.FC = () => {
  useEffect(() => {
    const targetId = window.sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY)

    if (!targetId) {
      return
    }

    const scrollToTarget = () => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}#${targetId}`,
        )
        window.sessionStorage.removeItem(SCROLL_TARGET_STORAGE_KEY)
      }
    }

    const timeout = window.setTimeout(scrollToTarget, 200)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  return null
}

