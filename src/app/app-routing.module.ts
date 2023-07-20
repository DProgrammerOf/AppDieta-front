import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoodComponent} from "./pages/food/food.component";
import {DiaryComponent} from "./pages/diary/diary.component";

const routes: Routes = [
  {path: 'diary', component: DiaryComponent},
  {path: 'food', component: FoodComponent},
  {path: '', redirectTo: '/food', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
