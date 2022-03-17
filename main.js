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

camera.position.setZ(40);

renderer.render( scene, camera );


const geometry = new THREE.TorusGeometry(10, 1, 20, 50);
const material = new THREE.MeshStandardMaterial( { color: 0x3F2EA3, wireframe: true} );
const torus = new THREE.Mesh( geometry, material );
const torusOne = new THREE.Mesh(
  new THREE.TorusGeometry(12, 0.5, 10, 50),
  new THREE.MeshStandardMaterial( { color: 0x3F2EA3, wireframe: true} )
);
torusOne.position.z = 50
const torusTwo = new THREE.Mesh(
  new THREE.TorusGeometry(3.5, 0.5, 4, 30),
  new THREE.MeshStandardMaterial( 
      { 
        color: 0x3F2EA3, 
        wireframe: true
      } 
    )

);
const torusThree = new THREE.Mesh(
  new THREE.TorusGeometry(3.5, 0.5, 4, 30),
  new THREE.MeshStandardMaterial( 
      { 
        color: 0x3F2EA3, 
        wireframe: true
      } 
    )

);

scene.add( torusTwo, torusThree)

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 20, -10);

scene.add(pointLight, ambientLight);
 
const lightHelpher = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelpher, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  
  const geometry = new THREE.SphereGeometry(0.09, 64, 32);
  const material = new THREE.MeshStandardMaterial( { color: 0x5f4a80});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ));
  
  star.position.set(x, y, z);
  scene.add(star);

}
Array(350).fill().forEach(addStar);

scene.background = new THREE.Color(0xFFFFFF);


// Moon

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    color: 0x85a3d4
  })
);

scene.add(moon);

moon.position.z = 90
torusTwo.position.z = 90
torusThree.position.z = 90

const houseOne = new THREE.Mesh(
  new THREE.BoxGeometry(10, 20, 15),
  new THREE.MeshStandardMaterial({
    color: 0x6359ba
  })
);

const houseTwo = new THREE.Mesh(
  new THREE.BoxGeometry(10, 30, 15),
  new THREE.MeshStandardMaterial({
    color: 0x736bb0
  })
);

const houseThree = new THREE.Mesh(
  new THREE.BoxGeometry(13, 40, 40),
  new THREE.MeshStandardMaterial({
    color: 0x604899
  })
);

const houseOtherOne = new THREE.Mesh(
  new THREE.BoxGeometry(10, 20, 15),
  new THREE.MeshStandardMaterial({
    color: 0x6359ba
  })
);

const houseOtherTwo = new THREE.Mesh(
  new THREE.BoxGeometry(10, 30, 15), 
  new THREE.MeshStandardMaterial({
    color: 0x736bb0
  })
);


scene.add(houseOne, houseTwo, houseThree, houseOtherOne, houseOtherTwo);

houseTwo.position.z = -20;
houseTwo.position.x = 15;
houseTwo.position.y = 15;

houseThree.position.z = -10;
houseThree.position.x = 32;
houseThree.position.y = 20;

houseOne.position.z = 2;
houseOne.position.x = 15;
houseOne.position.y = 10;

houseOtherOne.position.z = -14;
houseOtherOne.position.x = -20;
houseOtherOne.position.y = 10;

houseOtherTwo.position.z = 3;
houseOtherTwo.position.x = -20;
houseOtherTwo.position.y = 15;


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

  torusTwo.rotation.x += 0.01
  torusThree.rotation.y += 0.01

  moon.rotation.y += 0.005;
  moon.rotation.x += 0.005;
  moon.rotation.z += 0.0081

  controls.update();

  renderer.render( scene, camera);
}

animate()

