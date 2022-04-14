const TIER_0_TICKRATE = 1000;
const TIER_1_TICKRATE = 950;
const TIER_2_TICKRATE = 875;
const TIER_3_TICKRATE = 775;

class Crop {
  constructor(name) {
    this.name = name;
  }
}

class Field {
  growTimer = null;

  constructor(id, crop) {
    this.id = id;
    this.crop = crop;

    this.growTimer = setInterval(() => {

    }, 1000);
  }

  domConstructor() {
    let field = 
  }
}

function startFarm(fieldID) {
  let field = new Field();
}