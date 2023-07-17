import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';

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
export class TableViewComponent implements OnInit {
  private jsonURL = environment.assetsFolder + 'device-details.json';
  private devices = [];
  chartData: TreeNode<ITableData>[] = [];

  constructor(private http: HttpClient) { 
    this.getJSON().subscribe(data => {
      this.devices = JSON.parse(JSON.stringify(data));

      this.devices.forEach((device) => {
        let tabledata: ITableData = {
        deviceID: device.deviceID,
        deviceName: device.deviceName,
        consumerNumber: device.consumerNumber,
        installationDate: device.installationDate,
        deviceHealth: device.deviceHealth,
      }

        this.chartData.push({ data: tabledata });
      });
      console.log(this.chartData);
    })

    // this.devices.forEach((device) => {
    //   let tabledata: ITableData;
    //   tabledata.deviceID = device.deviceID;
    //   tabledata.deviceName = device.deviceName;
    //   tabledata.consumerNumber = device.consumerNumber;
    //   tabledata.installationDate = device.installationDate;
    //   tabledata.deviceHealth = device.deviceHealth;

    //   this.chartData.push({data: tabledata});
    // });
    // console.log(this.chartData);
  }
  
  ngOnInit() {
  }

  customColumn = 'deviceID';
  defaultColumns = [ 'deviceName', 'installationDate', 'consumerNumber', 'deviceHealth' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  // allColumns = [ 'deviceID', 'deviceName', 'installationDate', 'consumerNumber', 'deviceHealth' ];

  private getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
}
