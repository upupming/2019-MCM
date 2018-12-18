init();
for (let timeStep = 0; timeStep++; timeStep < maxSteps) {
  for (let vehicle of allVehicles) {

    let { speed, location } = getSpeedAndLocation(vehicle);

    if (canChangeToTheLeftLane(vehicle) && getRandom() < p['left']) {
      changeToTheLeftLane(vehicle);
    }
    else if (canChangeToTheRightLane(vehicle) && getRandom() < p['right']) {
      changeToTheRightLane(vehicle);
    }
  }
}
output();