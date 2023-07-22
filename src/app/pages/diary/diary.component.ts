import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Diary, DiaryFood, Food} from "../../services/base.service";
import * as moment from "moment";
import {DiaryService, AllDiaries} from "../../services/diary.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-diary-page',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  list_food: Food[] | undefined;
  list_diaries: Diary[] | undefined;
  // variables modal
  modal = {
    input_date: moment().format('yyyy-MM-DD'),
    input_foods_search: '',
    input_foods_filtered: [] as Food[],
    visibility: false // hidden
  };

  // variables modal
  protected readonly formatDate = formatDate;

  constructor(
    private foodService: FoodService,
    private service: DiaryService
  ) {
  }

  public ngOnInit(): void {
    this.foodService.listAll().subscribe(
      (response) => {
        if (response.success && response.food) {
          this.list_food = response.food;
          this.modal.input_foods_filtered = response.food;
        }
      }
    );

    this.refreshDiaries();
  }

  protected refreshDiaries(data: Diary[] | undefined = undefined): void {
    if (data) {
      this.list_diaries = data;
    }

    this.service.listAll().subscribe(
      (response: AllDiaries) => {
        if (response.success && response.diaries) {
          this.list_diaries = response.diaries;
        }
      }
    )
  }

  protected showModalDiary(): void {
    this.modal.visibility = true;
  }

  protected closeModalDiary(): void {
    this.modal.visibility = false;
  }

  protected refreshFilter(): void {
    const foods = this.list_food?.filter(
      food => food.rotulo.toUpperCase().includes(this.modal.input_foods_search.toUpperCase())
    );
    this.modal.input_foods_filtered = foods ? foods : [];
  }

  protected addCount(food: Food): void {
    const element: HTMLInputElement | null = document.querySelector(`.food-item-count[food-id="${food.id}"]`);
    //console.log(food, element);
    if (element) {
      const newValue = Number(element.value) + 1;
      element.value = newValue.toString();
    }
  }

  protected subCount(food: Food): void {
    const element: HTMLInputElement | null = document.querySelector(`.food-item-count[food-id="${food.id}"]`);
    //console.log(food, element);
    if (element) {
      const newValue = Number(element.value) - 1;
      element.value = newValue > 0 ? newValue.toString() : (0).toString();
    }
  }

  protected store(): void {
    let foods: DiaryFood[] = [];
    const elements: NodeList | null = document.querySelectorAll(".food-item-count");

    // Obtem-se todos os alimentos que possuem quantidade maior que 0 no formulário
    // E insere em [diaries] com a quantidade inserida
    elements.forEach((element) => {
      const amount: Number = Number((element as HTMLInputElement).value);
      if (amount > 0) {
        const id_food: Number = Number((element as HTMLInputElement).getAttribute('food-id'));
        const food = this.list_food?.find(food => food.id === id_food);
        if (food) {
          foods.push({food: food, amount: amount});
        }
      }
    });

    // Envia ao servidor dia e alimentos da refeição
    // Em caso de sucesso, atualiza a lista de refeições com a nova refeição
    this.service.store(moment().format(), foods).subscribe(
      (response) => {
        if (response.success && response.diaries) {
          this.refreshDiaries(response.diaries);
          alert(response.message);
          this.closeModalDiary();
        }
      }
    )
  }
}
