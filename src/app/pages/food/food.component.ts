import {Component} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Food} from "../../services/base.service";

@Component({
  selector: 'app-food-page',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  rotulo: string = '';
  calorias: string = '0';
  carboidratos: string = '0';
  proteinas: string = '0';
  gorduras: string = '0';
  fibra: string = '0';
  sodio: string = '0';

  constructor(
    private service: FoodService
  ) {
  }

  protected save(e: Event): void {
    e.preventDefault();
    const new_food: Food = {
      rotulo: this.rotulo,
      tabela: {
        calorias: Number(this.calorias),
        carboidratos: Number(this.carboidratos),
        proteinas: Number(this.proteinas),
        gorduras: Number(this.gorduras),
        fibra: Number(this.fibra),
        sodio: Number(this.sodio)
      }
    };
    this.service.store(new_food).subscribe(
      (response) => {
        if (response.success) {
          this.rotulo = '';
          this.calorias = '0';
          this.calorias = '0';
          this.proteinas = '0';
          this.gorduras = '0';
          this.fibra = '0';
          this.sodio = '0';
        }
        alert(response.message);
      }
    )
  }
}
