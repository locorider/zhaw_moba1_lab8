
import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from "@angular/core";
import {CanvasDrawer} from "./CanvasDrawer";
import {BoardColumn} from "./BoardColumn";
import {Player} from "./Player";

@Component({
  selector: 'board',
  template: ` <canvas class="board" #canvas (click)="onBoardClicked($event)"></canvas>`,
  styleUrls: ['./board.less']
})
export class Board implements OnInit {
  boardColumns: BoardColumn[] = [];
  players: Player[] = [];
  currentPlayer: Player = null;

  private currentPlayerIndex = -1;

  @ViewChild('canvas') canvas: ElementRef;
  @Output() playerWon = new EventEmitter();

  init() {
    this.initBoard();
    CanvasDrawer.clear(this.canvas.nativeElement);
    this.render();
  }

  initBoard(): void {
    for(let i = 0; i < CanvasDrawer.COLUMNS; i++) {
      const column = new BoardColumn(i, CanvasDrawer.ROWS);
      this.boardColumns.push(column);
    }
  }

  startGame(players: Player[]): void {
    this.players = players;
    this.boardColumns = [];
    this.currentPlayerIndex = -1;
    this.currentPlayer = this.getNextPlayer();
    this.init();
  }

  getNextPlayer(): Player {
    const index = ++this.currentPlayerIndex % this.players.length;
    const nextPlayer = this.players[index];
    return nextPlayer;
  }

  render(): void {
    for(let column of this.boardColumns) {
      column.render(this.canvas);
    }
  }

  ngOnInit(): void {
    this.init();
  }

  getActualCanvasWidth() {
    return $(this.canvas.nativeElement).width();
  }

  onBoardClicked($event) {
    const col = CanvasDrawer.getColumnIndex(this.getActualCanvasWidth(), $event.offsetX);
    const boardCol = this.boardColumns[col];

    if(boardCol.canPlacePiece()) {
      this.placePiece(boardCol, this.currentPlayer);
      this.render();
    }
  }

  placePiece(column: BoardColumn, nextPlayer: Player) {
    column.placePiece(nextPlayer);
    this.currentPlayer = this.getNextPlayer();
    if(this.checkWon()) {
      this.playerWon.emit(nextPlayer);
    }
  }

  createMap2d() {
    const map = [];
    for(let i = 0, l = this.boardColumns.length; i < l; i++) {
      const rows = [];
      map.push(rows);
      for(let playerPiece of this.boardColumns[i].playerPieces) {
        rows.push(playerPiece.id);
      }
      for(let y = rows.length - 1, l = CanvasDrawer.ROWS; y < l; y ++) {
        rows.push(0);
      }
    }
    return map;
  }

  checkWon(): boolean {
    const map2d = this.createMap2d();

    var in1;
    var in2;
    var x,y,i,j;

    for (x = 0; x < CanvasDrawer.COLUMNS; x++) {
      let in1 = 0;
      let in2 = 0;

      for (y = 0; y < CanvasDrawer.ROWS; y++) {
        if (map2d[x][y] == 1) {
          if (++in1 == 4)
            return true;

          in2 = 0;
        }
        else if (map2d[x][y] == 2) {
          if (++in2 == 4)
            return true;
          in1 = 0;
        }
      }
    }


    for (y = 0; y < CanvasDrawer.ROWS; y++) {
      in1 = 0;
      in2 = 0;

      for (x=0;x < CanvasDrawer.COLUMNS;x++) {
        if (map2d[x][y] == 1) {
          if (++in1 == 4)
            return true;
          in2 = 0;
        }
        else if (map2d[x][y] == 2) {
          if (++in2 == 4)
            return true;
          in1 = 0;
        }
      }
    }

    for (i=-CanvasDrawer.COLUMNS;i < CanvasDrawer.COLUMNS-3;i++) {
      in1 = 0;
      in2 = 0;

      for (j=0;j < CanvasDrawer.ROWS;j++) {
        x = i + j;
        y = j;
        if (x >= 0 && y >= 0 &&  x < CanvasDrawer.COLUMNS && y < CanvasDrawer.ROWS) {
          if (map2d[x][y] == 1) {
            if (++in1 == 4)
              return true;
            in2 = 0;
          }
          else if (map2d[x][y] == 2) {
            if (++in2 == 4)
              return true;
            in1 = 0;
          }
        }
      }
    }


    for (i=-CanvasDrawer.COLUMNS;i < CanvasDrawer.COLUMNS-3;i++) {
      in1 = 0;
      in2 = 0;

      for (j=0;j < CanvasDrawer.ROWS;j++) {
        x = i - j;
        y = j;
        if (x >= 0 && y >= 0 &&  x < CanvasDrawer.COLUMNS && y < CanvasDrawer.ROWS) {
          if (map2d[x][y] == 1) {
            if (++in1 == 4)
              return true;
            in2 = 0;
          }
          else if (map2d[x][y] == 2) {
            if (++in2 == 4)
              return true;
            in1 = 0;
          }
        }
      }
    }

    return false;
  }
}
