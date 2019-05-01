function setupSphereBuffers() {
  var radius = 10; // Required to be 10.
  var verticalBands = 250; // can be increased or decreased
  var horizontalBands = 250; // to improve performance at the cost of image quality

  // NOTE: don't go any higher than 250 vertical or horizontal bands
  // any higher and the sphere will look something like a sliced orange
  // the if statements below will prevent this

  // The Algorithms below are based off of these two examples
  // (adapting them to work with how the tutorials are)
  // https://github.com/Erkaman/cute-deferred-shading/blob/master/src/main.cpp#L573 -- this code came from this reddit post : https://www.reddit.com/r/opengl/comments/8y3djf/how_are_the_vertices_for_a_sphere_computed/
  // https://bl.ocks.org/camargo/649e5903c4584a21a568972d4a2c16d3

  if (verticalBands > 250) {
    verticalBands = 250;
  }
  if (horizontalBands > 250) {
    horizontalBands = 250;
  }

  // Setup sphere vertex position buffers
  pwgl.sphereVertexPositionDataBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexPositionDataBuffer);

  var sphereVertexPositionData = [];
  var phi = 0;
  var theta = 0;
  var x = y = z = 0;

  for (var i = 0; i <= verticalBands; i++) {
    phi = i * 2 * Math.PI / verticalBands;
    for (var j = 0; j <= horizontalBands; j++) {
      theta = j * Math.PI / horizontalBands;
      // x coordinate for the vertical band
      x = radius * Math.sin(theta) * Math.cos(phi);
      // y coordinate for the vertical band
      y = radius * Math.cos(theta);
      // z coordinate for the vertical band
      z = radius * Math.sin(theta) * Math.sin(phi);

      // push to the vertex position array
      sphereVertexPositionData.push(x);
      sphereVertexPositionData.push(y);
      sphereVertexPositionData.push(z);
    }
  }
  // Buffer the data
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexPositionData), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.SPHERE_VERTEX_POS_BUF_NUM_ITEMS = sphereVertexPositionData.length

  // Set sphere vertex indices buffers
  pwgl.sphereVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.sphereVertexIndexBuffer);

  var sphereVertexIndicesData = [];
  var v1 = v2 = v3 = v4 = 0;

  for (var i=0; i < verticalBands; i++) {
    for (var j=0; j < horizontalBands; j++) {
      v1 = i*(horizontalBands+1) + j;
      v2 = v1 + 1;
		  v3 = v1 + horizontalBands + 1;
      v4 = v3 + 1;

		  // first triangle
		  sphereVertexIndicesData.push(v1);
		  sphereVertexIndicesData.push(v2);
		  sphereVertexIndicesData.push(v3);
		  // second triangle
		  sphereVertexIndicesData.push(v3);
		  sphereVertexIndicesData.push(v2);
		  sphereVertexIndicesData.push(v4);
	  }
  }
  //bind the data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndicesData), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS = sphereVertexIndicesData.length;

  // Set sphere texture coordinates buffer
  pwgl.sphereVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexTextureCoordinateBuffer);

  var sphereVertexTextureCoodData = [];
  var texX = texY = 0.0;
  var verticalIncrements = 1/verticalBands;
  var horizontalIncrements = 1/horizontalBands;

  for (var i=0; i <= verticalBands; i++) {
    texX = 1 - (i * verticalIncrements);
    for (var j=0; j <= horizontalBands; j++) {
      texY = 1 - (j * horizontalIncrements);
      // push calculated values into the stack
      sphereVertexTextureCoodData.push(texX, texY);
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexTextureCoodData), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.SPHERE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = sphereVertexTextureCoodData.length;

  // Setup buffer for the Normals
  pwgl.sphereVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexNormalBuffer);

  var sphereVertexNormalData = [];

  for (var i = 0; i <= verticalBands; i++) {

    phi = i * 2 * Math.PI / verticalBands;
    for (var j = 0; j <= horizontalBands; j++) {

      theta = j * Math.PI / horizontalBands;
      // x coordinate for the vertical band
      x = Math.sin(theta) * Math.cos(phi);
      // y coordinate for the vertical band
      y = Math.cos(theta);
      // z coordinate for the vertical band
      z = Math.sin(theta) * Math.sin(phi);

      // push to the vertex position array
      sphereVertexNormalData.push(x);
      sphereVertexNormalData.push(y);
      sphereVertexNormalData.push(z);
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertexNormalData), gl.STATIC_DRAW);
  pwgl.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.SPHERE_VERTEX_NORMAL_BUF_NUM_ITEMS = sphereVertexNormalData.length;
}

function drawSphere(texture){
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexPositionDataBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.SPHERE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0 , 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc, pwgl.SPHERE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0 , 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.sphereVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.SPHERE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.sphereVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.SPHERE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);

}
