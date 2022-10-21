import * as THREE from "three";

import gsap from "gsap";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'

import atmosphereVertexShader from "./shader/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shader/atmosphereFragment.glsl";

import starsTexture from "./stars.jpg";

import globeTexture from "./globe.jpg";

import moonTexture from "./moon4k.jpg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 25;


const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    canvas:  document.querySelector("canvas")
  }
);
const canvasContainer = document.querySelector("#canvasContainer");
renderer.setSize(innerWidth, innerHeight-5);
renderer.setPixelRatio(window.devicePixelRatio);

new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.CubeTextureLoader().load(Array(6).fill(starsTexture));

const textureLoader = new THREE.TextureLoader();


const sphereGeometry = new THREE.SphereGeometry(6.371,50,50);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   map: new THREE.TextureLoader().load("./globe.jpg")
// })

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: textureLoader.load(globeTexture)
    }
  },
})
const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);


//create the moon
const moonGeo = new THREE.SphereGeometry(1.737, 30,30);
const moonMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(moonTexture)
})
const moonSphere = new THREE.Mesh(moonGeo, moonMaterial);
sphere.add(moonSphere);
moonSphere.position.x = 28;

//create another sphere as an atmosphere
const atmosMaterial = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide
})
const atmoSphere = new THREE.Mesh(sphereGeometry, atmosMaterial);

atmoSphere.scale.set(1.1,1.1,1.1);
scene.add(atmoSphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);





function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  sphere.rotation.y += 0.005;
}
animate();

