//Texture setup
function setupTextures() {
  // Texture for the earth
  pwgl.earthTexture = gl.createTexture();
  loadImageForTexture("img/earth.jpg", pwgl.earthTexture);

  //Texture for the main satellite body
  pwgl.mainSatTexture = gl.createTexture();
  loadImageForTexture("img/colouredTextures/mainSatBody.jpg", pwgl.mainSatTexture);

  //Texture for the golden rods
  pwgl.goldTexture = gl.createTexture();
  loadImageForTexture("img/colouredTextures/gold.jpg", pwgl.goldTexture);

  //Texture for solar panels
  pwgl.solarPanelTexture = gl.createTexture();
  loadImageForTexture("img/colouredTextures/solarPanel.jpg", pwgl.solarPanelTexture);

}

function loadImageForTexture(url, texture) {
  var image = new Image();
  image.onload = function() {
    pwgl.ongoingImageLoads.splice(pwgl.ongoingImageLoads.indexOf(image), 1);

    textureFinishedLoading(image, texture);
  }
  pwgl.ongoingImageLoads.push(image);
  image.src = url;
}

function textureFinishedLoading(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.generateMipmap(gl.TEXTURE_2D);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
