"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

type Props = {
  color?: number;
  opacity?: number;
  containerOpacity?: number;
};

export function ClinicBackground({
  color = 0x003868,
  opacity = 0.18,
  containerOpacity = 0.6,
}: Props = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.2, 9);
    camera.lookAt(0, -1.2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const SEG_X = 72;
    const SEG_Y = 40;
    const W = 42;
    const H = 22;

    const geo = new THREE.PlaneGeometry(W, H, SEG_X, SEG_Y);

    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2.4;
    mesh.position.y = -3;
    mesh.position.z = -2;
    scene.add(mesh);

    const pos = geo.attributes.position;
    const origX = new Float32Array(pos.count);
    const origY = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      origX[i] = pos.getX(i);
      origY[i] = pos.getY(i);
    }

    gsap.to(mat, { opacity, duration: 2.6, ease: "power2.out" });

    const amp = { a: 0.35 };
    if (!prefersReduced) {
      gsap.to(amp, {
        a: 0.6,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let rafId = 0;

    const render = () => {
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        for (let i = 0; i < pos.count; i++) {
          const x = origX[i];
          const y = origY[i];
          const z =
            Math.sin(x * 0.32 + t * 0.65) * amp.a +
            Math.cos(y * 0.38 + t * 0.5) * amp.a * 0.72 +
            Math.sin((x + y) * 0.18 + t * 0.32) * amp.a * 0.5;
          pos.setZ(i, z);
        }
        pos.needsUpdate = true;
      }

      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      camera.position.x = mouse.x * 0.5;
      camera.position.y = 2.2 + -mouse.y * 0.15 + Math.sin(t * 0.07) * 0.12;
      camera.position.z = 9 + Math.cos(t * 0.06) * 0.25;
      camera.lookAt(0, -1.2, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(mat);
      gsap.killTweensOf(amp);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="mc-clinic-bg"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: containerOpacity,
        maskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 95%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 95%)",
      }}
    />
  );
}
