var round = 0;
var score = 0;
var wins = 0;
var losses = 0;
var count;
var timerId;
var highScore = 0;
var counter = 8;
var triviaQuestions = [
	{question:"How many different flags have flown over Texas?",
	answers:["Three","Five","Six","Four"],
	correct:2,
	image:"sixflagsoftexas.png"},

	{question:"What officially ended the Texas Revolution and the war between Mexico and Texas?",
	answers:["Treaties of Velasco","Massacre at Goliad","Mexico's victory at the Alamo","Texas signing a Declaration of Indepenence"],
	correct:0,
	image:"treaty.jpg"},

	{question:"Who was the first known European to set foot in Texas?",
	answers:["Coronado", "Alonso Alvarez de Pineda", "Cabeza de Vaca", "La Salle"],
	correct:2,
	image:"cabeza.png"},

	{question:"With whom did William B. Travis share command of Texas forces at the battle of the Alamo?",
	answers:["Stephen F. Austin", "James Bowie", "Juan Seguin", "Mirabeau B. Lamar"],
	correct:1,
	image:"bowie.jpg"},

	{question:"The Nickname given to Sam Houston by the Cherokee Indians was?",
	answers:["Running Dear", "Ten Bears", "Big Ox", "Black Raven"],
	correct:3,
	image:"raven.jpg"},

	{question:"Who wrote the Texas Declaration of Independence?",
	answers:["Lorenzo de Zavala", "Stephen F. Austin", "George Childress", "Sam Houston"],
	correct:2,
	image:"childress.jpg"},

	{question:"Which Texas Revolution battle featured a cannon with the words 'Come and Take It' attached?",
	answers:["San Jacinto", "Gonzales", "The Alamo", "Velasco"],
	correct:1,
	image:"gonzales.jpg"},

	{question:"What is the state pepper of Texas?",
	answers:["Poblano", "Bell", "Jalapeno", "Habanero"],
	correct:2,
	image:"jalapenos.jpg"},

	{question:"What is the state motto?",
	answers:["Friendship", "Brotherhood", "Loyalty", "Lone Star Pride"],
	correct:0,
	image:"friendship.jpg"}, 

	{question:"What is the state vegetable?",
	answers:["Asparagus", "Broccoli", "Sweet Onion", "Okra"],
	correct:2,
	image:"oniond.jpg"},

	{question:"What is the state fruit?",
	answers:["Pecos Melon", "Red Grapefruit", "Prickly Pear", "Blueberry"],
	correct:1,
	image:"grapefruit.png"},  

	{question:"What is the official dish of Texas?",
	answers:["Enchiladas", "Steak and Potatoes", "Chicken Pot Pie", "Chili"],
	correct:3,
	image:"chili.jpg"},

	{question:"What is the official state dance?",
	answers:["Square Dance", "Waltz", "Texas Two-Step", "Cotton-Eyed Joe"],
	correct:0,
	image:"squareDance.jpg"}      //add comma for more question
];




function correctAnswer() {
	wins++;
	$("#message").html("You Are Correct");
	$("#correctDisplay").html(wins);
	updateAnswer();
}  //correctAnswer function

function incorrectAnswer() {
	losses++;
	$("#message").html("You Are Incorrect");
	$("#incorrectDisplay").html(losses);
	updateAnswer();
}  //incorrectAnswer function


function updateAnswer() {
	clearInterval(timerId);
	$("#counter").empty();
	displayImage = "assets/images/" + triviaQuestions[count].image;
	$("#questionImage").attr("src", displayImage);
	$("#timeBar").hide();
	$("#answers").hide();
	$("#questionImage").animate().fadeIn(1000);
	$("#correctAnswer").show();
	var correctPick = triviaQuestions[count].correct
	$("#correctAnswer").html("Correct Answer is " + triviaQuestions[count].answers[correctPick])


	if (round == triviaQuestions.length) {
		endGame();
	} else {
		setTimeout(nextQuestion, 4000);	
	}

}


function endGame() {
	$("#triviaBox").hide();
	$("#resultsBox").show();

	$("#resultsCorrect").html(wins);
	$("#resultsIncorrect").html(losses);

	var percentage = [([wins*1] * 100) / ([losses+wins]*1)];
	$("#percentage").html(percentage);

	if (percentage >= 70) {
		$("#resultsMessage").html("Congratulations, You Passed!!");
		$("#resultsImage").attr("src", "assets/images/texas-flag2.jpg");
		$("#resultsImage").animate().fadeIn(1000);
	} else {
		$("#resultsMessage").html("You Failed.  Please Leave Texas");
		$("#resultsImage").attr("src", "assets/images/catgiphy.mp4");
		$("#resultsImage").animate().fadeIn(1000);
	}
}




function nextQuestion() {
	round++;
	count = round - 1
	counter = 8;
	
	console.log("Round #: " + round);

	$("#correctAnswer").hide();
	$("#timeBar").show();
	$("#message").empty();
	$("#questionImage").hide();
	$("#questionNo").html(round);
	$("#question").animate().fadeIn(1000);
	$("#answers").animate().fadeIn(1000);

	$("#question").html(triviaQuestions[count].question);
	$("#0").html(triviaQuestions[count].answers[0]);
	$("#1").html(triviaQuestions[count].answers[1]);
	$("#2").html(triviaQuestions[count].answers[2]);
	$("#3").html(triviaQuestions[count].answers[3]);


	var correctPick = triviaQuestions[count].correct
	console.log("Correct Answer: " + triviaQuestions[count].answers[correctPick]);


	startTimer();


	

}





function startTimer() {
    timerId = setInterval(updateTime, 1000);
}  //startTimer

function updateTime() {
	$("#counter").text(counter + " seconds")
	counter--
	if (counter === 0) {
		incorrectAnswer();
		clearInterval(timerId);
		$("#message").html("Time's Up");
	}  //if (counter)
}  //updateTime




$(document).ready(function() {
	$("#resultsBox").hide();
	$("#statusBar").hide();
	$("#triviaBox").hide();
	$("#questionImage").hide();
	$("#correctAnswer").hide();
	$("#startButton").on("click", function() {
		$("#statusBar").animate().fadeIn(1000);
		$("#triviaBox").animate().fadeIn(1000);
		$("#startPlay").hide();

		//
		console.log(triviaQuestions.length);
		//

		nextQuestion();

	}) //startButton on click

	$(".pick").on("click", function() {
		var userGuess = $(this).attr("id");

		if (userGuess == triviaQuestions[count].correct) {
			correctAnswer();
		} else {
			incorrectAnswer();
		}
	}) //pick on click
	$(".pick").hover(function() {
		$(this).css("background-color", "blue",);
	}, function() {
		$(this).css("background-color", "");
	});  //pick hover function


})  //document ready















