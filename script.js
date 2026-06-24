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
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
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
    if (turnO == true) {
      btn.style.color = "#008fff";
      btn.style.textShadow = "1px 1px 3px #008fff";

      if (turnsO.length < 3) {
        btn.textContent = "O";
        turnsO.push(btn);
        btn.disabled = true;
      } else {
        btn.textContent = "O";
        turnsO.push(btn);
        btn.disabled = true;
        if (!win) {
          let oldbtn = turnsO.shift();
          oldbtn.textContent = "";
          oldbtn.disabled = false;
        }
      }

      turnO = false;
      checkWin();
    } else {
      btn.style.color = "#f70000";
      btn.style.textShadow = "1px 1px 3px #f70000";

      if (turnsX.length < 3) {
        btn.textContent = "X";
        turnsX.push(btn);
        btn.disabled = true;
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
      checkWin();
    }
  })
})

play.addEventListener("click", ()=>{
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
  OwinCount = 0;
  XwinCount = 0;
  xScore.textContent = "0";
  oScore.textContent = "0";
})