---
title: Page Transitions for Next.js
date: '2023-08-03'
tags: ['animation', 'framer', 'transitions']
draft: false
summary: Creating Smooth Page Transitions for Next.js using Framer Motion for this Site
images: []
layout: PostLayout
canonicalUrl:
repoUrl:
---

The page transitions on this site are created with Framer Motion. Page transitions add a touch of elegance and interactivity to the user experience, making the navigation between pages feel seamless and engaging. In this fiddle, I’ll briefly explain how the transitions are created in this project.

## Introduction

Next.js is a popular React framework for building server-rendered applications, and Framer Motion is a powerful animation library that simplifies creating fluid and dynamic animations. By combining these two technologies, we can achieve smooth page transitions that enhance the overall user experience.

## Basic Setup

To use Framer Motion in our Next.js project, we first need to wrap Component in \_app.tsx with the `AnimatePresence` component from Framer Motion. This component is used to animate the entrance and exit of components when they're mounted and unmounted, respectively.

```jsx
<AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
  <Component {...pageProps} key={router.asPath} />
</AnimatePresence>
```

- We pass a `scrollTo(0,0)` to onExitComplete, to ensure that the page is scrolled to the top when a page is exited.
- We set initial to `false` to prevent an animation from playing when the app is first loaded.

## Setting up the PageTransition Component

To begin, we'll create a custom `PageTransition` component that handles the animation logic for our page transitions. This component will use Framer Motion to animate the entrance and exit of pages.

```jsx
import { motion } from 'framer-motion'

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ y: -300, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -300, opacity: 0 }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)
```

## How it Works

The `PageTransition` component uses Framer Motion's `motion.div` to wrap the content of each page. The `initial`, `animate`, and `exit` props define the animation behavior when the component is initially loaded, when it's in the viewport, and when it's about to be unmounted (exited), respectively.

The `x` property is used to animate the position of the page along the X-axis. `onTheRight` sets the initial position of the page to be outside the viewport on the right side, `inTheCenter` animates the page to be in the center of the viewport, and `onTheLeft` animates the page to move out of the viewport on the left side.

The `transition` prop specifies the duration and easing function of the animation.

## Using the PageTransition Component

To enable page transitions for our Next.js site, we need to wrap the content of each page with the `PageTransition` component. For example, in a Next.js page component:

```jsx
import { PageTransition } from '@/components/wrappers/PageTransition'

const MyPage = () => {
  return (
    <PageTransition>
      <div>{/* Your page content here */}</div>
    </PageTransition>
  )
}

export default MyPage
```

## Conclusion

By implementing the `PageTransition` component using Framer Motion in our Next.js project, we have successfully added smooth and visually appealing page transitions to our site. Users will now experience a more seamless and engaging navigation between pages, enhancing their overall browsing experience.

Framer Motion offers numerous animation capabilities, allowing you to customize and tailor the page transitions to suit your specific design needs. So, if you're looking to elevate your Next.js site with captivating animations, Framer Motion is a fantastic tool to explore.

Happy animating!
