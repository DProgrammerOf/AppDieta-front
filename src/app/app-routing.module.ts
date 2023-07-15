import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentosComponent } from './pages/alimentos/alimentos.component';

const routes: Routes = [
  { path: 'alimentos', component: AlimentosComponent },
  { path: '',   redirectTo: '/alimentos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
