var gamePrompt = require('game-prompt');

// Global variables
var playerName;
var vehicleName;
var planets = [
	{
		name: '(E)arth',
		distance: 10,
	},
	{
		name: '(M)esnides',
		distance: 20
	},
	{
		name: '(L)aplides',
		distance: 50
	},
	{
		name: '(K)iyturn',
		distance: 120,
	},
	{
		name: '(A)enides',
		distance: 25
	},
	{
		name: '(C)ramuthea',
		distance: 200
	},
	{
		name: '(S)meon T9Q',
		distance: 400
	},
	{
		name: '(G)leshan 7Z9',
		distance: 85
	}
];
var currentFuel = 1000;
var questions = ['Ask about (A)rtifact', 'Ask about other (P)lanets', '(L)eave'];
var inventory = [];

//Game intro
function startGame() {
	gamePrompt('S.R.V.S.' + ' Press ENTER to start', intro);
};

function intro() {
	gamePrompt('You are the captain of a Solo Research Space Vehicle (S.R.S.V.) on an expedition to explore foreign ' + 
		'planets. Your mission is to make contact with three alien life forms, acquire an artifact representative of ' +
		'their culture, and bring back your findings to Earth.', collectInfo);
};

function collectInfo() {
	gamePrompt([
		'A voice comes on over the intercom.',
		'"Please state your name for identity verification."'
		], collectName);
};

//Get player name
function collectName(name) {
	playerName = name;

	gamePrompt([
		'"Thank you Captain ' + playerName + '."',
		'"Please state your vehicle name for identity verification.'
		], collectVehicleName);
};

//Get vehicle name
function collectVehicleName(name) {
	vehicleName = name; 
	gamePrompt('"Thank you, Captain ' + playerName + '. ' + vehicleName + ' has 1000 gallons of fuel. Each gallon will let you travel 1 lightyear."', travelWhere);
};

//Choose destination
function travelWhere() {
	gamePrompt(['Where to Captain ' + playerName + '?\n' + listPlanets(planets)], navigate);
};

function listPlanets(planets){
    var planetsString = '';
    planets.forEach(function(planet){
        planetsString += planet.name + ' ' + planet.distance + ' light years \n';
    });
    return planetsString;
};

//This function will modify the global currentFuel variable throughout the game.
function calculateFuel(index) {
    if (currentFuel <= 0) {
        gamePrompt('Sorry. You have run out of fuel before finding all of the artifacts and returning to Earth. You lose.');
        process.exit();
    } else {
        return currentFuel -= planets[index].distance;
    }
};

