import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

const SocialIcon = ({ kind, href, rounded = false }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]
  return (
    <a
      className={`text-sm text-gray-500 transition hover:text-gray-600 ${
        rounded ? 'rounded-full bg-blue-500 p-1.5 hover:bg-blue-400 dark:hover:bg-blue-600' : ''
      }`}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`h-6 w-6 fill-current ${
          rounded
            ? 'text-white'
            : 'text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-600'
        }`}
      />
    </a>
  )
}

export default SocialIcon
