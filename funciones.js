function firstPerson(cam){
    cam.firstPersonState = cam.firstPersonState || {
      azimuth: -atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX),
      zenith: -atan2(cam.eyeY - cam.centerY, dist(cam.eyeX, cam.eyeZ, cam.centerX, cam.centerZ)),
      lookAtDist: dist(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ),
      mousePrevX: mouseX,
      mousePrevY: mouseY
    }
    
    // Look around controls
    cam.firstPersonState.azimuth -= (mouseX - cam.firstPersonState.mousePrevX) / 100;
    if(abs(cam.firstPersonState.zenith + (mouseY - cam.firstPersonState.mousePrevY) / 100) < PI/2) cam.firstPersonState.zenith += (mouseY - cam.firstPersonState.mousePrevY) / 100;
    
    // Movement controls
    if(keyIsPressed && keyCode == 87 || keyIsDown(UP_ARROW)){
      cam.eyeX -= 8 * cos(cam.firstPersonState.azimuth)
      cam.eyeZ += 8 * sin(cam.firstPersonState.azimuth)
    }
    if(keyIsPressed && keyCode == 83 || keyIsDown(DOWN_ARROW)){
      cam.eyeX += 8 * cos(cam.firstPersonState.azimuth)
      cam.eyeZ -= 8 * sin(cam.firstPersonState.azimuth)
    }
    if(keyIsPressed && keyCode == 65 || keyIsDown(LEFT_ARROW)){
      cam.eyeX -= 8 * cos(cam.firstPersonState.azimuth + PI/2)
      cam.eyeZ += 8 * sin(cam.firstPersonState.azimuth + PI/2)
    }
    if(keyIsPressed && keyCode == 68 || keyIsDown(RIGHT_ARROW)){
      cam.eyeX += 8 * cos(cam.firstPersonState.azimuth + PI/2)
      cam.eyeZ -= 8 * sin(cam.firstPersonState.azimuth + PI/2)
    }
    
    // Update previous mouse position
    cam.firstPersonState.mousePrevX = mouseX;
    cam.firstPersonState.mousePrevY = mouseY;
    
    // Update the look-at point
    cam.centerX = cam.eyeX - cam.firstPersonState.lookAtDist * cos(cam.firstPersonState.zenith) * cos(cam.firstPersonState.azimuth);
    cam.centerY = cam.eyeY + cam.firstPersonState.lookAtDist * sin(cam.firstPersonState.zenith);
    cam.centerZ = cam.eyeZ + cam.firstPersonState.lookAtDist * cos(cam.firstPersonState.zenith) * sin(cam.firstPersonState.azimuth);
    
    // Call the built in p5 function 'camera' to position and orient the camera
    camera(cam.eyeX, cam.eyeY, cam.eyeZ,  // position
           cam.centerX, cam.centerY, cam.centerZ,  // look-at
           0, 1, 0)  // up vector
  }