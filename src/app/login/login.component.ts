import { Component, OnInit, Inject, Input } from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NbDialogRef, NbDialogService } from "@nebular/theme";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  returnData: string = "Bye";
  organizationList: any[];
  selectedOrganization: string;
  userID: string;
  password: string;
  
  @Input() data: string;
  constructor(
    public dialogRef: NbDialogRef<LoginComponent>
  ) {
    this.organizationList = [];
    this.organizationList.push({value: "A", label: "Abcd"});
    this.organizationList.push({value: "E", label: "Efgh"});
    this.organizationList.push({value: "I", label: "Ijkl"});
  }

  onNoClick(): void {
    this.dialogRef.close(this.returnData);
  }

  onYesClick(): void {
    this.dialogRef.close("Closed");
  }

}
