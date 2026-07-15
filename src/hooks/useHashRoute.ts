import { useEffect, useState } from 'react'

import { homeRoute, parseRoute, type AppRoute } from '../app/routes'

export function useHashRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(
    () => parseRoute(window.location.hash) ?? homeRoute,
  )

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseRoute(window.location.hash)
      // Plain anchors (`#pipeline-stage-…`) scroll within the current page.
      if (nextRoute) setRoute(nextRoute)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
