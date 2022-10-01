var gl;
var points;

// 전체 페이지가 완전히 로드 했을 때 불리는 콜백 함수
window.onload = function init() {
  var canvas = document.getElementById('gl-canvas');

  // GL한테 canvas HTML 태그에다가 그려줄거다! 라고 알려주면서
  // 이걸로 webGL과 연결을해서 gl을 받아오고
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
  // var vertices = [ vec2(-1,-1), vec2(0,1), vec2(1,-1)];
  //  Configure WebGL
  var vertices = new Float32Array([
    -1, -1, -0.5, 1, 0, -1, 0, -1, 0.5, 1, 1, -1,
  ]);

  gl.viewport(0, 0, canvas.width, canvas.height); // canvas의 얼마만큼을 쓸거냐? 0,0은 시작점
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 뒷배경 무슨색으로 할래? RGBA 순서이다. A는 웬만하면 1. 뒷배경 검게 하고 그 위에다가 얹는다.

  // Load shaders and initialize attribute buffers
  // 우리가 webGL로 무언가를 그리기 위해서는 반드시 shader를 정의해줘야한다.
  // 쉐이더들을 load, compile, linking해준다. 즉, 실제 프로그램을 만들어준다 = 파이프 라인을 만들어준다...? 그런느낌으로 일단 이해하자.
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader'); // 그리고자하는 gl과 shader를 연결해준다. 태그 참조한거랑 같은거임.
  gl.useProgram(program); //gl로 뭘 그릴거면 우리가 정의한 버텍스 쉐이더와 프레그먼트 쉐이더를 사용하거라

  // 여기까지 canvas로 어디다 그릴지, shader로 어떻게 그릴지, vertex의 좌표 정보를 처리해준거임.

  // Load the data into the GPU
  // 이제는 실제 버텍스 data를 gpu로 넘기고 그리라고 명령을 하면되는거임.
  var bufferId = gl.createBuffer(); // gpu에 버텍스 정보가 들어갈 저장공간 VBO = vertex buffer object가 만들어지는거지. 그리고 cpu에 있는 즉, 위에서 만들어준 버텍스 정보를 넣어주면 된다.
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // 버퍼를 고정시키는 개념. 이제부터는 말 안해도 다음에 나올 명령들을 이 ID 버퍼를 사용할 거에요! 라는 뜻
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 드디어 그리고자하는 버텍스 좌표 data를 gpu에 복사한다. 스테틱 드로우는 data가 읽기전용이다.

  // Associate vertex data buffer with shader variables.
  // 위에서 만들어준 버퍼인 VBO와 shader를 연관시키는 거지. 왜? vertex shader가 버퍼에 담긴 로컬 정보를 써야하니까
  // 밑에 3줄중 1줄이라도 안해주면 vposition을 다룰 수 없다.
  // vertex shader의 역할은 로컬을 카메라로 바꾸는 거였지? vposition에는 로컬스페이스 정보가 담기는거야. 그래서 버퍼에 들어간 로컬 정보를 쉐어더를 통해서 카메라 스페이스로 바꿔줘야해
  var vPosition = gl.getAttribLocation(program, 'vPosition'); //js에서 shader에 있던 vPosition변수를 참조할 수 있는 아이디를 할당해준다.
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); //vPosition변수는 VBO 버퍼에 있는 버텍스 정보 2개 값씩 한번에 읽어낼 것이며 ...x,y라서 인듯, 각각의 컴포넌트는 float다. 위에서 버퍼 binding 해줘서 계속해서 2개씩 빼올거임.
  gl.enableVertexAttribArray(vPosition); // VBO 버퍼에 있는 정보를 vPosition 변수에 담아서 실제로 shader에서 실제로 사용할거야.

  render(); //여태 점까지 줬고, 이제 여기서 그리라는 명령을 하는 것.
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT); //도화지에 뭐가 그려져있으면 지워라
  gl.drawArrays(gl.TRIANGLES, 0, 6); // 이게 중요함. 너 뭐 그릴거야? 삼각형. 버텍스는 아까 버텍스 어레이에서 0부터 6개써서 삼각형 그려.
}
