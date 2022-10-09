window.onload = function init() {
  const canvas = document.getElementById('gl-canvas');

  // renderer 오브젝트 생성
  const renderer = new THREE.WebGLRenderer({ canvas });

  // camera 오브젝트 생성
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2; // 카메라의 위치를 설정

  // Scene 오브젝트 설정
  const scene = new THREE.Scene();

  // Light (광원) 설정
  {
    const color = 0xffffff; // 흰색 광원
    const intensity = 1; // 광원의 강도
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4); // 광원의 위치 설정
    scene.add(light); // Scene에 광원을 추가
  }

  // BoxGeometry -> 큐브 모양의 Geometry를 설정. 1,1,1은 정육면체
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Custome Shader 설정
  function vertexShader() {
    // String으로 반환된다.
    // modelViewMatrix, projectionMatrix은 우리가 선언하지 않았지만 three.js에서 미리 만들어 놓은 GPU의 built-in 변수
    return `
		varying vec3 vUv;
		void main() {
			vUv = position;
			vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0); 
			gl_Position = projectionMatrix * modelViewPosition;
		}
		
	  `;
  }

  function fragmentShader() {
    // String으로 반환된다.
    // RGBA 인듯.
    // mix(colorA, colorB, vUv.z)은 도형의 원래 색A와 B의 색, 각 Z축의 값을 섞어서 색을 표현한다.
    return `
		uniform vec3 colorA;
		uniform vec3 colorB;
		varying vec3 vUv;
		
		void main() {
			gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
		}
	  `;
  }

  // 큐브 instance 생성
  function makeInstance(geometry, color, x) {
    let material;

    if (x == -2) {
      // 빈 object 변수이다.
      let uniforms = {};

      // object에 key와 각각의 색깔 value를 생성해준다.
      uniforms.colorA = { type: 'vec3', value: new THREE.Color(color) };
      uniforms.colorB = { type: 'vec3', value: new THREE.Color(0xacb6e5) };

      // 단순 Phong Material이 아닌 커스텀 쉐이더를 적용하기 위해서 ShaderMaterial 사용
      material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
      });
    } else {
      // Phong은 광원에 영향을 받는 Material. 광원에 영향을 받지 않는(?) MeshBasicMaterial와 대비된다.
      material = new THREE.MeshPhongMaterial({ color });
    }

    // Mesh 생성
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // Scene에 각각의 Mesh를 추가한다.
    cube.position.x = x; // 각 도형의 x 축을 설정해준다.

    return cube;
  }

  // 우리가 만들고자하는 도형은 3가지. 큐브니까 같은 geometry을 사용하지만 각각의 Material은 다르게 만든다. 즉, 색이 다르다.
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  // 최종적으로 canvas에 도형을 그려주는데, 각 큐브마다 forEach 구문을 써서 spinning을 적용시킨다.
  function render(time) {
    time *= 0.001; // convert time to seconds

    // ndx는 어레이의 각각의 인덱스인듯. 0,1,2 ㅇㅇ
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // 지속적으로 reder해준다.
  requestAnimationFrame(render);
};
