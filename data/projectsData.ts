export interface ProjectsData {
  title: string
  description: string
  imgSrc: string
  href: string
  repo?: string
  tags: string[]
}

const projectsData: ProjectsData[] = [
  {
    title: 'Go Britain',
    description: `Browse the hottest trends, find your unique style, 
      and enjoy a seamless shopping experience. 
      Elevate your fashion game with us today!`,
    imgSrc: '/static/images/GoBritain.jpg',
    href: 'https://www.go-britain.nl/',
    // repo: 'https://www.google.com',
    tags: ['E-commerce', 'WooCommerce', 'Wordpress'],
  },
  {
    title: 'Mental Toughness Program',
    description: `This app is designed to improve your golf game through enhanced mental strength and performance strategies. 
    Elevate your skills on the course with this transformative tool. I created both the App and the Landing Page for this project. 
    The app is behind a paywall.`,
    imgSrc: '/static/images/MTP.jpg',
    href: 'https://mentaltoughness.golf/',
    // repo: 'https://www.google.com',
    tags: ['React', 'SPA', 'Web App'],
  },
]

export default projectsData
