import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LinearGaugeComponent } from './linear-gauge/linear-gauge.component';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbAccordionModule, NbIconModule, NbTreeGridModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TableViewComponent, LineChartComponent, PieChartComponent, LinearGaugeComponent],
  imports: [
    CommonModule,
    NbTreeGridModule,
    NbCardModule,
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbAccordionModule,
    NbIconModule,
    NbSelectModule,
    HttpClientModule,
  ]
})
export class ReportsModule { }
