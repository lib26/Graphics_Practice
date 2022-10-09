var gl;

window.onload = function init() {
  var canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  var body = new Float32Array([
    0, 1, -0.5, 0.5, 0.5, 0.5, 0, 0.5, -0.5, 0, 0.5, 0, 0, 0, -0.5, -0.5, 0.5,
    -0.5, -0.15, -0.5, 0.15, -0.5, -0.15, -1, 0.15, -0.5, -0.15, -1, 0.15, -1,
  ]);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, body, gl.STATIC_DRAW);

  // Associate vertex data buffer with shader variables

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  //

  var uColor = gl.getUniformLocation(program, 'uColor');
  gl.clear(gl.COLOR_BUFFER_BIT);

  //나뭇잎 초록색
  gl.uniform4fv(uColor, [0, 1, 0, 1]); //마지막 v는 [0,1,0,1] vec4 array 사용한다는 뜻
  gl.drawArrays(gl.TRIANGLES, 0, 9);

  // 나무 몸통 갈색
  gl.uniform4fv(uColor, [0.5, 0.25, 0, 1]);
  gl.drawArrays(gl.TRIANGLES, 9, 6);
};
