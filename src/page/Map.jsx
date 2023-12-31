import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EarthMap = () => {
  const mount = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, earth;

    const init = () => {
      // 创建场景
      scene = new THREE.Scene();

      // 创建相机
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      // 创建渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 地球贴图
      const texture = new THREE.TextureLoader().load('../../assets/location.png');
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      earth = new THREE.Mesh(geometry, material);

      // 添加到场景中
      scene.add(earth);

      // 添加光源
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(10, 10, 10);
      scene.add(light);

      // 设置渲染器DOM元素
      mount.current.appendChild(renderer.domElement);

      // 渲染动画
      const animate = () => {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.001;
        renderer.render(scene, camera);
      };

      animate();
    };

    init();

    return () => {
      // 清除组件
      mount.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
};

export default EarthMap;
