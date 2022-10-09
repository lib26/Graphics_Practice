window.onload = function init() {
  const canvas = document.getElementById('gl-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });

  // Scene 생성
  var scene = new THREE.Scene();

  // 카메라 생성
  var camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    0.01,
    1000
  );
  camera.position.z = 1.5;

  // 광원 2개 추가하기
  scene.add(new THREE.AmbientLight(0x333333)); // 기본이 되는 광원. 물체가 어디에 있던 똑같은 빛을 받는다. 그래서 광원의 위치도 정해줄 필요 없음.

  var light = new THREE.DirectionalLight(0xffffff, 1); // 태양같은 광원. 즉, 태양은 멀리 있어서 지구로 들어오는 광선들은 1자 모양으로 동일함
  light.position.set(5, 3, 5);
  scene.add(light);

  // Earth params
  var radius = 0.5,
    segments = 32, // 이거 놓을수록 구의 모양이 정교해짐. 대신 느려짐
    rotation = 6;

  // 지구
  var sphere = createSphere(radius, segments);
  sphere.rotation.y = rotation;
  scene.add(sphere);

  // 구름
  var clouds = createClouds(radius, segments);
  clouds.rotation.y = rotation;
  scene.add(clouds);

  // 별
  var stars = createStars(90, 64);
  scene.add(stars);

  // js파일에 있는 TrackballControls API를 통해서 구를 욺직이게 함
  var controls = new THREE.TrackballControls(camera);

  render();

  function render() {
    controls.update();
    sphere.rotation.y += 0.0005;
    clouds.rotation.y += 0.0005;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function createSphere(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'), // 구에다가 세계지도 이미지를 mapping
        bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'), // 빛이 반사되어 산란되는 과정을 이러한 방식으로 적용시켜서 산의 높이를 더 디테일하게 표현해줌
        bumpScale: 0.005, // 높을수록 더 거칠게 = 높이 표현을 잘해줌.
        specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'), // 특정 부분을 훨신 더 반사 잘되게 정보를 주는 것. 바다는 빛을 더 잘 반사하니까
        specular: new THREE.Color('grey'), // 반사되는 색을 정해준다
      })
    );
  }

  // 구를 하나 더 만들고 구의 버텍스 정보는 안보이게 한다. 그러면 구름의 texture 정보만 보이니까 지구위에 구름이 얹혀진 그림이 보인다.
  function createClouds(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.003, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
        transparent: true, // Mesh 자체를 투명하게 만드는거지.
      })
    );
  }

  // 또 다시 구를 그리는데 texture를 구의 안쪽 표면에 mapping 시키는 것.
  function createStars(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({
        // basic Material 사용해서 빛의 효과를 받지 않게끔
        map: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
        side: THREE.BackSide,
      })
    );
  }
};
