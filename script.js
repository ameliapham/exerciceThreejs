import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'pink'})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube2.position.set(2,0,0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'orange'})
)
cube3.position.set(-2,0,0)
group.add(cube3)


// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
// const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 1000 )
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Animation
const clock = new THREE.Clock()

const animation = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()
    
    // Update Object
    cube3.position.y = Math.sin(elapsedTime) * 2
    gsap.to(cube3.position, {duration : Math.cos(elapsedTime), delay: Math.cos(elapsedTime), x: 2})

    cube2.position.x = Math.cos(elapsedTime) * 2
    cube2.position.y = Math.sin(elapsedTime) * 2

    cube1.rotation.y = elapsedTime

    // Camera position
    camera.lookAt(cube1.position)

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}
animation()