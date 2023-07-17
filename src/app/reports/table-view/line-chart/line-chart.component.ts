import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
import { ApplicationService } from 'app/appService/application.service';
import * as Highcharts from 'highcharts';

interface IChartData {
  date: string;
  value: string;
}

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() showComponent: boolean;
  @Input() deviceID: string;
  energyChartData: string[][][] = [];
  timeChartData: string[][][] = [];
  selectedOption: {};
  showGauge: boolean = false;
  chartType: string = '';

  constructor(private appService: ApplicationService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(this.deviceID) {
      const deviceData = this.appService.chartData.find((device) => {
        return device.data.deviceID === this.deviceID;
      });
      if(deviceData){
        let dailyEnergyData: string[][] = [];
        let dailyActiveTimeData: string[][] = [];
        deviceData.data.energyConsumption.forEach((energy, index) => {
          dailyEnergyData[index] = [this.formatDate(new Date(energy.date)), energy.value];
        });
        this.energyChartData.push(dailyEnergyData);

        deviceData.data.activeTime.forEach((time, index) => {
          dailyActiveTimeData[index] = [this.formatDate(new Date(time.date)), time.value];
        });
        this.timeChartData.push(dailyActiveTimeData);
      }
    }
    if(this.showComponent) {
      this.createEnergyChartLine();
      this.createTimeChartLine();
    }


  }

  ngAfterViewInit(): void {
    this.createEnergyChartLine();
    this.createTimeChartLine();
  }

  private formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

  private createEnergyChartLine(): void {
    const that = this;
    Highcharts.chart('energy-chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Energy Consumption',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        series: {
          events: {
            click: function (event) {
              that.selectedOption = event.point.options;
              that.showGauge = true;
              that.chartType = "Energy Consumption";
            }
          }
        }
      },
      series: [{
        name: 'Energy Consumed',
        data: this.energyChartData[0],
      }],
    } as any);

    // setInterval(() => {
    //   date.setDate(date.getDate() + 1);
    //   chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.appService.getRandomNumber(0, 1000)], true, true);
    // }, 1500);
  }

  private createTimeChartLine(): void {
    const that = this;
    Highcharts.chart('time-chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Active Time',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        series: {
          events: {
            click: function (event) {
              that.selectedOption = event.point.options;
              that.showGauge = true;
              that.chartType = "Active Time";
            }
          }
        }
      },
      series: [{
        name: 'Active Time',
        data: this.timeChartData[0],
      }],
    } as any);

    // setInterval(() => {
    //   date.setDate(date.getDate() + 1);
    //   chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.appService.getRandomNumber(0, 1000)], true, true);
    // }, 1500);
  }

}
