/* 
Game Setup:

Each player takes turns rolling three dice.
The computer serves as the opponent and also rolls three dice.
Gameplay:

Both the player and the computer roll their dice and calculate the total sum of the numbers rolled.
If the player or the computer reaches a total of 12 points with their dice won,
If both the player and the computer reach 12 points in the same round, it results in a tie,
The game continues until one player reaches a score of 3 points.
Winning Condition:

If the player reaches 12 points, they win the game.
If the computer reaches 12 points,, the player loses the game.
If both the player and the computer both have 12 points at the same time, an additional round is played until a winner is determined.

*/
//define angles of different dice number 
const ANGLE = {
  1: {
    x: 45,
    y: 0,
    z: 65
  },

  2: {
    x: 135,
    y: 45,
    z: 0
   },

  3: {
    x: 135,
    y: 115,
    z: 90
   },

  4: {
    x: 45,
    y: 180,
    z: 65
   },

  5: {
    x: -65,
    y: 45,
    z: 0
  },

  6: {
    x: -65,
    y: 45,
    z: 90
  }
};

    
    //make dice's（cubic class)  num as a array
    let dices = Array.prototype.slice.call(document.querySelectorAll('.cubic')); 
    let speed = 3000;
    let sum = 0; // Define sum as a global variable
    let pcSum = 0; // Define pcSum as a global variable
 

    
    let angleGenerator = () => {
      let factor = Math.floor(Math.random() * 6 + 1 ); //(test the angle in browser) to get numbers from 1 - 6
      let { x, y, z} = ANGLE[factor];
      return {
        x: x + 3600, 
        y: y + 3600,
        z: z + 3600,
        num: factor // get the dice number
      };   
    };
    
    
    //player's turn to play
    let playerPlay = () => {
      let nums = [ ]; // put the dice's number in an array

      dices.forEach(dice => {
        let { x, y, z, num } = angleGenerator();

        setTimeout(() => {
          // request render 
          dice.style.cssText = 
                            `transition-duration: ${speed}ms;
                             transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);`;
          nums.push(num); // push the num into the nums array
          if (nums.length === dices.length) {
              // 所有骰子都投掷完成(after all the dice was done rotation)
              sum = nums.reduce((total, currentNum) => total + currentNum, 0); // 数字相加求和，start from 0, adding nums to sum 
              setTimeout(function() {gamePrompt.textContent = `You Got ${sum} !!!`},speed);
              setTimeout(function() {gameTxt.textContent = `Now it's the conputuer's turn`},speed);
            }
        }, 30);
      });
    };
    
   

//computer's turn to play
    let pcAngleGenerator = () => {
      let factor = Math.floor(Math.random() * 6 + 1);
      let { x, y, z } = ANGLE[factor];
      return {
        x: x+1800,
        y: y+1800,
        z: z+1800,
        num: factor
      };
    };
    
 
    let pcPlay = () => {
      let nums = [ ]; // put the dice's number in an array for
        
      dices.forEach(dice=> {
        let { x, y, z, num } = pcAngleGenerator();
    
        setTimeout(() => {
          // request render 
          dice.style.cssText = 
                           `transition-duration: ${speed}ms;
                            transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);`;
          nums.push(num); // push the num into the nums array

          if (nums.length === dices.length) {
              // 所有骰子都投掷完成(after all the dice was done rotation)
              pcSum = nums.reduce((total, currentNum) => total + currentNum, 0); // 数字相加求和，start from 0, adding nums to sum 
              setTimeout(function() {gamePrompt.textContent = `Computer Got ${pcSum}`},2800);
              gameTxt.textContent = " ";
            }
        }, 30);
      });
    };


    // check win condition
    function checkWin(){
      setTimeout(function() {
        if (sum != 12 && pcSum == 12) {
          window.alert(`You lost! computer Win!`);
        } else if (sum == 12 && pcSum != 12) {
          window.alert(`You Win! computer lost!`);
        } else if (sum != 12 && pcSum != 12) {
          continueBtn.disabled = false; 
          window.alert("Click continue to determine the winner!"); 
        } else if (sum == 12 && pcSum == 12) {
          continueBtn.disabled = false; 
          window.alert("Click continue to determine the winner!"); 
        }
      }, 8000);
}




// Function to start the game when the play button is clicked
function playGame() {
  playerPlay();
  playSoundEffect()
  setTimeout("pcPlay()",5000)
  checkWin();
  playBtn.disabled = true; // Disable the play button once the game starts
} 


let rollingSound = document.getElementById("rollingMusic");

function playSoundEffect(){
  rollingSound.play();
  // rollingSound.loop = true;
}



const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);

const continueBtn = document.getElementById('continueBtn');
continueBtn.addEventListener('click', playGame);

var gamePrompt = document.querySelector('h2');

var gameTxt = document.querySelector('h3');

 


/* reset = () => {
        dices.forEach(dice => { 
          dice.style.cssText = ''; 
        });

        const continueBtn = document.getElementById('continueBtn');
        continueBtn.addEventListener('click', ContinueGame);
  
        function ContinueGame() {
          callback();
          pcPlay();
        }
        // make the "continue btn" clickable (enabled)
        // add a new "continue" btn
        // clikcing "continue" called pcPlay
      }
       */


//add background music option
let bgMusic = document.getElementById("bg-music");

// playmusic 
let playMusic = document.getElementById("playMusic");
playMusic.addEventListener("click", function() {
    bgMusic.play();
    bgMusic.loop = true;
});

// pausemusic
let pauseMusic = document.getElementById("pauseMusic");
pauseMusic.addEventListener("click", function() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
});

// document.addEventListener("DOMContentLoaded", function() {
//   setTimeout(() => {
//       bgMusic.play();
//       console.log("playing")
//   }, 1000)
// });
