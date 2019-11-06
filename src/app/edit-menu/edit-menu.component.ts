import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../shared/services/crud.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  pizzas: Array<any>;
  display: boolean = false;

  constructor(
    public menuService: CRUDService
  ) { }

  ngOnInit() {

    this.menuService.getPizzas().subscribe(result =>{
      this.pizzas = result;
    });

  }

    showDialog() {
        this.display = true;
    }

    DeletePizzaItem(item){

    }

}
