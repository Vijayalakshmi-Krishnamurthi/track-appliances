import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './reports/table-view/table-view.component';

const routes: Routes = [
  // { path: 'report', component: ReportComponent },
  { path: 'table-view', component: TableViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
