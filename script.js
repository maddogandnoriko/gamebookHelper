/*
if (typeof navigator.serviceWorker !== 'undefined') {
  navigator.serviceWorker.register('./sw.js')
}
*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

const d6Pics = [
  "images/d6-1.png",
  "images/d6-2.png",
  "images/d6-3.png",
  "images/d6-4.png",
  "images/d6-5.png",
  "images/d6-6.png"
];
const rules = [
  { 
    name: "Deathtrap Dungeon", 
    combat: "Roll 2d6 for monster & add its SKILL. Roll 2d6 for you & add your SKILL. Highest score wins, -2 Stamina from loser. You may use LUCK.",
    luck: "Roll 2d6. lf the result is equal to or less than your current LUCK score, you are lucky. Else you are unlucky. Either way, subtract 1 LUCK point.",
    provisions: "Eating a meal restores 4 STAMINA points"
  },
  { 
    name: "City of Thieves", 
    combat: "",
    luck: "",
    provisions: ""
  }
];
var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    let randomNumbers = [];
    for (var i = 0; i < 2; i++) {
      randomNumbers.push(Math.floor(Math.random() * this.sides) + 1);
    }
    return randomNumbers;
  }
}



// Super basic localStorage
/*
const textArea = document.querySelector('textarea');
const storageKey = 'text';

const init = () => {
  
  textArea.value = localStorage.getItem(storageKey);
  
  textArea.addEventListener('input', () => {
    localStorage.setItem(storageKey, textArea.value);
  });
}

init();
*/




document.addEventListener("DOMContentLoaded", displayCharacterData);
document.getElementById('gamebookTitle').addEventListener('change', function (evt) {
  displayHintCards(evt.target.value);
  saveGamebookTitle();
})
document.getElementById('clearLocalStorage').addEventListener('click', function (evt) {
  localStorage.clear();
  alert("LocalStorage Cleared");
  location.reload();
})
document.getElementById('lastEntry').addEventListener('input', function (evt) {
  saveLastEntry();
})
document.getElementById("rollButton").addEventListener("click", function (evt) {
  const result = dice.roll();
  printNumber(0, result[0]);
  printNumber(1, result[1]);
});
document.getElementById('initialSkill').addEventListener('input', function (evt) {
  saveCharacterSkill();
})
document.getElementById('currentSkill').addEventListener('input', function (evt) {
  saveCharacterSkill();
})
document.getElementById('initialStamina').addEventListener('input', function (evt) {
  saveCharacterStamina();
})
document.getElementById('currentStamina').addEventListener('input', function (evt) {
  saveCharacterStamina();
})
document.getElementById('initialLuck').addEventListener('input', function (evt) {
  saveCharacterLuck();
})
document.getElementById('currentLuck').addEventListener('input', function (evt) {
  saveCharacterLuck();
})
document.getElementById('gold').addEventListener('input', function (evt) {
  saveCharacterGold();
})
document.getElementById('potions').addEventListener('input', function (evt) {
  saveCharacterPotions();
})
document.getElementById('jewels').addEventListener('input', function (evt) {
  saveCharacterJewels();
})
document.getElementById('provisions').addEventListener('input', function (evt) {
  saveCharacterProvisions();
})
document.getElementById('addEncounterBoxes').addEventListener('click', function (evt) {
  makeEncounterCard();
  makeEncounterCard();
})
document.getElementById('reset').addEventListener('click', function (evt) {
  localStorage.clear();
  alert("LocalStorage Cleared");
  location.reload();
})
let gearArray = document.querySelectorAll(".gearItem");
gearArray.forEach(function(elem) {
  elem.addEventListener("input", function() {
    saveCharacterGear();
  });
});
document.querySelector("#encounterBoxes").addEventListener("click", function(e){
  if(e.target.classList.contains("monsterName")){
    let monsterName = prompt("Please enter monsters name", "Rock Grub");
       if (monsterName != null) {
        e.target.innerHTML = monsterName;
        saveMonsterCard(e.target.parentNode);
      }
  }
  
  
  
  if(e.target.classList.contains("encounterSkill")){
        saveMonsterCard(e.target.parentNode);
  }
  if(e.target.classList.contains("encounterStamina")){
        saveMonsterCard(e.target.parentNode);
  }
  if(e.target.classList.contains("encounterText")){
        saveMonsterCard(e.target.parentNode);
  }
});
document.querySelector("#encounterBoxes").addEventListener("input", function(e){
  if(e.target.classList.contains("encounterEntry")){
    saveMonsterCard(e.target.parentNode.parentNode);
  }
  if(e.target.classList.contains("encounterSkill")){
    saveMonsterCard(e.target.parentNode.parentNode);
  }
  if(e.target.classList.contains("encounterStamina")){
    saveMonsterCard(e.target.parentNode.parentNode);
  }
  if(e.target.classList.contains("encounterText")){
    saveMonsterCard(e.target.parentNode);
  }
});




