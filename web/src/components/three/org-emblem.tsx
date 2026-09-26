import { useEffect, useRef } from "react"
import * as THREE from "three"

export function OrgEmblem({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 5.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    const key = new THREE.DirectionalLight(0xbfe9ff, 1.4)
    key.position.set(3, 4, 5)
    const rim = new THREE.PointLight(0x2dd4c4, 1.1)
    rim.position.set(-3, -2, -3)
    scene.add(ambient, key, rim)

    const group = new THREE.Group()

    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: "#0d1726",
      emissive: "#2dd4c4",
      emissiveIntensity: 0.22,
      metalness: 0.4,
      roughness: 0.25,
      clearcoat: 0.6,
      flatShading: true,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1)
    const wireMat = new THREE.MeshBasicMaterial({ color: "#2dd4c4", wireframe: true, transparent: true, opacity: 0.35 })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    wire.scale.setScalar(1.012)
    group.add(wire)

    const ringGeo = new THREE.TorusGeometry(1.95, 0.014, 12, 96)
    const ringMat = new THREE.MeshBasicMaterial({ color: "#5b8fc9", transparent: true, opacity: 0.55 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.3
    group.add(ring)

    const ring2 = new THREE.Mesh(ringGeo.clone(), ringMat.clone())
    ring2.scale.setScalar(1.18)
    ring2.rotation.x = Math.PI / 1.7
    ring2.rotation.y = 0.6
    ;(ring2.material as THREE.MeshBasicMaterial).opacity = 0.28
    group.add(ring2)

    scene.add(group)

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
        group.rotation.y += 0.006
        group.rotation.x = Math.sin(Date.now() * 0.0004) * 0.15
        ring.rotation.z += 0.003
        ring2.rotation.z -= 0.002
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      renderer.dispose()
      ;[coreGeo, wireGeo, ringGeo].forEach((g) => g.dispose())
      ;[coreMat, wireMat, ringMat].forEach((m) => m.dispose())
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
