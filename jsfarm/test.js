const CROP_WHEAT = 0;
const CROP_CARROT = 1;
const CROP_POTATO = 2;

let currentCrop = CROP_WHEAT;
let fieldMap = new Map();

function clickEvent(itemID) {
  document.getElementById(itemID).style.backgroundColor = "green";
}

function cropResolver() {
  switch (currentCrop) {
    case CROP_WHEAT:
      return new Crop("Wheat", 20, 3);
    case CROP_CARROT:
      return new Crop("Carrot", 15, 3);
    case CROP_POTATO:
      return new Crop("Potato", 15, 5);
    default:
      return;
  }
}

class Crop {
  constructor(name, chance, stages) {
    this.name = name;
    this.chance = chance;
    this.stages = stages;
  }
}

class Field {
  #growthTimer = null;
  #isGrewUp = false;

  constructor(fieldID) {
    this.id = "field_" + fieldID;
    this.crop = null;
    this.stage = null;
    this.domFieldConstructor();
  }

  domFieldConstructor() {
    let field = document.createElement("div");
    field.innerHTML = "Empty";
    field.setAttribute("id", this.id);
    field.setAttribute("class", "field");
    field.setAttribute("onclick", "Field.clickEvent(this.id)");
    document.getElementById("fieldArea").appendChild(field);
  }

  cropEditor(cropObject, hint) {
    this.crop = cropObject;
    this.stage = 0;

    clearInterval(this.#growthTimer);
    let field = document.getElementById(hint);
    field.innerHTML = `${this.crop.name} [${this.stage} / ${this.crop.stages}]`;
    this.#growthTimer = setInterval(() => {
      let isStageGrewUp = Math.floor(Math.random() * 101) <= this.crop.chance;
      if (isStageGrewUp) {
        this.stage++;
        field.innerHTML = `${this.crop.name} [${this.stage} / ${this.crop.stages}]`;
        console.log(`Grew up on ${this.stage} stage of ${this.crop.stages} of total.`);
      }

      if (this.stage === this.crop.stages) {
        clearInterval(this.#growthTimer);
        console.log(`Crop ${this.crop.name} is grew up!`);
        this.domFieldEditor(hint);
      }
    }, 1000);
  }

  domFieldEditor(hint) {
    let field = document.getElementById(hint);
    field.innerHTML = "Grew up!";
    field.style.backgroundColor = "green";
  }

  isEmpty() {
    return this.crop === null;
  }

  static clickEvent(fieldPointer) {
    let field = document.getElementById(fieldPointer);
    //console.log(fieldPointer);
    //console.log(fieldMap.get(fieldPointer));
    
    let selectedField = fieldMap.get(fieldPointer);
    selectedField.cropEditor(cropResolver(), fieldPointer);
    //let res = Math.floor(Math.random() * 101) <= this.crop.chance;
  }
}

let currentID = 0;

function startFarm() {
  let field = new Field(currentID);
  fieldMap.set(field.id, field);
  currentID++;
}
