import { Component } from '@angular/core';
import { ApplicationService } from 'app/appService/application.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

interface IData {
  name: string;
  y: number;
}

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  constructor(private appService: ApplicationService) {
    this.getData();
  }

  chartData: IData[] = [];


  ngOnChanges(): void {
  }

  ngAfterViewInit(): void {
    this.createChartPie();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private getData(): void {
    let totalEnergy: number = 0;
    const deviceData = this.appService.chartData$.getValue();
    deviceData.forEach((device, index) => {
      device.data.energyConsumption.forEach((energy) => {
        totalEnergy = totalEnergy + parseInt(energy.value);
      });
      this.chartData[index] = { name: device.data.deviceID, y: totalEnergy };
      totalEnergy = 0;
    })
  }

  private createChartPie(): void {
    // let date = new Date();
    // const data: any[] = [];

    // for (let i = 0; i < 5; i++) {
    //   date.setDate(new Date().getDate() + i);
    //   data.push({
    //     name: `${date.getDate()}/${date.getMonth() + 1}`,
    //     y: this.getRandomNumber(0, 1000),
    //   });
    // }

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Pie Chart',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        pointFormat: '<span>Amount: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data: this.chartData,
      }],
    } as any);

    // setInterval(() => {
    //   date.setDate(date.getDate() + 1);
    //   chart.series[0].addPoint({
    //     name: `${date.getDate()}/${date.getMonth() + 1}`,
    //     y: this.getRandomNumber(0, 1000),
    //   }, true, true);
    // }, 1500);
  }

}
