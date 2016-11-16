import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {Board} from "./Board";
import {Player} from "./Player";
import {PlayerDialog} from "./PlayerDialog";
import {WonDialog} from "./WonDialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('board') board: Board;
  @ViewChild('playerDialog') playerDialog: PlayerDialog;
  @ViewChild('wonDialog') wonDialog: WonDialog;

  players: Player[] = [];

  ngAfterViewInit() {
    this.setupGame();
  }

  setupGame() {
    this.players = [];
    this.playerDialog.show().then((playerOne) => {
      playerOne.color = '#DD1C1A';
      playerOne.id = 1;
      playerOne.hasWon = false;
      this.players.push(playerOne);
      this.playerDialog.show().then((playerTwo) => {
        playerTwo.color = '#f6f600';
        playerTwo.id = 2;
        playerTwo.hasWon = false;
        this.players.push(playerTwo);
        this.board.startGame(this.players);
      });
    });
  }

  onPlayerWon(player) {
    console.log('player won', player);
    this.wonDialog.show(player).then(() => this.setupGame());
  }
}
