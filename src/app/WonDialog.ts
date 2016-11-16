import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {Player} from "./Player";
declare var $:JQueryStatic;

/**
 * Created by joser on 16.11.2016.
 */

@Component({
  selector: 'wonDialog',
  templateUrl: './won-dialog.html'
})
export class WonDialog implements AfterViewInit {

  @ViewChild('mobileDialog') dialog: ElementRef;
  @ViewChild('wonTitle') wonTitle: ElementRef;
  jqDialog: any;
  resolve: any;
  player: Player;

  ngAfterViewInit() {
    this.jqDialog = (<any>$(this.dialog.nativeElement));
    this.jqDialog.popup();
  }

  closeDialog() {
    this.close();
    this.resolve();
  }

  show(player): Promise<any> {
    // console.log('wonDialog', this.wonTitle.nativeElement);
    this.player = player;
    // this.wonTitle.nativeElement.text = player.name;
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
