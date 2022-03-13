import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );


const geometry = new THREE.TorusGeometry(10, 3, 30, 100);
const material = new THREE.MeshStandardMaterial( { color: 0x3F2EA3, wireframe: true} );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);

scene.add(pointLight, ambientLight);

// const lightHelpher = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelpher, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  
  const geometry = new THREE.SphereGeometry(0.15, 64, 32);
  const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ));
  
  star.position.set(x, y, z);
  scene.add(star);

}
Array(250).fill().forEach(addStar);




// Moon

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial( {
    color: 0x6359ba,
    wireframe: true
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moreCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moreCamera;

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01


  moon.rotation.y += 0.005;
  moon.rotation.x += 0.005;
  moon.rotation.z += 0.0081

  // controls.update();

  renderer.render( scene, camera);
}

animate()

