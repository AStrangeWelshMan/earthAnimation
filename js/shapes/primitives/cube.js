function setupCubeBuffers() {
  pwgl.cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);
  var cubeVertexPosition = [
       // Front face
       1.0,  1.0,  1.0, //v0
      -1.0,  1.0,  1.0, //v1
      -1.0, -1.0,  1.0, //v2
       1.0, -1.0,  1.0, //v3

       // Back face
       1.0,  1.0, -1.0, //v4
      -1.0,  1.0, -1.0, //v5
      -1.0, -1.0, -1.0, //v6
       1.0, -1.0, -1.0, //v7

       // Left face
      -1.0,  1.0,  1.0, //v8
      -1.0,  1.0, -1.0, //v9
      -1.0, -1.0, -1.0, //v10
      -1.0, -1.0,  1.0, //v11

       // Right face
       1.0,  1.0,  1.0, //12
       1.0, -1.0,  1.0, //13
       1.0, -1.0, -1.0, //14
       1.0,  1.0, -1.0, //15

        // Top face
        1.0,  1.0,  1.0, //v16
        1.0,  1.0, -1.0, //v17
       -1.0,  1.0, -1.0, //v18
       -1.0,  1.0,  1.0, //v19

        // Bottom face
        1.0, -1.0,  1.0, //v20
        1.0, -1.0, -1.0, //v21
       -1.0, -1.0, -1.0, //v22
       -1.0, -1.0,  1.0, //v23
  	];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition),
                gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.CUBE_VERTEX_POS_BUF_NUM_ITEMS = 24;

  // Setup buffer with index
  pwgl.cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);

  var cubeVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 6, 5,      4, 7, 6,    // Back face
            8, 9, 10,     8, 10, 11,  // Left face
            12, 13, 14,   12, 14, 15, // Right face
            16, 17, 18,   16, 18, 19, // Top face
            20, 22, 21,   20, 23, 22  // Bottom face
        ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new
Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS = 36;

  // Setup buffer with texture coordinates
  pwgl.cubeVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);
  var textureCoordinates = [
    // the main satellite texture is 2x2 pixels, with only
    // one pixel in the top-left corner being black, therefore
    // all of the coordinates have been assigned to either the top-left corner
    // or the bottom-right corner
    //Front face
    1.0, 0.0, //v0
    1.0, 0.0, //v1
    1.0, 0.0, //v2
    1.0, 0.0, //v3

    // Back face
    1.0, 0.0, //v4
    1.0, 0.0, //v5
    1.0, 0.0, //v6
    1.0, 0.0, //v7

    // Left face -- this side will face the earth during its rotation
    0.0, 1.0, //v1
    0.0, 1.0, //v5
    0.0, 1.0, //v6
    0.0, 1.0, //v2

    // Right face
    1.0, 0.0, //v0
    1.0, 0.0, //v3
    1.0, 0.0, //v7
    1.0, 0.0, //v4

    // Top face
    1.0, 0.0, //v0
    1.0, 0.0, //v4
    1.0, 0.0, //v5
    1.0, 0.0, //v1

    // Bottom face
    1.0, 0.0, //v3
    1.0, 0.0, //v7
    1.0, 0.0, //v6
    1.0, 0.0, //v2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new
Float32Array(textureCoordinates),gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.CUBE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = 24;

  // Specify normals to be able to do lighting calculations
  pwgl.cubeVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexNormalBuffer);
  var cubeVertexNormals = [
       // Front face
       0.0,  0.0,  1.0, //v0
       0.0,  0.0,  1.0, //v1
       0.0,  0.0,  1.0, //v2
       0.0,  0.0,  1.0, //v3

       // Back face
       0.0,  0.0, -1.0, //v4
       0.0,  0.0, -1.0, //v5
       0.0,  0.0, -1.0, //v6
       0.0,  0.0, -1.0, //v7

      // Left face
      -1.0,  0.0,  0.0, //v1
      -1.0,  0.0,  0.0, //v5
      -1.0,  0.0,  0.0, //v6
      -1.0,  0.0,  0.0, //v2

      // Right face
      1.0,  0.0,  0.0, //0
      1.0,  0.0,  0.0, //3
      1.0,  0.0,  0.0, //7
      1.0,  0.0,  0.0, //4

      // Top face
      0.0,  1.0,  0.0, //v0
      0.0,  1.0,  0.0, //v4
      0.0,  1.0,  0.0, //v5
      0.0,  1.0,  0.0, //v1

      // Bottom face
      0.0, -1.0,  0.0, //v3
      0.0, -1.0,  0.0, //v7
      0.0, -1.0,  0.0, //v6
      0.0, -1.0,  0.0, //v2
    ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexNormals),
                gl.STATIC_DRAW);
  pwgl.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.CUBE_VERTEX_NORMAL_BUF_NUM_ITEMS = 24;
}

function drawCube(texture) {
  // Bind position buffer
 gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc,
               		       pwgl.CUBE_VERTEX_POS_BUF_ITEM_SIZE,
                         gl.FLOAT, false, 0, 0);

  // Bind normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc,
                         pwgl.CUBE_VERTEX_NORMAL_BUF_ITEM_SIZE,
                         gl.FLOAT, false, 0, 0);

  // bind texture coordinate buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.cubeVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc,
                         pwgl.CUBE_VERTEX_TEX_COORD_BUF_ITEM_SIZE,
 			     gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Bind index buffer and draw cube
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.cubeVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.CUBE_VERTEX_INDEX_BUF_NUM_ITEMS,
                  gl.UNSIGNED_SHORT, 0);
}
