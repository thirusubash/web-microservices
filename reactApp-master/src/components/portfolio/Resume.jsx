import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Resume = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a plane geometry for the button
    const geometry = new THREE.PlaneGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const button = new THREE.Mesh(geometry, material);
    scene.add(button);

    // Animate the button
    function animate() {
      requestAnimationFrame(animate);
      button.rotation.x += 0.01;
      button.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Resume;
