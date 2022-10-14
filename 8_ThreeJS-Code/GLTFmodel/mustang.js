window.onload = function init() {
  const canvas = document.getElementById('gl-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // renderer 설정
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.width, canvas.height);

  // scene 설정 + 이번엔 배경도 설정
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // 카메라 설정
  camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 150;
  camera.position.y = 150;
  camera.position.z = 150;

  // 360도 볼 수 있게 해주는 API
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // 광원이 5개
  hlight = new THREE.AmbientLight(0x404040, 50);
  scene.add(hlight);
  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 3000, 5000);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(5000, 1000, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 1000, -5000);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-5000, 3000, 5000);
  scene.add(light4);

  // GLTF를 로드하는 과정
  const loader = new THREE.GLTFLoader();
  loader.load(
    './model/scene.gltf',
    function (gltf) {
      //첫번째 콜백 함수는 로드가 되었을 때 실행해주는 함수
      car = gltf.scene.children[0];
      car.scale.set(0.5, 0.5, 0.5); // 자동차가 너무 커서 xyz를 1/2로 줄이고
      scene.add(gltf.scene); // scene에 넣어주고
      animate(); // 계속 렌더링 해준다.
    },
    undefined, // 두번째 콜백 함수는 로딩이 진행중일 때
    function (error) {
      // 세번째 콜백 함수는 로딩하는 과정에서 에러가 발생했을 때 호출되는 함수.
      console.error(error);
    }
  );

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
};
