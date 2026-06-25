//Variables
let turnsX = [];
let turnsO = [];
let turnO = true;
let win = false;
let XwinCount = 0;
let OwinCount = 0;

let xScore = document.querySelector(".xScor span")
let oScore = document.querySelector(".oScor span")

const buttons = document.querySelectorAll(".btn");
const winText = document.querySelector(".winText");
const play = document.querySelector(".playAgain");
const reset = document.querySelector(".resetScore");
const winLine = document.querySelector(".winLine");

const btnSound = new Audio("./ting.mp3");
const clickSound = new Audio("./pup.wav");

const winPatterns = [
  [0, 1, 2, 0, 27, 0],
  [3, 4, 5, 0, 88, 0],
  [6, 7, 8, 0, 150, 0],
  [0, 3, 6, 30, 0, 90],
  [1, 4, 7, 90, 0, 90],
  [2, 5, 8, 150, 0, 90],
  [0, 4, 8, 26, 25, 45],
  [2, 4, 6, 154, 25, 135]
]

//Functions
function scoreUpdate(){
  xScore.textContent = `${XwinCount}`;
  oScore.textContent = `${OwinCount}`;
}

function checkWin() {
  for (const pattern of winPatterns) {
    if (buttons[pattern[0]].textContent !== "" && buttons[pattern[0]].textContent === buttons[pattern[1]].textContent && buttons[pattern[1]].textContent === buttons[pattern[2]].textContent) {
      winText.textContent = `${buttons[pattern[0]].textContent} wins`;
      win = true;

      winLine.style.transform = `translate(${pattern[3]}px, ${pattern[4]}px) rotate(${pattern[5]}deg)`
      winLine.style.width = `100%`;

      if(buttons[pattern[0]].textContent === "X"){
        XwinCount++;
      } else {
        OwinCount++;
      }

      scoreUpdate();

      buttons.forEach((btn)=>{
        btn.disabled = true;
      })
    }
  }
}

buttons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    btnSound.currentTime = 0;
    btnSound.play();

    if (turnO == true) {
      btn.style.color = "#008fff";
      btn.style.textShadow = "1px 1px 3px #008fff";

      if (turnsO.length < 3) {
        btn.textContent = "O";
        turnsO.push(btn);
        btn.disabled = true;
        checkWin();
      } else {
        btn.textContent = "O";
        turnsO.push(btn);
        btn.disabled = true;
        checkWin();
        if (!win) {
          let oldbtn = turnsO.shift();
          oldbtn.textContent = "";
          oldbtn.disabled = false;
        }
      }

      turnO = false;
    } else {
      btn.style.color = "#f70000";
      btn.style.textShadow = "1px 1px 3px #f70000";

      if (turnsX.length < 3) {
        btn.textContent = "X";
        turnsX.push(btn);
        btn.disabled = true;
        checkWin();
      } else {
        btn.textContent = "X";
        turnsX.push(btn);
        btn.disabled = true;
        checkWin();
        if (!win) {
          let oldbtn = turnsX.shift();
          oldbtn.textContent = "";
          oldbtn.disabled = false;
        }
      }

      turnO = true;
    }
  })
})

play.addEventListener("click", ()=>{
  clickSound.currentTime = 0;
  clickSound.play();

  winLine.style.width = `0`;

  buttons.forEach((btn)=>{
    btn.disabled = false;
    btn.textContent = "";
    turnO = true;
    win = false;
    turnsO.length = 0;
    turnsX.length = 0;
    winText.textContent = "";
  })
})

reset.addEventListener("click", ()=>{
  clickSound.currentTime = 0;
  clickSound.play();

  OwinCount = 0;
  XwinCount = 0;
  xScore.textContent = "0";
  oScore.textContent = "0";
})
