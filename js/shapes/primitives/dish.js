function setupDishBuffers() {
  var radius = 1; // Required to be 10.
  var verticalBands = 40; // can be increased or decreased
  var horizontalBands = 40; // to improve performance at the cost of image quality

  // NOTE: don't go any higher than 250 vertical or horizontal bands
  // any higher and the dish will look as if you've sliced an orange
  // the if statements below will prevent this

  // The Algorithms below are based off of these two examples
  // (adapting them to work )
  // https://github.com/Erkaman/cute-deferred-shading/blob/master/src/main.cpp#L573 -- this code came from this reddit post : https://www.reddit.com/r/opengl/comments/8y3djf/how_are_the_vertices_for_a_dish_computed/
  //

  if (verticalBands > 250) {
    verticalBands = 250;
  }
  if (horizontalBands > 250) {
    horizontalBands = 250;
  }

  // Setup dish vertex position buffers
  pwgl.dishVertexPositionDataBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexPositionDataBuffer);

  var dishVertexPositionData = [];
  var phi = 0;
  var theta = 0;
  var x = y = z = 0;

  for (var i = 0; i <= verticalBands; i++) {
    phi = i * 2 * Math.PI / verticalBands;
    for (var j = 0; j <= horizontalBands; j++) {
      // rotate the vertex's 180 degres
      theta = j * (Math.PI/2) / horizontalBands;
      // x coordinate for the vertical band
      x = radius * Math.sin(theta) * Math.cos(phi);
      // y coordinate for the vertical band
      y = radius * Math.cos(theta);
      // z coordinate for the vertical band
      z = radius * Math.sin(theta) * Math.sin(phi);

      // push to the vertex position array
      dishVertexPositionData.push(x);
      dishVertexPositionData.push(y);
      dishVertexPositionData.push(z);
    }
  }
  // Buffer the data
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(dishVertexPositionData),
                gl.STATIC_DRAW);

  pwgl.DISH_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.DISH_VERTEX_POS_BUF_NUM_ITEMS = dishVertexPositionData.length

  // Set dish vertex indices buffers
  pwgl.dishVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.dishVertexIndexBuffer);

  var dishVertexIndicesData = [];
  var v1 = v2 = v3 = v4 = 0;

  for (var i=0; i < verticalBands; i++) {
    for (var j=0; j < horizontalBands; j++) {
      v1 = i*(horizontalBands+1) + j;
      v2 = v1 + 1;
		  v3 = v1 + horizontalBands + 1;
      v4 = v3 + 1;

		  // first triangle
		  dishVertexIndicesData.push(v1);
		  dishVertexIndicesData.push(v2);
		  dishVertexIndicesData.push(v3);
		  // second triangle
		  dishVertexIndicesData.push(v3);
		  dishVertexIndicesData.push(v2);
		  dishVertexIndicesData.push(v4);
	  }
  }
  //bind the data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(dishVertexIndicesData),
                gl.STATIC_DRAW);

  pwgl.DISH_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.DISH_VERTEX_INDEX_BUF_NUM_ITEMS = dishVertexIndicesData.length;

  // Set dish texture coordinates buffer
  pwgl.dishVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexTextureCoordinateBuffer);

  var dishVertexTextureCoodData = [];
  var textureX = textureY = 0.0;
  var verticalIncrements = 1/verticalBands;
  var horizontalIncrements = 1/horizontalBands;

  for (var i=0; i <= verticalBands; i++) {
    textureX = 1 - (i * verticalIncrements);
    for (var j=0; j <= horizontalBands; j++) {
      textureY = 1 - (j * horizontalIncrements);
      // push into the array
      dishVertexTextureCoodData.push(textureX, textureY);
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dishVertexTextureCoodData), gl.STATIC_DRAW);
  pwgl.DISH_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.DISH_VERTEX_TEX_COORD_BUF_NUM_ITEMS = dishVertexTextureCoodData.length;

  // Setup buffer for the Normals
  pwgl.dishVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexNormalBuffer);

  var dishVertexNormalData = [];

  for (var i = 0; i <= verticalBands; i++) {

    phi = i * 2 * Math.PI / verticalBands;
    for (var j = 0; j <= horizontalBands; j++) {

      theta = j * (Math.PI/2) / horizontalBands;
      // x coordinate for the vertical band
      x = Math.sin(theta) * Math.cos(phi);
      // y coordinate for the vertical band
      y = Math.cos(theta);
      // z coordinate for the vertical band
      z = Math.sin(theta) * Math.sin(phi);

      // push to the vertex position array
      dishVertexNormalData.push(x);
      dishVertexNormalData.push(y);
      dishVertexNormalData.push(z);
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(dishVertexNormalData),
                gl.STATIC_DRAW);

  pwgl.DISH_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.DISH_VERTEX_NORMAL_BUF_NUM_ITEMS = dishVertexNormalData.length;
}

function drawDish(texture){
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexPositionDataBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc,
                         pwgl.DISH_VERTEX_POS_BUF_ITEM_SIZE,
                         gl.FLOAT, false, 0 , 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc,
                         pwgl.DISH_VERTEX_NORMAL_BUF_ITEM_SIZE,
                         gl.FLOAT, false, 0 , 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.dishVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc,
                         pwgl.DISH_VERTEX_TEX_COORD_BUF_ITEM_SIZE,
                         gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.dishVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES,
                  pwgl.DISH_VERTEX_INDEX_BUF_NUM_ITEMS,
                  gl.UNSIGNED_SHORT, 0);

}
