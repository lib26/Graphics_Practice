var gl;
var points;

window.onload = function init() {
  var canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
  // var vertices = [ vec2(-1,-1), vec2(0,1), vec2(1,-1)];
  //  Configure WebGL
  var vertices = [
    vec2(-0.5, 0.5), // v0
    vec2(-0.5, -0.5), // v1
    vec2(0.5, 0.5), // v2
    vec2(0.5, -0.5), // v3
    //vec2(-0.7, -0.25), // v4 내가 추가한 실험 vertex
  ];

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate vertex data buffer with shader variables

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // // 축 욺직이기인데 안되네
  // var uOffset = gl.getUniformLocation(program, 'uOffset ');
  // gl.uniform4fv(uOffset, [0.5, 0, 0, 0]);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
