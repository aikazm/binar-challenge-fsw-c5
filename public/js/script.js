const playerBatu = document.getElementById("player-batu");
const playerKertas = document.getElementById("player-kertas");
const playerGunting = document.getElementById("player-gunting");

const compBatu = document.getElementById("comp-batu");
const compKertas = document.getElementById("comp-kertas");
const compGunting = document.getElementById("comp-gunting");

const result = document.getElementById("result");
const reloadBtn = document.getElementById("reload");

class Game {
  constructor(compShuffle, compChoices, game_output, result_showing) {
    this.compShuffle = compShuffle;
    this.compChoices = compChoices;
    this.game_output = game_output;
    this.result_showing = result_showing;
  }

  compChoose() {
    const compShuffle = ["ROCK", "PAPER", "SCISSORS"];
    this.compChoices = compShuffle[Math.floor(Math.random() * compShuffle.length)];
  }

  resultOutput() {
    if (this.playerChoices == this.compChoices) {
      this.game_output = "Draw";
      this.result_showing = "DRAW";
      this.gameResult();
    } else if ((this.playerChoices === "ROCK" && this.compChoices === "SCISSORS") || (this.playerChoices === "SCISSORS" && this.compChoices === "PAPER") || (this.playerChoices === "PAPER" && this.compChoices === "ROCK")) {
      this.game_output = "PlayerWin";
      this.result_showing = "PLAYER 1 WIN";
      this.gameResult();
    } else {
      this.game_output = "ComputerWin";
      this.result_showing = "COM WIN";
      this.gameResult();
    }
  }

  //output
  gameResult() {
    result.classList.remove("vs");
    result.classList.add(this.game_output);
    result.innerHTML = this.result_showing;
    console.log(this.result_showing);
  }

  refresh() {
    reloadBtn.addEventListener("click", () => {
      playerBatu.style.pointerEvents = "auto";
      playerKertas.style.pointerEvents = "auto";
      playerGunting.style.pointerEvents = "auto";

      playerBatu.style.backgroundColor = "transparent";
      playerKertas.style.backgroundColor = "transparent";
      playerGunting.style.backgroundColor = "transparent";
      compBatu.style.backgroundColor = "transparent";
      compKertas.style.backgroundColor = "transparent";
      compGunting.style.backgroundColor = "transparent";

      result.classList.remove("Draw");
      result.classList.remove("PlayerWin");
      result.classList.remove("ComputerWin");
      result.classList.add("vs");
      result.innerHTML = "VS";

      this.playerChoices = "";
      this.shuffle = "";
    });
  }
}

class Player extends Game {
  constructor(compShuffle, compChoices, playerChoices) {
    super(compShuffle, compChoices);
    this.playerChoices = playerChoices;
  }

  ROCK() {
    playerBatu.addEventListener("click", () => {
      this.playerChoices = "ROCK";
      playerBatu.style.backgroundColor = "silver";
      super.compChoose();
      this._comBg();
      this.resultOutput();
    });
  }

  PAPER() {
    playerKertas.addEventListener("click", () => {
      this.playerChoices = "PAPER";
      playerKertas.style.backgroundColor = "silver";
      super.compChoose();
      this._comBg();
      this.resultOutput();
    });
  }

  SCISSORS() {
    playerGunting.addEventListener("click", () => {
      this.playerChoices = "SCISSORS";
      playerGunting.style.backgroundColor = "silver";
      super.compChoose();
      this._comBg();
      this.resultOutput();
    });
  }

  _comBg() {
    if (this.compChoices == "ROCK") {
      compBatu.style.backgroundColor = "silver";
    } else if (this.computerChoice == "PAPER") {
      compKertas.style.backgroundColor = "silver";
    } else {
      compGunting.style.backgroundColor = "silver";
    }
  }
}

const play = new Player();
play.ROCK();
play.PAPER();
play.SCISSORS();

const repeat = new Game();
repeat.refresh();
