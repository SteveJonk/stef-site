import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  rounded?: boolean
}

export const SocialIcons = ({ rounded }: Props) => (
  <div className="mb-3 flex space-x-4">
    <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} rounded={rounded} />
    <SocialIcon kind="github" href={siteMetadata.github} rounded={rounded} />
    <SocialIcon kind="facebook" href={siteMetadata.facebook} rounded={rounded} />
    <SocialIcon kind="linkedin" href={siteMetadata.linkedin} rounded={rounded} />
    <SocialIcon kind="twitter" href={siteMetadata.twitter} rounded={rounded} />
  </div>
)
