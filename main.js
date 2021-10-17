import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1900).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("./img/space.png");
scene.background = spaceTexture;

//SUN
const sunTexture = new THREE.TextureLoader().load("./img/planet.jpg");
const sunNormal = new THREE.TextureLoader().load("./img/normal.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20),
  new THREE.MeshLambertMaterial({
    map: sunTexture,
    normalMap: sunNormal,
  })
);
scene.add(sun);

const planets = [
  {
    id: 1,
    name: "mercury",
    x: 40,
    r: 1.05,
    texture: "./img/mercury.jpeg",
    speed: 0.00474,
  },
  {
    id: 2,
    name: "venus",
    x: 60,
    r: 1.14,
    texture: "./img/venus.png",
    speed: 0.0035,
  },
  {
    id: 3,
    name: "earth",
    x: 80,
    r: 1.15,
    texture: "./img/earth.jpeg",
    speed: 0.002978,
  },
  {
    id: 4,
    name: "mars",
    x: 100,
    r: 1.07,
    texture: "./img/mars.jpeg",
    speed: 0.0024,
  },
  {
    id: 5,
    name: "jupiter",
    x: 160,
    r: 4.6,
    texture: "./img/jupiter.jpeg",
    speed: 0.0013,
  },
  {
    id: 6,
    name: "saturn",
    x: 200,
    r: 3.33,
    texture: "./img/saturn.png",
    speed: 0.000968,
  },
  {
    id: 7,
    name: "uranus",
    x: 220,
    r: 2.58,
    texture: "./img/uranus.jpeg",
    speed: 0.00068,
  },
  {
    id: 8,
    name: "neptune",
    x: 240,
    r: 2.56,
    texture: "./img/neptune.jpeg",
    speed: 0.000543,
  },
  {
    id: 9,
    name: "pluto",
    x: 260,
    r: 1,
    texture: "./img/pluto.jpeg",
    speed: 0.00047,
  },
];

const allPlanets = [];

function addPlanets() {
  for (let p = 0; p < planets.length; p++) {
    const planetTexture = new THREE.TextureLoader().load(planets[p].texture);
    const mercuryNormal = new THREE.TextureLoader().load("./img/normal.jpg");
    let planet = new THREE.Mesh(
      new THREE.SphereGeometry(planets[p].r),
      new THREE.MeshStandardMaterial({
        map: planetTexture,
        normalMap: mercuryNormal,
      })
    );
    planet.position.x = planets[p].x;
    planet.position.y = 0;
    planet.position.z = 0;
    planet.orbitRadius = planets[p].x;
    planet.orbit = Math.random() * Math.PI * 2;
    planet.speed = planets[p].speed;
    allPlanets.push(planet);
    scene.add(planet);

    const geometry = new THREE.TorusGeometry(planets[p].x, 0.03, 16, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 0xf2f2f2f2,
    });
    const orbit = new THREE.Mesh(geometry, material);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
  }
}
addPlanets();

const glow = new THREE.HemisphereLight(0xffffff, 0xffff3e, 0.6);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(glow, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.0005;

  for (let i = 0; i < allPlanets.length; i++) {
    const element = allPlanets[i];

    element.rotation.y += 0.008;

    element.orbit += element.speed;
    element.position.set(
      Math.cos(element.orbit) * element.orbitRadius,
      0,
      Math.sin(element.orbit) * element.orbitRadius
    );
  }
  controls.update();
  renderer.render(scene, camera);
}

animate();

/*function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;*/
