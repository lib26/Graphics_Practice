window.onload = function init() {
  const canvas = document.getElementById('gl-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.width, canvas.height);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 0;
  camera.position.y = 500;
  camera.position.z = 0;

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  hlight = new THREE.AmbientLight(0x080101, 50);
  scene.add(hlight);
  light = new THREE.PointLight(0x4d4b4b, 10);
  light.position.set(0, 3000, 5000);
  scene.add(light);

  light2 = new THREE.PointLight(0x4d4b4b, 10);
  light2.position.set(0, 1000, -5000);
  scene.add(light2);

  light3 = new THREE.PointLight(0x4d4b4b, 10);
  light3.position.set(-5000, 3000, -5000);
  scene.add(light3);

  const loader = new THREE.GLTFLoader();

  //
  const mainLoader = async () => {
    const [objectA, objectB] = await Promise.all([
      loader.loadAsync('./model-h/scene.gltf'),
      loader.loadAsync('./model-c/scene.gltf'),
    ]);

    scene.add(objectA.scene);
    scene.add(objectB.scene);

    objectA.scene.position.set(100, 0, 0);
    objectA.scene.scale.set(50, 50, 50);

    objectB.scene.position.set(0, 0, 0);
    objectB.scene.scale.set(0.5, 0.5, 0.5);

    const animate = () => {
      requestAnimationFrame(animate);
      objectA.scene.rotation.y += 0.01;
      objectB.scene.rotation.y -= 0.01;
      renderer.render(scene, camera);
      controls.update();
    };
    animate();
  };
  mainLoader();

  // //
  // loader.load(
  //   './model-h/scene.gltf',
  //   function (gltf) {
  //     character = gltf.scene.children[0];
  //     character.scale.set(50, 50, 50);
  //     character.position.set(0, 0, 0);
  //     scene.add(gltf.scene);
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );

  // loader.load(
  //   './model-c/scene.gltf',
  //   function (gltf) {
  //     character = gltf.scene.children[0];
  //     character.scale.set(0.5, 0.5, 0.5);
  //     character.position.set(0, 0, 0);
  //     scene.add(gltf.scene);
  //     animate();
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );

  // function animate() {
  //   character.rotation.x += 0.05;
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(animate);
  // }
};
