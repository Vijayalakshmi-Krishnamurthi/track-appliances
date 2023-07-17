import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { PieChartComponent } from './table-view/pie-chart/pie-chart.component';
import { LinearGaugeComponent } from './table-view/line-chart/linear-gauge/linear-gauge.component';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbAccordionModule, NbIconModule, NbTreeGridModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './table-view/line-chart/line-chart.component';

@NgModule({
  declarations: [TableViewComponent, PieChartComponent, LinearGaugeComponent, LineChartComponent],
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
