import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  rounded?: boolean
}

export const SocialIcons = ({ rounded }: Props) => (
  <div className="mb-3 flex space-x-4">
    <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} rounded={rounded} />
    <SocialIcon kind="github" href={siteMetadata.github} size={6} rounded={rounded} />
    <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} rounded={rounded} />
    {/*<SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} rounded={rounded} />*/}
    <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} rounded={rounded} />
    <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} rounded={rounded} />
  </div>
)