//Choose which planet to navigate to based on player response.
function navigate(destination) {
  var destinationLowerCase = destination.toLowerCase();

  if (destinationLowerCase === 'e' || destinationLowerCase === 'earth') {
    flyToEarth();

  } else if (destinationLowerCase === 'm' || destinationLowerCase === 'mesnides') {
	calculateFuel(1);

    gamePrompt([
    	'Flying to Mesnides...', 
    	'You used ' + planets[1].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToMesnides);

  } else if (destinationLowerCase === 'l' || destinationLowerCase === 'laplides') {
	calculateFuel(2);

    gamePrompt([
    	'Flying to Laplides...', 
    	'You used ' + planets[2].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToLaplides);

  } else if (destinationLowerCase === 'k' || destinationLowerCase === 'kiyturn') {
	calculateFuel(3);

    gamePrompt([
    	'Flying to Kiyturn...', 
    	'You used ' + planets[3].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToKiyturn);

  } else if (destinationLowerCase === 'a' || destinationLowerCase === 'aenides') {
	calculateFuel(4);

    gamePrompt([
    	'Flying to Aenides...', 
    	'You used ' + planets[1].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToAenides);

  } else if (destinationLowerCase === 'c' || destinationLowerCase === 'cramuthea') {
	calculateFuel(5);

    gamePrompt([
    	'Flying to Cramuthea...', 
    	'You used ' + planets[5].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToCramuthea);

  } else if (destinationLowerCase === 's' || destinationLowerCase === 'smeon') {
	calculateFuel(6);

    gamePrompt([
    	'Flying to Smeon...', 
    	'You used ' + planets[6].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToSmeon);

  } else if (destinationLowerCase === 'g' || destinationLowerCase === 'gleshan') {
	calculateFuel(7);

    gamePrompt([
    	'Flying to Gleshan...', 
    	'You used ' + planets[7].distance + ' gallons of fuel. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.'
    	], flyToGleshan);

  } else {
    gamePrompt('Hmmm... that is not a known destination.', travelWhere);
  };
};

//Earth path
function flyToEarth() {
	if (inventory.length < 3) {
		gamePrompt('Welcome to Earth. You have found ' + inventory.length + ' artifacts. You must find 3 artifacts to win the game.', fuel10);
	} else {
		gamePrompt('Congratulations! You found all three artifacts and won the game!');
		process.exit();
	};
};

function fuel10() {
	currentFuel += 10;
	gamePrompt('You have were able to refuel 10 gallons. The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.', travelWhere);
}

//Mesnides path
function flyToMesnides() {
	gamePrompt([
		'You\'ve arrived at Mesnides. As you land, a representative of the Mesnidian people is there to greet you.', 
		'"Welcome, traveler, to Mesnides."'
		], mesnidesPath);
};

function mesnidesPath() {
	gamePrompt(['"How can we assist you?"\n' + listQuestions(questions)], mesnidesAnswer);
};

//This question list should be useable for any planet that is both inhabited and friendly
function listQuestions(things) {
		var questionList = ''
		questions.forEach(function (question) {
			questionList += question += '\n';
		})
		return questionList;
};

function mesnidesAnswer(answer) {
	var answerLowerCase = answer.toLowerCase();

  if (answerLowerCase === 'a' || answerLowerCase === 'artifact') {
    mesnidesArtifact();
  } else if (answerLowerCase === 'p' || answerLowerCase === 'planets') {
    mesnidesPlanets();
  } else if (answerLowerCase === 'l' || answerLowerCase === 'leave') {
    travelWhere();
  } else {
    gamePrompt('Hmmm... that is not a valid answer.', mesnidesPath);
  };
};

function mesnidesArtifact() {
	gamePrompt('"Here, take this Myoin Horn, an ancient Mesnidian instrument."', addHornToInventory);
};

function addHornToInventory() {
	inventory.push('Myoin Horn');
	gamePrompt('Myoin Horn added to inventory.', mesnidesPath);
};

function mesnidesPlanets() {
	gamePrompt('"Well, Laplides suffered from atomic war and has been uninhabited for centuries. You would do well to avoid it on your journey."', mesnidesPath);
};

//Laplides path
function flyToLaplides() {
	gamePrompt('You enter orbit around Laplides. Looking down at the planet, you see signs of atomic war and realize there is no option but to turn around.', travelWhere);
};

//Kiyturn path
function flyToKiyturn() {
	gamePrompt('You\'ve arrived at Kiyturn. As you land, a representative of the Kiyturn people is there to greet you.', kiyturnPath);
};

function kiyturnPath() {
		gamePrompt(['"Hello, what brings you to Kiyturn? You\'re not here to cause trouble are you?"\n' + listQuestions(questions)], kiyturnAnswer);
};

function kiyturnSecondPath() {
	gamePrompt(['"How can we assist you?"\n' + listQuestions(questions)], kiyturnAnswer);
}

function kiyturnAnswer(answer) {
	var answerLowerCase = answer.toLowerCase();

  if (answerLowerCase === 'a' || answerLowerCase === 'artifact') {
    kiyturnArtifact();
  } else if (answerLowerCase === 'p' || answerLowerCase === 'planets') {
    kiyturnPlanets();
  } else if (answerLowerCase === 'l' || answerLowerCase === 'leave') {
    travelWhere();
  } else {
    gamePrompt('Hmmm... that is not a valid answer.', kiyturnPath);
  };
};

function kiyturnArtifact() {
	gamePrompt('"Here, take this Kiyturn Glass Bowl, a symbol of our civilization."', addBowlToInventory);
};

function addBowlToInventory() {
	inventory.push('Kiyturn Glass Bowl');
	gamePrompt('Kiyturn Glass Bowl added to inventory.', kiyturnSecondPath);
};

function kiyturnPlanets() {
	gamePrompt('"I\'m sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery."', kiyturnSecondPath);
};

//Aenides path
function flyToAenides() {
	gamePrompt('You discover upon arrival to Aenides that they are a hostile people. You attempt to land, but they begin to fire upon your S.R.S.V. and you are forced to retreat.', travelWhere);
};

//Cramuthea path
function flyToCramuthea() {
	gamePrompt('Cramuthea has been abandoned due to global environmental disaster, but there are remnants of the people that left. You are able to refuel your ship (+500 gallons)', fuel500);
};

function fuel500() {
	currentFuel += 500;
	gamePrompt(['The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.', 'You see a beacon signal that tells you the Cramuthean people have migrated to Smeon T9Q.'], travelWhere);
};

//Smeon T9Q path
function flyToSmeon() {
	gamePrompt('The Cramuthean people, living on Smeon T9Q, are a friendly people that give you some fuel (+100 gallons) when you arrive.', fuel100);
};

function fuel100() {
	currentFuel += 100;
	gamePrompt(['The ' + vehicleName + ' now has ' + currentFuel + ' gallons of fuel.', '"Welcome, traveler, to Smeon T9Q."'],  smeonPath)
};

function smeonPath() {
	gamePrompt(['"How can we assist you?"\n' + listQuestions(questions)], smeonAnswer);
};

function smeonAnswer(answer) {
	var answerLowerCase = answer.toLowerCase();

  if (answerLowerCase === 'a' || answerLowerCase === 'artifact') {
    smeonArtifact();
  } else if (answerLowerCase === 'p' || answerLowerCase === 'planets') {
    smeonPlanets();
  } else if (answerLowerCase === 'l' || answerLowerCase === 'leave') {
    travelWhere();
  } else {
    gamePrompt('Hmmm... that is not a valid answer.', smeonPath);
  };
};

function smeonArtifact() {
	gamePrompt('"Here, take this dried Cramun Flower from our home planet"', addFlowerToInventory);
};

function addFlowerToInventory() {
	inventory.push('Cramun Flower');
	gamePrompt('Cramun Flower added to inventory.', smeonPath);
};

function smeonPlanets() {
	gamePrompt('"Beware the people of Aenides. They once tried to take over our home planet by force."', smeonPath);
};

//Gleshan plath
function flyToGleshan() {
	gamePrompt([
		'You\'ve arrived at Gleshan 7Z9. A member of the Gleshan pepole is there to greet you.', 
		'"Welcome, traveler, to Gleshan."'
		], gleshanPath);
};

function gleshanPath() {
	gamePrompt(['"How can we assist you?"\n' + listQuestions(questions)], gleshanAnswer);
};

function gleshanAnswer(answer) {
	var answerLowerCase = answer.toLowerCase();

  if (answerLowerCase === 'a' || answerLowerCase === 'artifact') {
    gleshanArtifact();
  } else if (answerLowerCase === 'p' || answerLowerCase === 'planets') {
    gleshanPlanets();
  } else if (answerLowerCase === 'l' || answerLowerCase === 'leave') {
    travelWhere();
  } else {
    gamePrompt('Hmmm... that is not a valid answer.', gleshanPath);
  };
};

function gleshanArtifact() {
	gamePrompt('"We are a poor people. We do not have an artifact to give you."', gleshanPath);
};

function gleshanPlanets() {
	gamePrompt('"There is a wealthy people, the Cramuthean that once visited Gleshan 7Z9."', gleshanPath);
};

startGame();