AFRAME.registerComponent("game-play", {
  schema: {
  //component is a string default of ring1
    elementId: { type: "string", default: "#ring1" },
  },

  init: function () {
    //the length/duration of the timer is 320 seconds
    var duration = 315;
    //timer element is assigned the element "#timer"
    var timerEl = document.querySelector("#timer");
    //the timer will start with the duration as assigned by the variable and use the element timer
    this.startTimer(duration, timerEl);
  },

  update: function () {
    this.isCollided(this.data.elementId);
  },
  //starting the timer, need the values of variables duration and timerEl
  startTimer: function (duration, timerEl) {
    //local variables
    var minutes;
    var seconds;
    //set interval takes two values:
    //the first one counts down the timer
    //the second one sets the interval
    //in this case the interval is every 1000 miliseconds
    setInterval(()=> {
      //if the duration is greater than or equal to zero
      if (duration >=0) {
        //minutes are converted to minutes
        minutes = parseInt(duration / 60);
        // % will take the largest whole number value, because of the interval there won't always be whole numbers
        seconds = parseInt(duration % 60);
        //if minutes are less than ten leave them in the one's place,
        //if the minutes are greater than ten, write them as the ten's place and then the one's place
        //same for seconds
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        //the text value is : displayed as minutes:seconds
        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });
        //the duration is subtracted every time the function is run
        duration -= 1;
      } 
      //if the duration value is less than 0
      //the game over function is called
      else {
        this.gameOver();        
      }
    },1000)
  },
  isCollided: function (elemntId) {
    var element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false);
        this.updateScore();
        this.updateTargets();
      } 
      else {
        this.gameOver();
      }
    });
  },
  updateTargets: function () {
    var element = document.querySelector("#targets");
    var count = element.getAttribute("text").value;
    var currentTargets = parseInt(count);
    currentTargets -= 1;
    element.setAttribute("text", {
      value: currentTargets,
    });
  },
  updateScore: function () {
    var element = document.querySelector("#score");
    var count = element.getAttribute("text").value;
    var currentScore = parseInt(count);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore,
    });
  },
  gameOver: function () {
    var planeEl = document.querySelector("#plane_model");
    var element = document.querySelector("#game_over_text");
    element.setAttribute("visible", true);
    planeEl.setAttribute("dynamic-body", {
      mass: 1
    });
  },
});
