import { Component, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'linear-gauge',
  templateUrl: './linear-gauge.component.html',
  styleUrls: ['./linear-gauge.component.scss']
})
export class LinearGaugeComponent {
  @Input() data: {y: number; name: string};
  @Input() showGauge: boolean;
  @Input() chartType: string;
  gaugeValue: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.gaugeValue = this.data.y;
    if(this.showGauge){
      this.createChartGauge();
    }
  }

  ngAfterViewInit(): void {
    this.createChartGauge();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: this.chartType + ' on ' + this.data.name + (this.chartType === 'Active Time' ? ' (in Hrs)' : ' (in kWatts)'),
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '55%'],
        size: '70%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: this.chartType === 'Active Time' ? 24 : 3,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [this.gaugeValue],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);

    // setInterval(() => {
    //   chart.series[0].points[0].update(this.getRandomNumber(0, 100));
    // }, 1000);
  }

}
