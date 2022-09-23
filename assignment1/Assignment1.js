var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    var vertices = new Float32Array([
        // background
        -1.0, 1.0, -1, -0.5, 1, 1,
        -1.0, -0.5, 1, 1, 1, -0.5,

        //house
        -0.5, -0.5, -0.5, -0.1, -0.0, -0.1,
        -0.5, -0.5, -0.0, -0.5, -0.0, -0.1,
        -0.4, -0.5, -0.2, -0.2, -0.4, -0.2,
        -0.4, -0.5, -0.2, -0.5, -0.2, -0.2,
        -0.5, -0.1, -0.0, -0.1, -0.25, 0.25,

        //ground
        -2.0, -0.5, -2.0, -2.0, 2.0, -0.5, //triangle
        -2.0, -2.0, 2.0, -0.5, 2.0, -2.0, //triangle

        //large mountain
        0.25, -0.5, 0.75, -0.5, 0.5, 0.6,

        //small mountain
        0.75, -0.5, 0.95, -0.5, 0.85, 0,

        //large tree
        -0.75, 0.8, -0.55, 0.5, -0.95, 0.5,   //triangle
        -0.75, 0.5, -0.55, 0.2, -0.95, 0.2,     //triangle
        -0.75, 0.2, -0.55, -0.1, -0.95, -0.1,  //triangle
        -0.85, -0.1, -0.65, -0.1, -0.85, -0.6, //triangle
        -0.85, -0.6, -0.65, -0.6, -0.65, -0.1,     //triangle
        
        //small tree
        0.1, 0, -0.1, -0.25, 0.3, -0.25, //triangle
        0.1, -0.15, -0.15, -0.4, 0.35, -0.4, //triangle
        0.05, -0.4, 0.15, -0.4, 0.05, -0.65, //triangle
        0.05, -0.65, 0.15, -0.65, 0.15, -0.4, //triangle


        //star
        0.7, 0.75, 0.6, 0.65, 0.8, 0.65, //triangle
        0.7, 0.62, 0.6, 0.71, 0.8, 0.71 //triangle
    ]);

    var colors = [
        //background
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),
        vec4(0.5, 1, 1, 1),
        vec4(0.3, 0.2, 1, 1),

        //house
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),
        vec4(0.8, 0.9, 0.6, 0.8),

        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),
        vec4(0.5, 0.2, 1, 0.5),

        vec4(1, 0.2, 0, 0.8),
        vec4(1, 0.2, 0, 0.8),
        vec4(1, 0.2, 0, 0.8),

        //ground
        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),

        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),


        //large mountain
        vec4(0, 0.8, 0, 1),
        vec4(0, 0.8, 0, 1),
        vec4(0, 0.8, 0, 1),
        //small mountain
        vec4(0, 0.8, 0, 1),
        vec4(0, 0.8, 0, 1),
        vec4(0, 0.8, 0, 1),


        //large tree
        //triangle
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        //rectangle
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),


        //small tree
        //triangle
        vec4(0, 0.2, 0, 0.5),
        vec4(0, 0.2, 0, 0.5),
        vec4(0, 0.2, 0, 0.5),
        vec4(0, 0.2, 0, 0.5),
        vec4(0, 0.2, 0, 0.5),
        vec4(0, 0.2, 0, 0.5),
        //rectangle
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),


        //star
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
    ];

    //Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    //Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Load the data into the GPU
    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //vertex color
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);

    //uniform variable
    var offsetLoc = gl.getUniformLocation(program, "uOffset");

    //uniform variable
    var size = gl.getUniformLocation(program, "size");

    //size option
    gl.uniform4fv(size, [1, 1, 1, 1]);

    //background
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    //house
    gl.drawArrays(gl.TRIANGLES, 6, 6);
    gl.drawArrays(gl.TRIANGLES, 12, 6);
    gl.drawArrays(gl.TRIANGLES, 18, 3);

    //ground
    gl.drawArrays(gl.TRIANGLES, 21, 6);

    //large mountain
    gl.drawArrays(gl.TRIANGLES, 27, 3);
    //small mountain
    gl.drawArrays(gl.TRIANGLES, 30, 3);

    //large tree
    gl.drawArrays(gl.TRIANGLES, 33, 9);
    gl.drawArrays(gl.TRIANGLES, 42, 6);

    //small tree
    gl.drawArrays(gl.TRIANGLES, 48, 6);
    gl.drawArrays(gl.TRIANGLES, 54, 6);
    
    //star
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.1, 0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.3, -0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.1, -0.6, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.35, -1.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.5, -1.5, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.5, -1.4, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.2, 0.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.5, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.7, -0.4, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);


    //change size 
    gl.uniform4fv(size, [0.6, 0.6, 1, 1]);
    //star
    gl.uniform4fv(offsetLoc, [-0.75, 0.4, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.25, -0.65, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.5, -1.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.7, -0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.8, -1.5, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0, -1.1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.8, -1.1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.1, -1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.3, -1.2, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.2, -0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.1, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-1.3, -0.1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.25, -0.5, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);


    //change size 
    gl.uniform4fv(size, [0.4, 0.4, 1, 1]);
    //star
    gl.uniform4fv(offsetLoc, [-0.3, -0.9, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.6, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.85, -0.9, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.5, 0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.2, 0.3, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [0.1, 0.4, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.1, 0.6, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.15, 0.55, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
    gl.uniform4fv(offsetLoc, [-0.05, -0.45, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 60, 6);
};

