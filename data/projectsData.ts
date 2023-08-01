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
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
    repo: 'https://www.google.com',
    tags: ['Search', 'Engine', 'Google'],
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/fiddles/the-time-machine',
    repo: 'https://www.google.com',
    tags: ['Time', 'Machine', 'Travel'],
  },
]

export default projectsData
