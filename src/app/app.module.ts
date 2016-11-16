import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {Board} from "./Board";
import {PlayerDialog} from "./PlayerDialog";
import {WonDialog} from "./WonDialog";

@NgModule({
  declarations: [
    AppComponent,
    Board,
    PlayerDialog,
    WonDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
