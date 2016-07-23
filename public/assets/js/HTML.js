// HTML
var panel = $('#quiz-area');
var countStartNumber = 10;


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
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">15</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////
var questions = [{
  question: "What does HTML stand for?",
  answers: ["Hit The Mother Load", "How To Make Language", "Hypertext Markup Language", "Hyper Text Media Language"],
  correctAnswer: "Hypertext Markup Language"
},{
  question: "What common tag is used for a logical container?",
  answers: ["< container > < / container >", "< body > < / body >", "< div > < / div >", "< logicContainer > < / logicContainer >"],
  correctAnswer: "< div > < / div >"
}, {
  question: "Which HTML attribute is used to define inline styles?",
  answers: ["Font", "Styles", "Style", "Class"],
  correctAnswer: "Styles"
},{
  question: "In HTML5, which method is used to get the current location of a user?:",
  answers: ["getUserPosition()", "getCurrentPosition()", "getPosition()", "getCurrentUserPosition()"],
  correctAnswer: "getCurrentPosition()"
},{
  question: "Which input type defines a slider control?",
  answers: ["range", "slider", "search", "controls"],
  correctAnswer: "range"
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
      panel.append('<button class="answer-button button success" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
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
      setTimeout(game.results, 1000);
    } else {
      setTimeout(game.nextQuestion, 1000);
    }
  },
  results: function() {
    clearInterval(timer);
//would want this to be amount of correct answers i.e 3+ correct is an beginner, 5+ is a mid and 8+ high end //
    panel.html('<h5 class="heading_bg">Thank you for completing the HTML Test. Your results are displayed below. </h5>');
    $('#counter-number').html(game.counter);
        if (game.correct < 3) {
      panel.html('<h5 class="heading_bg"> Congratulations you are a Junior HTML Developer! </h5>' + '<br> <button class="button success"><a href="/employee_profile">Return to Profile</a></button>')
      game.passOnInfo({level: 'Junior'});
    }; 

     if (game.correct == 4) {
      panel.html('<h2> Congratulations you are a Mid-Level HTML Developer! </h2>' + '<br> <button class="button success"><a href="/employee_profile">Return to Profile</a></button>')
      game.passOnInfo({level: 'Mid-Level'});
    }; 
     if (game.correct > 5) {
      panel.html('<h5 class="heading_bg"> Congratulations you are a Senior HTML Developer! </h5>' + '<br> <button class="button success"><a href="/employee_profile">Return to Profile</a></button>')
      game.passOnInfo({level: 'Senior'});
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
      setTimeout(game.results,  1000);
    } else {
      setTimeout(game.nextQuestion,  1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Thank you please proceed to the next question.</h2>');
    // panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results,1000);
    } else {
      setTimeout(game.nextQuestion,  1000);
    }
  },
  //would not want a reset
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  },

  passOnInfo: function(level){
    var currentURL = window.location.origin;
    $.post(currentURL + "/html_test_post", level, function(data){
      });
  }
};

//once it tells them how many they got right would want to automatically load to the home page? or test home page?