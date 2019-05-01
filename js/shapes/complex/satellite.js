function drawSatellite() {


  //main satellite body
  pushModelViewMatrix();
  mat4.scale(pwgl.modelViewMatrix, [1.0, 1.0, 1.0], pwgl.modelViewMatrix);
  uploadNormalMatrixToShader();
  drawCube(pwgl.mainSatTexture);
  popModelViewMatrix();


  //----------RODS----------//

  // Left rod
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 0.0, 1.5], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.2, 0.2, 0.5], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.goldTexture);
  popModelViewMatrix();

  // Right Rod
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 0.0, -1.5], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.2, 0.2, 0.5], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.goldTexture);
  popModelViewMatrix();

  // Front Rod
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [-1.4, 0.0, 0.0], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.4, 0.2, 0.2], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.goldTexture)
  popModelViewMatrix();

  //----------DRAW DISH----------//


  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [-2.6, 0.0, 0.0], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [1.0,2.0,2.0], pwgl.modelViewMatrix);
  mat4.rotateZ(pwgl.modelViewMatrix, -Math.PI/2, pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawDish(pwgl.goldTexture);
  popModelViewMatrix();

  //----------SOLAR PANELS----------//


  //Solar panel left
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 0.0, 3], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.25, 0.5, 1.0], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.solarPanelTexture);
  popModelViewMatrix();

  //Solar panel right
  pushModelViewMatrix();
  mat4.translate(pwgl.modelViewMatrix, [0.0, 0.0, -3], pwgl.modelViewMatrix);
  mat4.scale(pwgl.modelViewMatrix, [0.25, 0.5, 1.0], pwgl.modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawCube(pwgl.solarPanelTexture);
  popModelViewMatrix();

}
