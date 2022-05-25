import '../../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { RouteGuard } from '../components/core/RouteGuard'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
        <RouteGuard>
            <Component {...pageProps} />
        </RouteGuard>
  )
}

export default MyApp
