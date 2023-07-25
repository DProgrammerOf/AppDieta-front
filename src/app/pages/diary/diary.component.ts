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

  protected readonly moment = moment;

  protected refreshDiaries(data: Diary[] | undefined = undefined): void {
    if (data) {
      this.list_diaries = data;
    }

    this.service.listToday().subscribe(
      (response: AllDiaries) => {
        if (response.success && response.diaries) {
          this.list_diaries = response.diaries;
        }
      }
    )
  }

  // Functions to Diary
  protected calculateToday(type: String): number {
    let result = 0;
    this.list_diaries?.forEach(element => {
      element.alimentos?.forEach(day_food => {
        if (type == 'calorias')
          result += Number(day_food.food.tabela.calorias) * Number(day_food.amount);
        else if (type == 'carboidratos')
          result += Number(day_food.food.tabela.carboidratos) * Number(day_food.amount);
        else if (type == 'proteinas')
          result += Number(day_food.food.tabela.proteinas) * Number(day_food.amount);
        else if (type == 'gorduras')
          result += Number(day_food.food.tabela.gorduras) * Number(day_food.amount);
        else if (type == 'sodio')
          result += Number(day_food.food.tabela.sodio) * Number(day_food.amount);
      });
    });
    return result;
  }

  protected calculateDiary(foods: DiaryFood[] | undefined, type: String): number {
    let result = 0;
    if (foods == undefined) {
      return result;
    }
    foods.forEach(element => {
      if (type == 'calorias')
        result += Number(element.food.tabela.calorias) * Number(element.amount);
      else if (type == 'carboidratos')
        result += Number(element.food.tabela.carboidratos) * Number(element.amount);
      else if (type == 'proteinas')
        result += Number(element.food.tabela.proteinas) * Number(element.amount);
      else if (type == 'gorduras')
        result += Number(element.food.tabela.gorduras) * Number(element.amount);
      else if (type == 'sodio')
        result += Number(element.food.tabela.sodio) * Number(element.amount);
    });
    return result;
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

  // Functions to Diary Modal
  protected showModalDiary(): void {
    this.modal.visibility = true;
  }
}
