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
  camera.position.x = 10;
  camera.position.y = 10;
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

  const gltfLoader = new THREE.GLTFLoader();

  //장애물
  //obstacle
  const mainLoader = async () => {
    const [hammer_1, hammer_2, hammer_3, obstacle, crown, entrance] =
      await Promise.all([
        gltfLoader.loadAsync('./model/hammer_1.glb'),
        gltfLoader.loadAsync('./model/hammer_2.glb'),
        gltfLoader.loadAsync('./model/hammer_3.glb'),
        gltfLoader.loadAsync('./model/obstacle.glb'),
        gltfLoader.loadAsync('./model/crown.glb'),
        gltfLoader.loadAsync('./model/entrance.glb'),
      ]);

    scene.add(hammer_1.scene);
    scene.add(hammer_2.scene);
    scene.add(hammer_3.scene);
    scene.add(obstacle.scene);
    scene.add(crown.scene);
    scene.add(entrance.scene);

    hammer_1.scene.position.set(0, 0, 0);
    hammer_1.scene.scale.set(4, 4, 4);

    hammer_2.scene.position.set(10, 1, 10);
    hammer_2.scene.scale.set(0.005, 0.005, 0.005);

    hammer_3.scene.position.set(0, 10, 20);
    hammer_3.scene.scale.set(0.003, 0.003, 0.003);

    obstacle.scene.position.set(-10, 0.75, 0);
    obstacle.scene.scale.set(0.005, 0.005, 0.005);

    crown.scene.position.set(0.5, 2, 0);
    crown.scene.scale.set(1.5, 1.5, 1.5);

    entrance.scene.position.set(40, 2.5, 40);
    entrance.scene.scale.set(0.5, 0.5, 0.5);

    const animate = () => {
      requestAnimationFrame(animate);
      hammer_1.scene.rotation.y += 0.01;
      hammer_2.scene.rotation.y -= 0.05;
      hammer_3.scene.rotation.x += 0.01;
      obstacle.scene.rotation.y += 0.01;

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
