// globals
var gl;
var pwgl = {}; //Many variables are added to this as properties
pwgl.ongoingImageLoads = [];
var canvas;

// Varibales for interactive control
var transY = transX =  transZ = 0;
var xRot =yRot =zRot = xOffs = yOffs = drag = 0;
pwgl.listOfPressedKeys = []; // Keep track of pressed down keys in a list


function createGLContext(canvas) {
  var names = ["webgl", "experimental-webgl"];
  var context = null;
  for (var i=0; i < names.length; i++) {
  try {
  context = canvas.getContext(names[i]);
} catch(e) {}
  if (context) {
    break;
  }
}
  if (context) {
  	context.viewportWidth = canvas.width;
  	context.viewportHeight = canvas.height;
  } else {
  	alert("Failed to create WebGL context!");
  }
   return context;
}

function loadShaderFromDOM(id) {
  var shaderScript = document.getElementById(id);
  // If the element with the specified id is not found, exit
  if (!shaderScript) {
    return null;
  }

  // Loop through the children for the found DOM element and
  // build up the shader source code as a string
  var shaderSource = "";
  var currentChild = shaderScript.firstChild;
  while (currentChild) {
  if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
	  shaderSource += currentChild.textContent;
  }
  currentChild = currentChild.nextSibling;
}

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
  	shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
	shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
	return null;
}

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)
				&&!gl.isContextLost()) {
	alert("compiler!!!!!!")
	alert(gl.getShaderInfoLog(shader));
	return null;
  }
  return shader;
}

function setupShaders() {
  var vertexShader = loadShaderFromDOM("shader-vs");
  var fragmentShader = loadShaderFromDOM("shader-fs");
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)
  &&!gl.isContextLost()) {
    alert("Failed to link shaders: " +
    gl.getProgramInfoLog(shaderProgram));
  }

  gl.useProgram(shaderProgram);

  pwgl.vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram,
  "aVertexPosition");
  pwgl.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram,
  "aTextureCoordinates");
  pwgl.uniformMVMatrixLoc = gl.getUniformLocation(shaderProgram,
  "uMVMatrix");
  pwgl.uniformProjMatrixLoc = gl.getUniformLocation(shaderProgram,
  "uPMatrix");
  pwgl.uniformSamplerLoc = gl.getUniformLocation(shaderProgram,
  "uSampler");

  pwgl.uniformNormalMatrixLoc = gl.getUniformLocation(shaderProgram,
  "uNMatrix");
  pwgl.vertexNormalAttributeLoc = gl.getAttribLocation(shaderProgram,
  "aVertexNormal");
  pwgl.uniformLightPositionLoc =gl.getUniformLocation(shaderProgram,
  "uLightPosition");
  pwgl.uniformSpotDirectionLoc =
  gl.getUniformLocation(shaderProgram,
  "uSpotDirection");
  pwgl.uniformAmbientLightColorLoc = gl.getUniformLocation(shaderProgram,
  "uAmbientLightColor");
  pwgl.uniformDiffuseLightColorLoc = gl.getUniformLocation(shaderProgram,
  "uDiffuseLightColor");
  pwgl.uniformSpecularLightColorLoc = gl.getUniformLocation(shaderProgram,
  "uSpecularLightColor");

  gl.enableVertexAttribArray(pwgl.vertexNormalAttributeLoc);
  gl.enableVertexAttribArray(pwgl.vertexPositionAttributeLoc);
  gl.enableVertexAttribArray(pwgl.vertexTextureAttributeLoc);

  pwgl.modelViewMatrix = mat4.create();
  pwgl.projectionMatrix = mat4.create();
  pwgl.modelViewMatrixStack = [];
}

function pushModelViewMatrix() {
var copyToPush = mat4.create(pwgl.modelViewMatrix);
pwgl.modelViewMatrixStack.push(copyToPush);
}

function popModelViewMatrix() {
  if (pwgl.modelViewMatrixStack.length == 0) {
throw "Error popModelViewMatrix() - Stack was empty ";
  }
  pwgl.modelViewMatrix = pwgl.modelViewMatrixStack.pop();
}

// Shader stack controls

function uploadNormalMatrixToShader() {
  var normalMatrix = mat3.create();
  mat4.toInverseMat3(pwgl.modelViewMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  gl.uniformMatrix3fv(pwgl.uniformNormalMatrixLoc, false, normalMatrix);

}

function uploadModelViewMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformMVMatrixLoc, false,
  pwgl.modelViewMatrix);
}

function uploadProjectionMatrixToShader() {
  gl.uniformMatrix4fv(pwgl.uniformProjMatrixLoc, false,
  pwgl.projectionMatrix);
}

// context functions
function handleContextLost(event) {
  event.preventDefault();
  cancelRequestAnimFrame(pwgl.requestId);
  // Ignore all ongoing image loads by removing their onload handler
  for (var i = 0; i < pwgl.ongoingImageLoads.length; i++) {
    pwgl.ongoingImageLoads[i].onload = undefined;
  }
  pwgl.ongoingImageLoads = [];
}

function handleContextRestored(event) {
  init();
  pwgl.requestId = requestAnimFrame(draw,canvas);
}
