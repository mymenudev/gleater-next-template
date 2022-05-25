import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function RouteGuard ({ children }: { children: any }) {
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [authorized, setAuthorized] = useState(false)

  function authCheck (url: string) {
    const path = url.split('?')[0]
    console.log(path)
    setAuthorized(true)
  }

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return authorized && children
}

export { RouteGuard }
