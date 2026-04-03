import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EsculturaParticulas() {
  const wrapRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const escWrap = wrapRef.current;
    const escSlider = sliderRef.current;
    if (!escWrap || !escSlider) return;

    const W = escWrap.offsetWidth || 800;
    const H = escWrap.offsetHeight || 480;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.002);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 250;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return;
    }
    if (!renderer || !renderer.domElement) return;
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x05070a, 1);
    escWrap.appendChild(renderer.domElement);

    let particleSystem = null;
    let particleCount = 0;
    let positionsRock, positionsBust, currentPositions;
    let targetMorphValue = 0;
    let currentMorphValue = 0;
    let animId;

    function createParticlesFromImage(img) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxSize = 250;
      let w = img.width, h = img.height;
      const scale = Math.min(maxSize / w, maxSize / h);
      w = Math.floor(w * scale);
      h = Math.floor(h * scale);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const validPixels = [];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2], a = imgData.data[i + 3];
          if (a > 0 && (r > 15 || g > 15 || b > 15)) {
            const pX = x - w / 2, pY = -(y - h / 2);
            const brightness = (r + g + b) / 3;
            const pZ = (brightness / 255) * 20 + (Math.random() - 0.5) * 5;
            validPixels.push({ x: pX, y: pY, z: pZ, r: r / 255, g: g / 255, b: b / 255 });
          }
        }
      }

      particleCount = validPixels.length;
      positionsRock = new Float32Array(particleCount * 3);
      positionsBust = new Float32Array(particleCount * 3);
      currentPositions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsBust[i3] = validPixels[i].x;
        positionsBust[i3 + 1] = validPixels[i].y;
        positionsBust[i3 + 2] = validPixels[i].z;
        colors[i3] = validPixels[i].r;
        colors[i3 + 1] = validPixels[i].g;
        colors[i3 + 2] = validPixels[i].b;
        const radius = Math.cbrt(Math.random()) * 80;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positionsRock[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positionsRock[i3 + 1] = radius * Math.cos(phi) - 20;
        positionsRock[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        currentPositions[i3] = positionsRock[i3];
        currentPositions[i3 + 1] = positionsRock[i3 + 1];
        currentPositions[i3 + 2] = positionsRock[i3 + 2];
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
      particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      if (particleSystem) {
        currentMorphValue += (targetMorphValue - currentMorphValue) * 0.05;
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount * 3; i++) {
          positions[i] = positionsRock[i] * (1 - currentMorphValue) + positionsBust[i] * currentMorphValue;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y = Math.sin(Date.now() * 0.0005) * 0.5;
        particleSystem.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
        camera.position.z = 250 - currentMorphValue * 50;
      }
      renderer.render(scene, camera);
    }
    animate();

    const onSlider = e => { targetMorphValue = parseFloat(e.target.value); };
    escSlider.addEventListener('input', onSlider);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => createParticlesFromImage(img);
    img.src = 'https://i.imgur.com/4ckqgma.png';

    const ro = new ResizeObserver(() => {
      const nw = escWrap.offsetWidth, nh = escWrap.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      if (renderer) renderer.setSize(nw, nh);
    });
    ro.observe(escWrap);

    return () => {
      cancelAnimationFrame(animId);
      escSlider.removeEventListener('input', onSlider);
      ro.disconnect();
      if (renderer) {
        renderer.dispose();
        if (escWrap.contains(renderer.domElement)) escWrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="escultura-section">
      <div id="escultura-canvas-wrap" ref={wrapRef}></div>
      <div id="escultura-ui">
        <div className="esc-label">Iniciativa Maçônica</div>
        <h2>A Arte de Esculpir a Alma</h2>
        <div className="esc-sub">O Trabalho do Maçom</div>
        <div id="escultura-slider-wrap">
          <label htmlFor="escultura-slider">Utilize o Cinzel</label>
          <div id="escultura-slider-labels">
            <span>Pedra Bruta</span>
            <span>A Revelação</span>
          </div>
          <input type="range" id="escultura-slider" ref={sliderRef} min="0" max="1" step="0.001" defaultValue="0" />
        </div>
        <p id="escultura-quote">&ldquo;O Maçom trabalha a sua pedra bruta &mdash; a si mesmo &mdash; com a mesma dedicação que o escultor revela a forma oculta no mármore.&rdquo;</p>
      </div>
    </section>
  );
}