function displayCharacterData(){
  let gamebookTitle = localStorage.getItem('gamebookTitle');
  if(gamebookTitle !== null){
    document.querySelector("#gamebookTitle").value = gamebookTitle;
    displayHintCards(gamebookTitle);
  }
  let lastEntry = localStorage.getItem('lastEntry');
  document.querySelector("#lastEntry").value = lastEntry;
  
  let initialSkill = localStorage.getItem('initialSkill');
  document.querySelector("#initialSkill").value = initialSkill;
  let currentSkill = localStorage.getItem('currentSkill');
  document.querySelector("#currentSkill").value = currentSkill;
  let initialStamina = localStorage.getItem('initialStamina');
  document.querySelector("#initialStamina").value = initialStamina;
  let currentStamina = localStorage.getItem('currentStamina');
  document.querySelector("#currentStamina").value = currentStamina
  
  let initialLuck = localStorage.getItem('initialLuck');
  document.querySelector("#initialLuck").value = initialLuck;
  
  let currentLuck = localStorage.getItem('currentLuck');
  document.querySelector("#currentLuck").value = currentLuck;
  let gold = localStorage.getItem('gold');
  document.querySelector("#gold").value = gold;
  let potions = localStorage.getItem('potions');
  document.querySelector("#potions").value = potions;
  let jewels = localStorage.getItem('gold');
  document.querySelector("#gold").value = gold;
  
  
  
  
  
  let provisions = localStorage.getItem('provisions');
  document.querySelector("#provisions").value = provisions;

  let gearArray = JSON.parse(localStorage.getItem('gear'));
  if(gearArray !== null){
    for(var i=0; i < gearArray.length; i++){
      let gearLine = document.querySelector("#gear" + i);
      gearLine.value = gearArray[i];
    }
  }
  displayEncounterCards();
}
function displayHintCards(gamebook){
  const container = document.querySelector("#hintsContainer");
  let output = "";
  let x = rules[gamebook];
  if(x["combat"]){
    output += `
              <div class="card">
                <h1 class="card--title">Combat</h1>
                <p class="card--text">${x['combat']}</p>
              </div>
              `;
  }
  
  if(x["luck"]){
    output += `
              <div class="card">
                <h1 class="card--title">Luck</h1>
                <p class="card--text">${x['luck']}</p>
              </div>
              `;
  }
  
  if(x["provisions"]){
    output += `
              <div class="card">
                <h1 class="card--title">Provisions</h1>
                <p class="card--text">${x['provisions']}</p>
              </div>
              `;
  }
  container.innerHTML = output;
}
function displayEncounterCards(){
  let encounterArray = JSON.parse(localStorage.getItem('encounterBoxes'));
  if(encounterArray !== null){
    if(isOdd(encounterArray.length)) makeEncounterCard();
    if(encounterArray.length > 0){
      for(var i=0; i < encounterArray.length; i++){
        //for each card
        if(i > 3){
          console.log("encounterArray.length:"+encounterArray.length);
          console.log("i:"+i);
          makeEncounterCard();
        }
        if(encounterArray[i] !== null){
          let encounterBox = document.querySelector("#encounterBox"+i);
          let statsBox = encounterBox.querySelectorAll(".containerB")[0];
          let entryBox = statsBox.querySelectorAll(".encounterEntry")[0];
          entryBox.value = encounterArray[i].entry;
          let monsterNameBox = statsBox.querySelectorAll(".monsterName")[0];
          monsterNameBox.textContent = encounterArray[i].name;
          let skillBox = statsBox.querySelectorAll("p")[1];
          let skillInput = skillBox.querySelectorAll(".encounterSkill")[0];
          skillInput.value = encounterArray[i].skill;
        
          let staminaBox = statsBox.querySelectorAll("p")[2];
          let staminaInput = staminaBox.querySelectorAll(".encounterStamina")[0];
          staminaInput.value = encounterArray[i].stamina;
        
          let textBox = statsBox.querySelectorAll("textArea")[0];
          textBox.textContent = encounterArray[i].text;
        }else{
          console.log("empty card");
        }
      }
    }
  }
}

