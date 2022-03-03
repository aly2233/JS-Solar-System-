import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const starsTexture = "img/background_stars.jpeg";
const sunTexture = "img/sun.jpeg";
const mercuryTexture = "img/mercury.jpeg";
const venusTexture = "img/venus.jpeg";
const earthTexture = "img/earth.jpeg";
const marsTexture = "img/mars.jpeg";
const jupiterTexture = "img/jupiter.jpeg";
const saturnTexture = "img/saturn.jpeg";
const saturnRingTexture = "img/saturn_ring.jpeg";
const uranusTexture = "img/uranus.jpeg";
const uranusRingTexture = "img/uranus_ring.jpeg";
const neptuneTexture = "img/neptune.jpeg";
const plutoTexture = "img/pluto.jpeg";



const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-260, 400, 425);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


// Create background and set with stars
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const textureLoader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({map: textureLoader.load(sunTexture)});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


//Function to create planets
function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}


//Create each planet
const mercury = createPlanet(3.2, mercuryTexture, 30);
const venus = createPlanet(5.8, venusTexture, 60);
const earth = createPlanet(10, earthTexture, 85);
const mars = createPlanet(4, marsTexture, 114);
const jupiter = createPlanet(12, jupiterTexture, 200);
const saturn = createPlanet(10, saturnTexture, 300, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 400, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 500);
const pluto = createPlanet(2.8, plutoTexture, 600);

//Add light source coming from sun
const pointLight = new THREE.PointLight(0xffffff, 1.5, 300);
scene.add(pointLight);
//Add another light source for further planets, dimmer light
const pointLight2 = new THREE.PointLight(0xffffff, 1.25, 700);
scene.add(pointLight2);

function animate() {
  //Set rotation for self
  sun.rotateY(0.00037037);
  mercury.mesh.rotateY(0.0001704545);
  venus.mesh.rotateY(0.00411522);
  earth.mesh.rotateY(0.01);
  mars.mesh.rotateY(0.0096);
  jupiter.mesh.rotateY(0.024);
  saturn.mesh.rotateY(0.02181818);
  uranus.mesh.rotateY(0.01411764);
  neptune.mesh.rotateY(0.015);
  pluto.mesh.rotateY(0.001868627);

  //Set rotation around sun
  mercury.obj.rotateY(0.0414772);
  venus.obj.rotateY(0.01622222);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.00531295);
  jupiter.obj.rotateY(0.000842);
  saturn.obj.rotateY(0.00033925);
  uranus.obj.rotateY(0.00011894);
  neptune.obj.rotateY(0.00006064);
  pluto.obj.rotateY(0.0000403);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


//Resize by scrolling
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function fitCameraToObject( camera, object, offset ) {

  offset = offset || 20;
  
  const boundingBox = new THREE.Box3();
  
  boundingBox.setFromObject( object );
  
  const center = boundingBox.getCenter( new THREE.Vector3() );
  const size = boundingBox.getSize( new THREE.Vector3() );
  
  const startDistance = center.distanceTo(camera.position);
  // here we must check if the screen is horizontal or vertical, because camera.fov is
  // based on the vertical direction.
  const endDistance = camera.aspect > 1 ?
            ((size.y/2)+offset) / Math.abs(Math.tan(camera.fov/2)) :
            ((size.y/2)+offset) / Math.abs(Math.tan(camera.fov/2)) / camera.aspect ;
  
  
  camera.position.set(
    camera.position.x * endDistance / startDistance,
    camera.position.y * endDistance / startDistance,
    camera.position.z * endDistance / startDistance,
    );
  camera.lookAt(center);
}

const lastVisit = document.querySelector(".last_visit");
const currentVisit = document.querySelector(".current_visit");
const distanceTrav = document.querySelector(".distance_trav");
const timeToTrav = document.querySelector(".travel_time");
const travelMenu = document.querySelector(".travel_menu");
const sunButton = document.querySelector(".sun_button");

let lastEle = "Null";
let lastDist = 0;
let currentEle = "Null"
let currentDist = 0;
let travDist = 0;
let travTime = 0;
const travSpeed = 350400000;

travelMenu.addEventListener("click", function(event) {
  lastVisit.innerHTML = `Last Visit: ${lastEle}`;
  currentVisit.innerHTML = `Current Visit: ${currentEle}`
  travDist = Math.abs(lastDist - currentDist);
  distanceTrav.innerHTML = `Distance Traveled: ${travDist} km`
  lastDist = currentDist;
  lastEle = currentEle;
  travTime = travDist / travSpeed;
  timeToTrav.innerHTML = `Time to Travel: About ${travTime.toFixed(2)} years`;
  if (timeToTrav.style.display = 'none') {
    timeToTrav.style.display = 'block';
  }

})
sunButton.addEventListener("click", function(event) {
  fitCameraToObject(camera, sun)
  currentEle = "Sun"
  currentDist = 0;
});

const mercuryButton = document.querySelector(".mercury_button");
mercuryButton.addEventListener("click", function(event) {
  currentEle = "Mercury"
  currentDist = 57900000;
  fitCameraToObject(camera, mercury)
});

const venusButton = document.querySelector(".venus_button");
venusButton.addEventListener("click", function(event) {
  currentEle = "Venus"
  currentDist = 108200000;
  fitCameraToObject(camera, venus)
});

const earthButton = document.querySelector(".earth_button");
earthButton.addEventListener("click", function(event) {
  currentEle = "Earth"
  currentDist = 149600000;
  fitCameraToObject(camera, earth)
});

const marsButton = document.querySelector(".mars_button");
marsButton.addEventListener("click", function(event) {
  currentEle = "Mars"
  currentDist = 227900000
  fitCameraToObject(camera, mars)
});

const jupiterButton = document.querySelector(".jupiter_button");
jupiterButton.addEventListener("click", function(event) {
  currentEle = "Jupiter"
  currentDist = 778600000
  fitCameraToObject(camera, jupiter)
});

const saturnButton = document.querySelector(".saturn_button");
saturnButton.addEventListener("click", function(event) {
  currentEle = "Saturn"
  currentDist = 1433500000
  fitCameraToObject(camera, saturn)
});

const uranusButton = document.querySelector(".uranus_button");
uranusButton.addEventListener("click", function(event) {
  currentEle = "Uranus"
  currentDist = 2872500000
  fitCameraToObject(camera, uranus)
});

const neptuneButton = document.querySelector(".neptune_button");
neptuneButton.addEventListener("click", function(event) {
  currentEle = "Neptune"
  currentDist = 4495100000
  fitCameraToObject(camera, neptune)
});

const plutoButton = document.querySelector(".pluto_button");
plutoButton.addEventListener("click", function(event) {
  currentEle = "Pluto"
  currentDist = 5900000000
  fitCameraToObject(camera, pluto)
});

const overviewButton = document.querySelector(".overview_button") 
overviewButton.addEventListener("click", function(event) {
  camera.position.set(-260, 400, 425);
  orbit.update();
});

const resetButton = document.querySelector(".reset_button")
resetButton.addEventListener("click", function(event) {
  location.reload();
})