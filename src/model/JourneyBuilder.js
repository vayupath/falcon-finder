import Journey from "../model/Journey";
class JourneyBuilder {
    constructor(
        journeyId,
        newPlanet,
        oldPlanet,
        newVehicle,
        oldVehicle,
        timeTaken,
        isVehicleValid
    ) {
        this.journeyId = journeyId;
        this.newPlanet = newPlanet;
        this.oldPlanet = oldPlanet;
        this.newVehicle = newVehicle;
        this.oldVehicle = oldVehicle;
        this.timeTaken = timeTaken;
        this.isVehicleValid = isVehicleValid
    }

    setJourneyId(val) {
        this.journeyId = val;
        return this;
    }

    setNewPlanet(val) {
        this.newPlanet = val;
        return this;
    }
    setOldPlanet(val) {
        this.oldPlanet = val;
        return this;
    }

    setNewVehicle(val) {
        this.newVehicle = val;
        return this;
    }

    setOldVehicle(val) {
        this.oldVehicle = val;
        return this;
    }

    setTimeTaken(val) {
        this.timeTaken = val;
        return this;
    }

    setIsVehicleValid(val) {
        this.isVehicleValid = val;
        return this;
    }



    build() {
        return new Journey(this);
    }
}

export default JourneyBuilder;
