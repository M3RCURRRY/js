const CROP_WHEAT = 0;
const CROP_CARROT = 1;
const CROP_POTATO = 2;

const WHEAT_COST = 2;
const CARROT_COST = 6;
const POTATO_COST = 12;

let FIELD_COST = 8;
let fieldMap = new Map();
let cropStorage = new Map();
cropStorage.set("Wheat", 0);
cropStorage.set("Carrot", 0);
cropStorage.set("Potato", 0);


let Player = {
  username: null,
  balance: 10,
  getBalance() {
    return this.balance;
  },
  payToPlayer(earned) {
    this.balance += earned;
  },
  setUsername() {
    this.username = prompt("Enter your name", "");
  },
  getUsername() {
    return this.username;
  }
}

class Crop {

  static currentCrop = CROP_WHEAT;

  constructor(name, chance, stages) {
    this.name = name;
    this.chance = chance;
    this.stages = stages;
  }

  static cropResolver() {
    switch (this.currentCrop) {
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

  static selectCrop(cropId) {
    switch(cropId) {
      case "crop_WHEAT":
        Crop.currentCrop = CROP_WHEAT;
        break;
      case "crop_CARROT":
        Crop.currentCrop = CROP_CARROT;
        break;
      case "crop_POTATO":
        Crop.currentCrop = CROP_POTATO;
        break;
      default:
        console.log("default case");
        break;
    }
  }
}

class Field {
  #growthTimer = null;
  #isGrewUp = false;

  constructor(fieldID) {
    this.id = "field_" + fieldID;
    this.crop = null;
    this.stage = null;
    DOMEditor.createNewField(this.id);
  }

  addCropToField(cropObject, fieldId) {
    this.crop = cropObject;
    this.stage = 0;

    clearInterval(this.#growthTimer);
    let fieldData = `${this.crop.name} [${this.stage} / ${this.crop.stages}]`;
    DOMEditor.updateFieldDOM(fieldId, fieldData);

    this.#growthTimer = setInterval(() => {
      let isStageGrewUp = Math.floor(Math.random() * 101) <= this.crop.chance;
      if (isStageGrewUp) {
        this.stage++;
        fieldData = `${this.crop.name} [${this.stage} / ${this.crop.stages}]`;
        DOMEditor.updateFieldDOM(fieldId, fieldData);
        console.log(`${fieldId} grew up on ${this.stage} stage of ${this.crop.stages} of total.`);
      }

      if (this.stage === this.crop.stages) {
        clearInterval(this.#growthTimer);
        console.log(`${fieldId}'s crop ${this.crop.name} is grew up!`);
        this.#isGrewUp = true;
        DOMEditor.toStateReady(fieldId);
      }
    }, 1000);
  }

  isGrewUp() {
    return this.#isGrewUp;
  }

  isEmpty() {
    return this.crop === null;
  }

  clearField() {
    this.#isGrewUp = false;
    this.crop = null;
  }

  static fieldClickEvent(fieldId) {
    let clickedField = fieldMap.get(fieldId);

    if (clickedField.isGrewUp()) {
      DOMEditor.toStateEmpty(fieldId);
      console.log(clickedField.crop);
      cropStorage[clickedField.crop.name] = cropStorage.get(clickedField.crop.name) + 1;
      console.log(cropStorage[clickedField.crop.name]);
      clickedField.clearField();
      console.log("Field's crop has been collected!");
    }
    else if (clickedField.isEmpty()) {
      DOMEditor.toStateGrowing(fieldId);
      clickedField.addCropToField(Crop.cropResolver(), fieldId);
      console.log("Now field has been planted!");
    }
    else {
      console.log("Please, wait!");
    }
  }
}

let DOMEditor = {
  COLOR_EMPTY: "gray",
  COLOR_GROWING: "orange",
  COLOR_READY: "green",

  createNewField(fieldId) {
    let field = document.createElement("div");
    field.innerHTML = "Empty";
    field.setAttribute("id", fieldId);
    field.setAttribute("class", "field");
    field.style.backgroundColor = this.COLOR_EMPTY;
    field.setAttribute("onclick", "Field.fieldClickEvent(this.id)");
    document.getElementById("fieldArea").appendChild(field);
  },

  toStateEmpty(fieldId) {
    let field = document.getElementById(fieldId);
    field.style.backgroundColor = this.COLOR_EMPTY;
    field.innerHTML = "Empty";
  },

  toStateGrowing(fieldId) {
    let field = document.getElementById(fieldId);
    field.style.backgroundColor = this.COLOR_GROWING;
  },

  toStateReady(fieldId) {
    let field = document.getElementById(fieldId);
    field.innerHTML = `${fieldId} grew up!`;
    field.style.backgroundColor = this.COLOR_READY;
  },

  updateFieldDOM(fieldId, fieldData) {
    let field = document.getElementById(fieldId);
    field.innerHTML = fieldData;
  },

  startGame() {
    Player.setUsername();
    Player.getBalance();
    document.getElementById("stat_USERNAME").innerHTML = Player.getUsername();
    document.getElementById("stat_BALANCE").innerHTML = Player.getBalance();
  }
}

let currentID = 0;

function createFieldHandler() {
  let field = new Field(currentID);
  fieldMap.set(field.id, field);
  currentID++;
}

DOMEditor.startGame();

console.log(cropStorage);