function setupLights() {
  // Play with light position and orientation to see its effect.
  gl.uniform3fv(pwgl.uniformLightPositionLoc, [0.0, 0.0, 60.0]);
  gl.uniform3fv(pwgl.uniformSpotDirectionLoc, [0.0, 0.0, -1.0]);
  gl.uniform3fv(pwgl.uniformAmbientLightColorLoc, [0.2, 0.2, 0.2]);
  gl.uniform3fv(pwgl.uniformDiffuseLightColorLoc, [0.7, 0.7, 0.7]);
  gl.uniform3fv(pwgl.uniformSpecularLightColorLoc, [0.8, 0.8, 0.8]);
}
