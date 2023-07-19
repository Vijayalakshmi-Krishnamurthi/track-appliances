import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/appService/application.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public appService: ApplicationService) {}

}
