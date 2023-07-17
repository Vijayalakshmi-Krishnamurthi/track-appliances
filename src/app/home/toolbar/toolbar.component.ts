import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "./../../login/login.component";
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public dialog: NbDialogService, public router: Router) {}

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      context:{
        data: "Hi"
      },
      closeOnBackdropClick: true,
      hasBackdrop: true
    });

    dialogRef.onClose.subscribe((result) => {
      console.log(result + 'The dialog was closed');
      this.router.navigate(["/table-view"]);
    });
  }

}
