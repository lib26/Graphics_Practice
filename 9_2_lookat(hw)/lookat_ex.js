'use strict';

var canvas;
var gl;

var numVertices = 36;

var pointsArray = [];
var colorsArray = [];

var vertices = [
  vec4(-0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, 0.5, 0.5, 1.0),
  vec4(0.5, 0.5, 0.5, 1.0),
  vec4(0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, -0.5, -0.5, 1.0),
  vec4(-0.5, 0.5, -0.5, 1.0),
  vec4(0.5, 0.5, -0.5, 1.0),
  vec4(0.5, -0.5, -0.5, 1.0),
];

var vertexColors = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
  vec4(1.0, 1.0, 1.0, 1.0), // white
];

var radius = 1.0;
var theta = 0.0;
var phi = 0.0;
var dr = (5.0 * Math.PI) / 180.0; // 각도를 얼마만큼 바꿀것이냐. degree radius?

var mvMatrix;
var modelView;
var eye;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

// quad uses first index to set color for face
// 하나의 면을 만들기 위해서 필요한 버텍스 좌표 6개
function quad(a, b, c, d) {
  pointsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[b]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[d]);
  colorsArray.push(vertexColors[a]);
}

// Each face determines two triangles
// quad 하나는 정육면체를 구성하는 면중 1개를 의미
function colorCube() {
  quad(1, 0, 3, 2); 
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

window.onload = function init() {
  canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  //
  //  Load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  colorCube();

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  modelView = gl.getUniformLocation(program, 'modelView');

  // buttons to change viewing parameters
  // 카메라 위치를 어떻게 조정할 것인가
  document.getElementById('Button1').onclick = function () {
    radius *= 1.1;
    console.log(radius);
    console.log(eye);
  };
  document.getElementById('Button2').onclick = function () {
    radius *= 0.9;
    console.log(radius);
    console.log(eye);
  };
  document.getElementById('Button3').onclick = function () {
    theta += dr;
    console.log(eye);
  };
  document.getElementById('Button4').onclick = function () {
    theta -= dr;
    console.log(eye);
  };
  document.getElementById('Button5').onclick = function () {
    phi += dr;
    console.log(eye);
  };
  document.getElementById('Button6').onclick = function () {
    phi -= dr;
    console.log(eye);
  };

  render();
};

var render = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  eye = vec3(
    radius * Math.cos(theta) * Math.sin(phi), // X
    radius * Math.sin(theta),                 // Y
    radius * Math.cos(theta) * Math.cos(phi)  // Z
  ); // eye point
  mvMatrix = lookAt(eye, at, up); // 카메라 위치, 어디를 보는지인데 위에서 0,0,0 이라 원점을 바라본다 , 광원처리할 때 사용하는 것 => lookAt을 하면 modelview matrix가 구해짐.
  gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix)); // 유니폼으로 보내준다. 그럼 쉐이더에서 받고 모든 위치에 곱해준다. 그러면 버텍스들이 카메라 위치에서의 좌표값으로 바뀐다.
  // projection은 안해줬으니까 parallel projection이고, view volume이 2인 정사각형
  gl.drawArrays(gl.TRIANGLES, 0, numVertices); 
  requestAnimFrame(render);
};
