import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const SEGMENTS = 40
const RADIUS = 1.5
const HEIGHT = 7.6
const TURNS = 2.6

const COLOR_A = new THREE.Color("#2dd4c4")
const COLOR_B = new THREE.Color("#5b8fc9")
const COLOR_VARIANT = new THREE.Color("#f2b84b")
const COLOR_RUNG = new THREE.Color("#1c3247")

function buildHelixGroup(): THREE.Group {
  const group = new THREE.Group()
  const sphereGeo = new THREE.SphereGeometry(0.15, 20, 20)
  const variantGeo = new THREE.SphereGeometry(0.22, 20, 20)

  for (let i = 0; i < SEGMENTS; i++) {
    const t = i / (SEGMENTS - 1)
    const angle = t * Math.PI * 2 * TURNS
    const y = HEIGHT * (t - 0.5)
    const a = new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS)
    const b = new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS)
    const isVariant = i % 7 === 2

    const matA = new THREE.MeshStandardMaterial({
      color: isVariant ? COLOR_VARIANT : COLOR_A,
      emissive: isVariant ? COLOR_VARIANT : COLOR_A,
      emissiveIntensity: isVariant ? 2.2 : 0.8,
      roughness: 0.35,
      metalness: 0.2,
    })
    const nodeA = new THREE.Mesh(isVariant ? variantGeo : sphereGeo, matA)
    nodeA.position.copy(a)
    group.add(nodeA)

    const matB = new THREE.MeshStandardMaterial({
      color: COLOR_B,
      emissive: COLOR_B,
      emissiveIntensity: 0.8,
      roughness: 0.35,
      metalness: 0.2,
    })
    const nodeB = new THREE.Mesh(sphereGeo, matB)
    nodeB.position.copy(b)
    group.add(nodeB)

    if (i % 2 === 0) {
      const dir = new THREE.Vector3().subVectors(b, a)
      const len = dir.length()
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
      const rungGeo = new THREE.CylinderGeometry(0.03, 0.03, len, 6)
      const rungMat = new THREE.MeshStandardMaterial({ color: COLOR_RUNG, roughness: 0.6, metalness: 0.1 })
      const rung = new THREE.Mesh(rungGeo, rungMat)
      rung.position.copy(mid)
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
      group.add(rung)
    }
  }

  return group
}

export function DnaHelix({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.2, 10.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    const directional = new THREE.DirectionalLight(0xbfe9ff, 1.1)
    directional.position.set(4, 6, 5)
    const point = new THREE.PointLight(0x2dd4c4, 0.6)
    point.position.set(-4, -2, -3)
    scene.add(ambient, directional, point)

    const helix = buildHelixGroup()
    scene.add(helix)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.autoRotate = !reduceMotion
    controls.autoRotateSpeed = 1.1
    controls.minPolarAngle = Math.PI / 2 - 0.5
    controls.maxPolarAngle = Math.PI / 2 + 0.5

    function resize() {
      const { clientWidth, clientHeight } = container!
      if (clientWidth === 0 || clientHeight === 0) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let frameId = 0
    function animate() {
      frameId = requestAnimationFrame(animate)
      if (!reduceMotion) {
        helix.rotation.y += 0.0016
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      controls.dispose()
      renderer.dispose()
      helix.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
