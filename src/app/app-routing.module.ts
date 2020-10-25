import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { HistoryComponent } from './history/history.component';
import { EcgHistoryComponent } from './ecg-history/ecg-history.component';

const routes: Routes = [
  {path: '', redirectTo:'/monitor', pathMatch:'full'},
  {path: 'monitor', component: MonitorComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'history/:id', component: EcgHistoryComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
