var gl;
var points;

// 전체 페이지가 완전히 로드 했을 때 불리는 콜백 함수
window.onload = function init() {
  var canvas = document.getElementById('gl-canvas');

  // GL한테 canvas HTML 태그에다가 그려줄거다! 라고 알려주면서
  // 이걸로 webGL과 연결을해서 gl을 받아오고
  //  gl.뭐시기로 그림을 그리는.
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

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Associate vertex data buffer with shader variables

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
