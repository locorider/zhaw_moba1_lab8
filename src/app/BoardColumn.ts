import {ElementRef} from "@angular/core";
import {CanvasDrawer} from "./CanvasDrawer";
import {Player} from "./Player";
/**
 * Created by joser on 16.11.2016.
 */

export class BoardColumn {

  private columnIndex: number;
  private rows: number;
  playerPieces: Player[] = [];


  constructor(columnIndex: number, rows: number) {
    this.columnIndex = columnIndex;
    this.rows = rows;
  }

  render(canvas: ElementRef) {
    for(let i = 0; i < this.rows; i++) {
      CanvasDrawer.drawCell(canvas.nativeElement, this.columnIndex, i, this.getColor(i));
    }
  }

  getColor(rowIndex: number): string {
    const playerPiece = this.getPlayer(rowIndex);
    if(null !== playerPiece) {
      return playerPiece.color;
    }
    return null;
  }

  getPlayer(rowIndex: number): Player {
    const pieceIndex = (this.rows - 1) - rowIndex;
    if(pieceIndex < this.playerPieces.length) {
      return this.playerPieces[pieceIndex];
    }
    return null;
  }

  canPlacePiece(): boolean {
    return this.playerPieces.length < this.rows;
  }

  placePiece(player: Player): void {
    console.log('player placing piece', this.columnIndex,  player);
    if(this.canPlacePiece()) {
      this.playerPieces.push(player);
    }
  }
}