function saveGamebookTitle(){
  let gamebookTitle = document.querySelector("#gamebookTitle").value;
  localStorage.setItem('gamebookTitle', gamebookTitle);
}
function saveLastEntry(){
  let lastEntry = document.querySelector("#lastEntry").value;
  localStorage.setItem("lastEntry", lastEntry);
}
function saveCharacterSkill(){
  let initialSkill = document.querySelector("#initialSkill").value;
  let currentSkill = document.querySelector("#currentSkill").value;
  localStorage.setItem('initialSkill', initialSkill);
  localStorage.setItem('currentSkill', currentSkill);
}
function saveCharacterStamina(){
  let initialStamina = document.querySelector("#initialStamina").value;
  let currentStamina = document.querySelector("#currentStamina").value;
  localStorage.setItem('initialStamina', initialStamina);
  localStorage.setItem('currentStamina', currentStamina);
}
function saveCharacterLuck(){
  let initialLuck = document.querySelector("#initialLuck").value;
  let currentLuck = document.querySelector("#currentLuck").value;
  localStorage.setItem('initialLuck', initialLuck);
  localStorage.setItem('currentLuck', currentLuck);
}
function saveCharacterGold(){
  let gold = document.querySelector("#gold").value;
  localStorage.setItem('gold', gold);
}
function saveCharacterProvisions(){
  let provisions = document.querySelector("#provisions").value;
  localStorage.setItem('provisions', provisions);
}
function saveCharacterGear(){
  let newGearArray = [];
  let gearArray = document.querySelectorAll(".gearItem");
  gearArray.forEach(function(elem) {
    newGearArray.push(elem.value);
  });
  localStorage.setItem('gear', JSON.stringify(newGearArray));
}
function saveCharacterPotions(){
  console.log("saving potions");
  let potions = document.querySelector("#potions").value;
  localStorage.setItem('potions', potions);
}
function saveCharacterJewels(){
  let jewels = document.querySelector("#jewels").value;
  localStorage.setItem('jewels', jewels);
}





function saveMonsterCard(elem){
  let encounterBox = elem.parentNode;
  let encounterBoxNumber = encounterBox.dataset.number;
  let encounterBoxID = "encounterBox" + encounterBoxNumber;
  let entry = elem.querySelectorAll('p')[0];
  entry = entry.querySelectorAll('input.encounterEntry')[0].value;
  let name = elem.getElementsByClassName("monsterName")[0].textContent;
  let skill = elem.querySelectorAll('p')[1];
  skill = skill.querySelectorAll('input.encounterSkill')[0].value;
  let stamina = elem.querySelectorAll('p')[2];
  stamina = stamina.querySelectorAll('input.encounterStamina')[0].value;
  let text = elem.querySelectorAll('textarea')[0].value;
  
  let cardsArray = JSON.parse(localStorage.getItem("encounterBoxes"));
  
  
  let numECards = getNumberOfEncounterCards();
  //for...do rgat down there
  for(var i=0; i < numECards; i++){
  if(cardsArray === null) cardsArray = []; 
  cardsArray[encounterBoxNumber] = 
  { 
    entry: entry,
    name: name,
    skill: skill,
    stamina: stamina,
    text: text
  }
  }
  localStorage.setItem("encounterBoxes", JSON.stringify(cardsArray));
}







//Prints dice roll to the page
function printNumber(elNumber, number) {
  var placeholder = document.getElementById('placeholder'+elNumber);
  placeholder.src = d6Pics[number-1];
}
function makeEncounterCard(){
  let cardID = getNumberOfEncounterCards();
  let odd;
  if(isOdd(cardID)){
    odd = "Right";
  }else{
    odd = "Left";
  }
  
  let card = document.createElement("div");
  card.id = "encounterBox" + cardID;
  card.dataset.number = cardID;
  card.classList.add("card" + odd, "encounterBox");

  let img = document.createElement('img');
  img.src = "images/ice-golem.png";
  img.alt="Avatar";
  img.classList.add("encounterPic");
  card.appendChild(img);
  
  let statContainer = document.createElement("div");
  statContainer.classList.add("containerB");
  
  let monsterName = document.createElement("h4");
  monsterName.classList.add("monsterName");
  monsterName.textContent = ("Monster Name");
  statContainer.appendChild(monsterName);
  
  let skill = document.createElement("p");
  skill.textContent = ("Skill: ");
  let skillInput = document.createElement("input");
  skillInput.classList.add("encounterSkill");
  skill.appendChild(skillInput);
  statContainer.appendChild(skill);
  
  let stamina = document.createElement("p");
  stamina.textContent = ("Stamina: ");
  let staminaInput = document.createElement("input");
  staminaInput.classList.add("encounterStamina");
  stamina.appendChild(staminaInput);
  statContainer.appendChild(stamina);
  
  let encounterText = document.createElement("textarea");
  encounterText.classList.add("encounterText");
  statContainer.appendChild(encounterText);
  
  card.appendChild(statContainer);
  
  let boxContainer = document.querySelector("#encounterBoxes");
  boxContainer.appendChild(card);
}
function getNumberOfEncounterCards(){
  let cardArray = document.querySelectorAll(".encounterBox");
  return cardArray.length;
}
function isOdd(num){
  let result;
  // Checking if the number is even or odd using modulus operator
  if (num % 2 === 0) {
    result = false;
  } else {
    result = true;
  }
  return result;
}