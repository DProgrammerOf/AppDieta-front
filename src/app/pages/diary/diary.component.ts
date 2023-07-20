import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Food} from "../../services/base.service";

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  list_food: Food[] | undefined | null;

  constructor(
    private foodService: FoodService
  ) {
  }

  public ngOnInit(): void {
    this.foodService.listAll().subscribe(
      (response) => {
        if (response.success) {
          this.list_food = response.food;
          console.log(response.food);
        }
      }
    )
  }
}
