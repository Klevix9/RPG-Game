var xp = 0;
var health = 100;
var gold = 50;
var currentWeapon = 0;

let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpTtext = document.querySelector("#xpTtext");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged east",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    },
];

const weapons = [
    {
            name: "stick",
            power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];
 
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
    },
    {
		name: "store",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store."
	},
	{
		name: "cave",
		"button text": ["Go to Town", "Go to Cave", "Fight dragon"],
		"button functions": [goTown, goCave, fightDragon],
		text: "You enter the cave. You see some monsters."
	},
    {
		name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, run],
		text: "You are fighting monsters."
	},
    {
        name: "kill monster",
        "button text": ["Go to Town", "Go to Town", "Go to Town"],
        "button functions": [goTown, goTown, goTown],
        text: "Monster died"
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restar, restar, restart],
        text: "You died"
    },
    {
        name: "dragon",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        text: "You are in the town square. You see a sign that says \"store\"!"
    } 
] 

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

	button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText = location.text;
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function goFight(){
    update(locations[3])
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}


function buyHealth(){
    if(gold>10){
        gold -= 10
        health += 10;
        goldText.innerText=gold;
        healthText.innerText=health;    
    }
    else{
        text.innerText="Not enough gold to buy health";
    }
}

function buyWeapon(){
    if(currentWeapon>3){
        if(gold>30){
            gold -= 30
            currentWeapon ++;
            inventory
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon)
            goldText.innerText=gold;
            text.innerText = newWeapon + "purchased.";
            text.innerText += "Inventory = { " + inventory + "}.";
        }
        else{
            text.innerText="Not enough gold to buy weapon";
        }
    }
    else{
        text.innerText = "You already have the best weapon."
        button2.innerText = "Sell weapon for 15 gold.";
        button2.onclick = sellWeapon;
    }

}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        gold.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += "Inventory = { " + inventory + "}.";
    }
    else{
        text.innerText = "You can't sell your only weapon";
    }
}

function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function attack(){
    text.innerText = monsters[fighting].name + " is attacking.";
    text.innerText = "You attack with your " + weapons[currentWeapon].name + " .";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if(health<=0){
        lose();
    }
    else if(monsterHealth<=0){
        if(fighting === 2){

        }
        else{
        defeatMonster();
        }
    }

}

function dodge(){
    if(Math.random%2 == 0){
        text.innerText = "You dodged the attack";
    }
}

function lose(){
    update(locations[5]);
}

function restart(){

}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level) * 6.7;
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpTtext.innerText = xp;
    update(locations[4]);
}