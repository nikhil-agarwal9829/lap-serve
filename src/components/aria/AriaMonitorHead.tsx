import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type AriaState = 'idle' | 'thinking' | 'listening' | 'speaking'

const EYE_RADIUS = 0.062 // ~13% larger than original 0.055
const PUPIL_RADIUS = 0.022

interface AriaMonitorHeadProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  state?: AriaState
}

export function AriaMonitorHead({ mouse, state = 'idle' }: AriaMonitorHeadProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const leftEyeShadowRef = useRef<THREE.Mesh>(null)
  const rightEyeShadowRef = useRef<THREE.Mesh>(null)
  const leftPupilRef = useRef<THREE.Mesh>(null)
  const rightPupilRef = useRef<THREE.Mesh>(null)
  const blinkRef = useRef(1)
  const nextBlink = useRef(Math.random() * 3 + 2)
  const timeRef = useRef(0)
  const eyePos = useRef({ lx: -0.12, ly: 0.08, rx: 0.12, ry: 0.08 })

  const materials = useMemo(
    () => ({
      frame: new THREE.MeshStandardMaterial({
        color: '#0f172a',
        metalness: 0.75,
        roughness: 0.28,
      }),
      frameRim: new THREE.MeshStandardMaterial({
        color: '#111827',
        metalness: 0.9,
        roughness: 0.15,
        emissive: '#ffffff',
        emissiveIntensity: 0.12,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: '#111827',
        metalness: 0.85,
        roughness: 0.22,
      }),
      screen: new THREE.MeshStandardMaterial({
        color: '#0e1628',
        metalness: 0.45,
        roughness: 0.35,
        emissive: '#141f35',
        emissiveIntensity: 0.2,
      }),
      screenGlare: new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
      }),
      glowBack: new THREE.MeshBasicMaterial({
        color: '#4fd1ff',
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
      }),
      eye: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#59d8ff',
        emissiveIntensity: 0.25,
      }),
      eyeShadow: new THREE.MeshBasicMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
      stand: new THREE.MeshStandardMaterial({
        color: '#141f35',
        metalness: 0.7,
        roughness: 0.3,
      }),
      pupil: new THREE.MeshStandardMaterial({ color: '#060b14' }),
    }),
    []
  )

  useEffect(() => {
    materials.eye.emissiveIntensity =
      state === 'speaking' ? 0.8 : state === 'thinking' ? 0.5 : state === 'listening' ? 0.6 : 0.25
  }, [state, materials.eye])

  useFrame((_, delta) => {
    timeRef.current += delta
    const t = timeRef.current

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.current.x * 0.32,
        0.06
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.18,
        0.06
      )
    }

    nextBlink.current -= delta
    if (nextBlink.current <= 0) {
      blinkRef.current = 0.05
      nextBlink.current = Math.random() * 4 + 2
    }
    blinkRef.current = THREE.MathUtils.lerp(blinkRef.current, 1, delta * 12)

    const eyeOffsetX = mouse.current.x * 0.032
    const eyeOffsetY = -mouse.current.y * 0.026
    const thinkWobble = state === 'thinking' ? Math.sin(t * 8) * 0.006 : 0

    eyePos.current.lx = THREE.MathUtils.lerp(
      eyePos.current.lx,
      -0.12 + eyeOffsetX + thinkWobble,
      0.08
    )
    eyePos.current.ly = THREE.MathUtils.lerp(eyePos.current.ly, 0.08 + eyeOffsetY, 0.08)
    eyePos.current.rx = THREE.MathUtils.lerp(
      eyePos.current.rx,
      0.12 + eyeOffsetX + thinkWobble,
      0.08
    )
    eyePos.current.ry = THREE.MathUtils.lerp(eyePos.current.ry, 0.08 + eyeOffsetY, 0.08)

    const applyEye = (
      eye: THREE.Mesh | null,
      shadow: THREE.Mesh | null,
      x: number,
      y: number
    ) => {
      if (eye) {
        eye.position.x = x
        eye.position.y = y
        eye.scale.y = blinkRef.current
      }
      if (shadow) {
        shadow.position.x = x
        shadow.position.y = y
        shadow.scale.y = blinkRef.current
      }
    }

    applyEye(leftEyeRef.current, leftEyeShadowRef.current, eyePos.current.lx, eyePos.current.ly)
    applyEye(rightEyeRef.current, rightEyeShadowRef.current, eyePos.current.rx, eyePos.current.ry)

    const pupilX = eyeOffsetX * 0.45
    const pupilY = eyeOffsetY * 0.45
    if (leftPupilRef.current) {
      leftPupilRef.current.position.x = eyePos.current.lx + pupilX
      leftPupilRef.current.position.y = eyePos.current.ly + pupilY
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.position.x = eyePos.current.rx + pupilX
      rightPupilRef.current.position.y = eyePos.current.ry + pupilY
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.05, -0.08]} material={materials.glowBack}>
        <boxGeometry args={[1.05, 0.85, 0.08]} />
      </mesh>

      <mesh position={[0, -0.55, 0]} material={materials.stand}>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 32]} />
      </mesh>
      <mesh position={[0, -0.7, 0]} material={materials.stand}>
        <boxGeometry args={[0.35, 0.04, 0.2]} />
      </mesh>

      <mesh position={[0, 0.05, 0]} material={materials.frame}>
        <boxGeometry args={[0.92, 0.72, 0.15]} />
      </mesh>

      <mesh position={[0, 0.05, 0.078]} material={materials.frameRim}>
        <boxGeometry args={[0.94, 0.74, 0.018]} />
      </mesh>

      <mesh position={[0, 0.05, 0.085]} material={materials.bezel}>
        <boxGeometry args={[0.84, 0.64, 0.02]} />
      </mesh>

      <mesh position={[0, 0.05, 0.092]} material={materials.screen}>
        <boxGeometry args={[0.74, 0.54, 0.01]} />
      </mesh>

      <mesh position={[-0.18, 0.22, 0.098]} material={materials.screenGlare}>
        <planeGeometry args={[0.28, 0.18]} />
      </mesh>

      <group position={[0, 0.05, 0.1]}>
        <mesh ref={leftEyeShadowRef} position={[-0.12, 0.08, 0.015]} material={materials.eyeShadow}>
          <sphereGeometry args={[EYE_RADIUS * 1.14, 16, 16]} />
        </mesh>
        <mesh ref={leftEyeRef} position={[-0.12, 0.08, 0.02]} material={materials.eye}>
          <sphereGeometry args={[EYE_RADIUS, 16, 16]} />
        </mesh>
        <mesh ref={leftPupilRef} position={[-0.12, 0.08, 0.065]} material={materials.pupil}>
          <sphereGeometry args={[PUPIL_RADIUS, 12, 12]} />
        </mesh>

        <mesh ref={rightEyeShadowRef} position={[0.12, 0.08, 0.015]} material={materials.eyeShadow}>
          <sphereGeometry args={[EYE_RADIUS * 1.14, 16, 16]} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.12, 0.08, 0.02]} material={materials.eye}>
          <sphereGeometry args={[EYE_RADIUS, 16, 16]} />
        </mesh>
        <mesh ref={rightPupilRef} position={[0.12, 0.08, 0.065]} material={materials.pupil}>
          <sphereGeometry args={[PUPIL_RADIUS, 12, 12]} />
        </mesh>
      </group>

      <mesh position={[0, 0.42, 0]} material={materials.stand}>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={materials.eye}>
        <sphereGeometry args={[0.025, 12, 12]} />
      </mesh>
    </group>
  )
}
