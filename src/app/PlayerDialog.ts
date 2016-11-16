import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {Player} from "./Player";
declare var $:JQueryStatic;

/**
 * Created by joser on 16.11.2016.
 */

@Component({
  selector: 'playerDialog',
  templateUrl: './player-dialog.html'
})
export class PlayerDialog implements AfterViewInit {

  @ViewChild('mobileDialog') dialog: ElementRef;
  @ViewChild('inputName') inputName: ElementRef;
  jqDialog: any;
  resolve: any;
  player: {
    name: ''
  };

  ngAfterViewInit() {
    this.jqDialog = (<any>$(this.dialog.nativeElement));
    this.jqDialog.popup();
  }

  savePlayer() {
    this.close();
    const player = {
      name: this.inputName.nativeElement.value
    };
    this.resolve(player);
  }

  show(): Promise<any> {
    this.inputName.nativeElement.value = '';
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      setTimeout(() => {
        this.jqDialog.popup('open', {
          positionTo: $('[data-role=page]')
        });
      }, 100);
    });
  }

  close() {
    this.jqDialog.popup('close');
  }
}
