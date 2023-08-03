---
title: Playing Around with Three.js
date: '2023-08-03'
tags: ['three.js', 'vite', '3d']
draft: false
summary: Creating a Quick Vite Project to Explore Three.js
images: []
layout: PostLayout
canonicalUrl:
repoUrl: https://github.com/SteveJonk/threejs-earth
---

I set up a quick Vite project to explore the amazing capabilities of Three.js. Three.js is a popular JavaScript library that allows you to create 3D visualizations and interactive experiences directly in the browser.

## Getting Started

To start my exploration, I first set up a new Vite project, a fast and modern build tool for JavaScript applications. I quickly installed the necessary dependencies and created an entry point file to experiment with Three.js.

## Basic Scene Setup

In my Three.js experiment, I utilized a canvas element with the class "webgl" to render the 3D scene. I loaded two texture images - a [NormalMap](https://en.wikipedia.org/wiki/Normal_mapping) and an [AlphaMap](https://www.velocenetwork.com/tech/what-is-alpha-mapping/) - using the `TextureLoader` from Three.js. These textures are then applied to the 3D object to enhance its appearance.

I decided to create a simple 3D sphere using `SphereBufferGeometry` and applied a `MeshStandardMaterial` with some customization for metalness, roughness, and color properties. I also set the material to be transparent to achieve a visually appealing effect.

The code looks like this:

```jsx
const textureLoader = new THREE.TextureLoader()
const textureLoader2 = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/public/NormalMap.png')
const alphaMap = textureLoader2.load('/public/AlphaMap.jpg')

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const geometry = new THREE.SphereBufferGeometry(1, 64, 64)

const material = new THREE.MeshStandardMaterial({
  alphaMap: alphaMap,
  normalMap: normalTexture,
  transparent: true,
})
material.metalness = 0.8
material.roughness = 0.35
material.color = new THREE.Color(0xffffff)

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
```

## Adding Lights and Camera

To light up the scene, I added an `AmbientLight` and a `PointLight`. The `AmbientLight` provides soft overall lighting, while the `PointLight` gives a red hue and intensity that dynamically changes with the user's mouse movement.

The code for this looks like:

```jsx
const pointLight = new THREE.AmbientLight(0x404040, 1)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 0.3)
pointLight2.position.set(4, 4, 4)
pointLight2.intensity = 1
scene.add(pointLight2)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)
```

## Rendering

The following code snippet shows how to set te window size and render the created setup:

```jsx
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

## Interaction with Mouse and Scroll

For a more engaging experience, I implemented event listeners for mouse movements and scrolling. As the user moves their mouse over the canvas, the `PointLight` changes its color and intensity based on the mouse position. This creates an interactive and vibrant lighting effect.

Additionally, I utilized the scroll event to animate the 3D sphere's position on the Y and Z axes. As the user scrolls on the page, the sphere subtly moves in response, adding a touch of dynamism to the scene.

## Animation Loop

To keep the scene continuously updating and rendering, I implemented an animation loop using `requestAnimationFrame`. This ensures a smooth and fluid experience, with the sphere gently rotating around its Y and X axes.

## Conclusion

My journey of fiddling around with Three.js in this quick Vite project was both fun and enlightening. The ease of setting up the project and the flexibility of Three.js allowed me to experiment with various visual elements and create an interactive 3D scene with minimal effort.

If you're interested in diving into the world of 3D web development and interactive graphics, I highly recommend giving Three.js a try. The possibilities are endless, and you'll surely be amazed at what you can create!
