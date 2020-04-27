import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';

// set default path to '/list' and renders ListComponent
const routes: Routes = [
  {path: '', redirectTo: '/showcombinations', pathMatch: 'full'},
  {path: 'showcombinations', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
