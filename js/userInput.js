function mymousedown( ev ){
  drag  = 1;
  xOffs = ev.clientX;
  yOffs = ev.clientY;
}

function mymouseup( ev ){
  drag  = 0;
}

function mymousemove( ev ){
  if ( drag == 0 ) return;
    if ( ev.shiftKey ) {
      transX = (ev.clientY - yOffs)/10;
      //zRot = (xOffs - ev.clientX)*.3;
  } else if (ev.altKey) {
    transY = -(ev.clientY - yOffs)/10;
  } else {
  yRot = - xOffs + ev.clientX;
  xRot = - yOffs + ev.clientY;
  }
  xOffs = ev.clientX;
  yOffs = ev.clientY;
  //console.log("xRot= "+xRot+"    yRot="+yRot+"   trans=  "+transl);
  //console.log("xOff= "+xOffs+"    yOff="+yOffs);
}

function wheelHandler(ev) {
  if (ev.shiftKey) transX = -ev.detail/10;
  if (ev.altKey) transY = -ev.detail/10;
  else transZ =ev.detail/10;
  //console.log("delta ="+ev.detail);
  ev.preventDefault();
}

// Keyboard event handling

function handleKeyDown(event) {
  pwgl.listOfPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
  pwgl.listOfPressedKeys[event.keyCode] = false;
}

function handlePressedDownKeys() {
  // Arrow Keys and WSAD
  // Rotational controls
  if (pwgl.listOfPressedKeys[39] || pwgl.listOfPressedKeys[68]) {
    // Arrow Right or D, increase radius of orbit
    pwgl.orbitRadius += 0.1;
  }

  if (pwgl.listOfPressedKeys[37] || pwgl.listOfPressedKeys[65]) {
    // Arrow Left or A, decrease radius of orbit
    pwgl.orbitRadius -= 0.1;
    // prevents the satellite from "crashing into the earth"
    if (pwgl.orbitRadius < 12) {
      pwgl.orbitRadius = 12;
    }
  }
  // Speed controls
  if (pwgl.listOfPressedKeys[38] || pwgl.listOfPressedKeys[87]) {
    // Arrow up or W, increase speed of orbit
    console.log("Up pressed");
    pwgl.orbitSpeed -= 10;
    // Limiting it to 100 so that the satellite will not go
    // unreasonably quick
    if (pwgl.orbitSpeed < 500) {
     pwgl.orbitSpeed = 500;
  }
}

  if (pwgl.listOfPressedKeys[40] || pwgl.listOfPressedKeys[83]) {
    // Arrow down or S, decrease speed of orbit
    // console.log("Down pressed");

    pwgl.orbitSpeed += 10;
  }
}
