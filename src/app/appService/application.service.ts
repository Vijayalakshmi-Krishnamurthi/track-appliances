import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface IDailyData {
  date: string;
  value: string;
}

interface ITableData {
  deviceName: string;
  deviceID: string;
  installationDate: string;
  consumerNumber: string;
  deviceHealth: string;
  energyConsumption?: IDailyData[];
  activeTime?: IDailyData[];
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private jsonURL = environment.assetsFolder + 'device-details.json';
  private devices = [];
  public chartData: TreeNode<ITableData>[] = [];
  public chartData$: BehaviorSubject<TreeNode<ITableData>[]>;
  public loggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.chartData$ = new BehaviorSubject<TreeNode<ITableData>[]>(
      this.chartData
  );
    this.getJSONData();
   }

  private getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  public getJSONData(): void {
    let dataFetched = false;
    this.chartData = [];

    this.getJSON().subscribe(data => {
      this.devices = JSON.parse(JSON.stringify(data));

      this.devices.forEach((device) => {
        let tabledata: ITableData = {
        deviceID: device.deviceID,
        deviceName: device.deviceName,
        consumerNumber: device.consumerNumber,
        installationDate: device.installationDate,
        deviceHealth: device.deviceHealth,
        energyConsumption: device.energyConsumption,
        activeTime: device.activeTime
      }

        this.chartData.push({ data: tabledata });
      });
      console.log(this.chartData);
      this.chartData$.next(this.chartData);
      dataFetched = true;
    })
    // return this.chartData;
  }

  public getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
