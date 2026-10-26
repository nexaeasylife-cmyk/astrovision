'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
function CelestialWheel() {
  const wheel = useRef<Group>(null);
  const planets = useRef<Group>(null);
  useFrame((state, delta) => {
    if (wheel.current) { wheel.current.rotation.z += delta * .025; wheel.current.rotation.y = Math.sin(state.clock.elapsedTime * .08) * .18; }
    if (planets.current) planets.current.rotation.z -= delta * .045;
  });
  return <group rotation={[.3, -.2, 0]}>
    <group ref={wheel}>
      {[1.25, 2.05, 2.2, 2.65].map((r, i) => <mesh key={r}><torusGeometry args={[r, i === 2 ? .035 : .013, 8, 128]}/><meshStandardMaterial color="#eac66f" metalness={.75} roughness={.3}/></mesh>)}
      {Array.from({length:60}, (_,i) => <mesh key={i} position={[2.12*Math.cos(i*Math.PI/30),2.12*Math.sin(i*Math.PI/30),0]} rotation={[0,0,i*Math.PI/30]}><boxGeometry args={[i%5===0?.2:.065,.016,.025]}/><meshStandardMaterial color="#d7a74c"/></mesh>)}
      {Array.from({length:12}, (_,i) => <mesh key={i} position={[1.65*Math.cos(i*Math.PI/6),1.65*Math.sin(i*Math.PI/6),0]} rotation={[0,0,i*Math.PI/6]}><boxGeometry args={[.77,.012,.025]}/><meshStandardMaterial color="#d7a74c"/></mesh>)}
      <mesh><sphereGeometry args={[.43,32,32]}/><meshStandardMaterial color="#efbc55" emissive="#ae6010" emissiveIntensity={.45} metalness={.5} roughness={.4}/></mesh>
      {Array.from({length:16}, (_,i) => <mesh key={i} position={[.65*Math.cos(i*Math.PI/8),.65*Math.sin(i*Math.PI/8),0]} rotation={[0,0,i*Math.PI/8-Math.PI/2]}><coneGeometry args={[.045,.25,4]}/><meshStandardMaterial color="#e8b950"/></mesh>)}
    </group>
    <group ref={planets}>{[0,1,2].map((i) => <mesh key={i} position={[2.65*Math.cos(i*2.1),2.65*Math.sin(i*2.1),.1]}><sphereGeometry args={[i===0?.15:.09,20,20]}/><meshStandardMaterial color={['#f2ce7d','#ad7963','#d6ddde'][i]} metalness={.5} roughness={.35}/></mesh>)}</group>
  </group>;
}
export default function Armillary() {
 return <Canvas dpr={[1,1.5]} camera={{position:[0,0,7.8],fov:45}} aria-hidden="true"><ambientLight intensity={1.5}/><directionalLight position={[3,5,5]} intensity={4}/><CelestialWheel/></Canvas>;
}
