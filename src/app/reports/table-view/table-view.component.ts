import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../../../app/appService/application.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface ITableData {
  deviceName: string;
  deviceID: string;
  installationDate: string;
  consumerNumber: string;
  deviceHealth: string;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  showComponent: boolean = false;
  deviceID: string = "";

  constructor(private http: HttpClient, private appService: ApplicationService) { }

  chartData = this.appService.chartData$.getValue();
  customColumn = 'deviceID';
  defaultColumns = [ 'deviceName', 'installationDate', 'consumerNumber', 'deviceHealth' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  columnHeader = {
    deviceID: "Device ID",
    deviceName: "Device Name",
    installationDate: "Installation Date",
    consumerNumber: "Consumer Number",
    deviceHealth: "Device Health"
  };

  public showLineChart(deviceID: string) {
    this.deviceID = deviceID;
    this.showComponent = true;
  }
}
