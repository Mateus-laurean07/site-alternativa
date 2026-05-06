"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Shape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 32]} />
                <MeshDistortMaterial
                    color="#008825"
                    emissive="#E85D04"
                    emissiveIntensity={0.1}
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.6}
                    roughness={0.2}
                    distort={0.4}
                    speed={1.5}
                />
            </mesh>
        </Float>
    );
}

export default function FluidShape() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-hard-light">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#E85D04" />
                <Environment preset="city" />
                <Shape />
            </Canvas>
        </div>
    );
}
