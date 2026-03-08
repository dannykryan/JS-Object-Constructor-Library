// Object Constructors

// In the example below, I’ve created a function that takes an array of people
// and constructs an object for each one with a randomly assigned job role.


// const peopleArr = ["john", "jack", "mary"]
// const jobRoleArr = ["software developer", "sous chef", "double agent"]

// function jobAssigner(name, job) {
// 	this.name = name;
// 	this.job = job;
// }

// const employees = []

// peopleArr.forEach(person => {
//   const jobRole = jobRoleArr[Math.floor(Math.random() * jobRoleArr.length)];
// 	const employee = new jobAssigner(person, jobRole);
// 	employees.push(employee);
// })

// console.log(employees);

function Fella(name, job, temperament) {

	// error handling:
	if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  
	this.name = name;
	this.marker = job;
	this.temperament= temperament;
	this.greeting = function() {
    if (temperament === "aggressive") {
      console.log(`I'm ${this.name} and I'm a ${job}. What's it to you?`)
    } else if (temperament === "calm") {
      console.log(`Hey there! I'm ${this.name} and I'm a ${job}!`);
    } else {
      console.log(`Hello, I'm ${this.name} and I work as a ${job}.`);
    }
	};
}

const frank = new Fella("Frank", "Debt Collector", "aggressive");
const michelle = new Fella("Michelle", "Horse Whisperer", "calm");
const dave = new Fella("Dave", "Horse Whisperer");

frank.greeting();
michelle.greeting();
dave.greeting();

Fella.prototype.sayFarewell = function() {
	if (this.temperament === "aggressive") {
		console.log("Get the hell out of here, now!")
	} else {
		console.log(`Goodbye!`)
	}
};

frank.sayFarewell();
michelle.sayFarewell();
dave.sayFarewell();

console.log(frank.valueOf()); // Returns the object itself


// Add a method to the pre-defined Fella constructor
Fella.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}!`);
};

// Define a new constructor
function Player(name, marker) {
	this.name = name;
	this.marker = marker;
}

Player.prototype.getMarker = function() {
	console.log(`My marker is "${this.marker}"`);
}

Object.getPrototypeOf(Fella.prototype) // returns Object.prototype

// Now make Player object inherit fom Fella
Object.setPrototypeOf(Player.prototype, Fella.prototype);
Object.getPrototypeOf(Player.prototype); // returns Fella.prototype

const player1 = new Player("Bob", "X");
const player2 = new Player("Jerry", "O");

player1.sayName();
player2.sayName();

player1.getMarker();
player2.getMarker();