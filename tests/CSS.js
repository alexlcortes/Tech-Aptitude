// CSS
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////
var questions = [{
  question: "What does CSS stand for?",
  answers: ["Content Scrambling System", "Cascading Style Sheet", "Creative Style Sheet", "Computer Style Sheet"],
  correctAnswer: "Cascading Style Sheet"
}, {
  question: "What is the correct CSS Syntax?",
  answers: ["{body:color=black;}", "body {color: black;}", "{body;color:black;}", "body:color=black;"],
  correctAnswer: "body {color: black;}"
}, {
  question: "Which property is used to change the background-color?",
  answers: ["color", "bgcolor", "background-color", "backgroundColor"],
  correctAnswer: "background-color"
}, {
  question: "What is the correct CSS syntax for making all the < p> elements bold?",
  answers: ["p {font-weight:bold;}", "text-transform:capitalize", "text-transform:uppercase", "text: capitalize"],
  correctAnswer: "text-transform:uppercase"
}, {
  question: "How do you make each word in a text start with a capital letter?",
  answers: ["You can't do that with CSS", "p {text-size:bold;}", "list-style: square;"],
  correctAnswer: "p {font-weight:bold;}"
}, {
  question: "How do you make a list that lists its items with squares?",
  answers: ["list: square;", "list-type: square;", "list-style-type: square;", "< p style="text-size:bold;" >"],
  correctAnswer: "list-style-type: square;"
}, {
  question: "How do you group selectors?",
  answers: ["Separate each selector with a comma", "Separate each selector with a plus sign", "Separate each selector with a space", "Not possible with CSS"],
  correctAnswer: "Separate each selector with a comma"
}, {
  question: "When using the padding property; are you allowed to use negative values?",
  answers: ["No", "Yes"],
  correctAnswer: "No"
}, {
  question: "How do you insert a comment in a CSS file?",
  answers: ["// this is a comment", "/* this is a comment */", "// this is a comment //", "' this is a comment'"],
  correctAnswer: "/* this is a comment */"
},{
  question: "What is a declaration in CSS?",
  answers: ["a", "{", ".", ";"],
  correctAnswer: "{"
  
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

//dont know if want this, would want to have it just be times up and then move to the next question and not tell them what the right answer is//
    panel.html('<h2>Out of Time!</h2>');
    // panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    // panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);
//would want this to be amount of correct answers i.e 3+ correct is an beginner, 5+ is a mid and 8+ high end //
    panel.html('<h2>Thank you for completing the HTML Test. Your results are displayed below. </h2>');
    $('#counter-number').html(game.counter);
        if (game.correct < 4) {
      panel.html('<h2> Congratulations you are a Junior CSS Developer! </h2>')
    }; 
     if (game.correct = 5) {
      panel.html('<h2> Congratulations you are a Mid-Level CSS Developer! </h2>')
    }; 
     if (game.correct > 6) {
      panel.html('<h2> Congratulations you are a Senior CSS Developer! </h2>')
    };
    // panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    // panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    // panel.append('<br><button id="start-over">Start Over?</button>');-do not want
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  //dont know if want this
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Thank you please proceed to the next question.</h2>');
    // panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    // panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Thank you please proceed to the next question.</h2>');
    // panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  //would not want a reset
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

//once it tells them how many they got right would want to automatically load to the home page? or test home page?