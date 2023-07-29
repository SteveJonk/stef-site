import GA from './GoogleAnalytics'
import siteMetadata from '@/data/siteMetadata'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    plausible?: (...args: unknown[]) => void
    sa_event?: (...args: unknown[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}</>
}

export default Analytics
