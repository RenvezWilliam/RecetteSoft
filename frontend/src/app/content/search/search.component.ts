import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RecetteService } from '../../services/recette.service';

export interface Ingredient {
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: Ingredient[] = []
  
  public gridVisibility = 'none';
  public errorVisibility = 'none';

  announcer = inject(LiveAnnouncer);

  public rowData: any = [];
  public colDefs: any = [
    { headerName: 'ID', field: 'id', resizable: false, width: '75px' },
    { headerName: 'Nom', field: 'nom', resizable: false, width: '300px', filter: 'agTextColumnFilter' },
    {
      headerName: 'Livre',
      groupId: 'livreGroup',
      children: [
        { headerName: 'Titre', field: 'titre', resizable: false, width: '300px', filter: 'agTextColumnFilter' },
        { headerName: 'Page', field: 'page', resizable: false, width: '90px', filter: 'agNumberColumnFilter'  }
      ]
    },
    { headerName: 'Durée', field: 'duree', resizable: false, width: '150px', filter: 'agTextColumnFilter' },
    { headerName: 'Ingrédients', field: 'ingredients', resizable: false, flex: 1  }
  ];
  public theme: string = "ag-theme-quartz";

  constructor (private recetteService: RecetteService) {}

  ngOnInit() { }

  public async onSearch() {
    try {
      this.rowData = await this.recetteService.getRecipes(this.ingredients);
    } catch (error) {
      console.error(error);
    }

    if (this.rowData.length == 0) {
      this.errorVisibility = 'block';
      this.gridVisibility = 'none';
    } else {
      this.errorVisibility = 'none';
      this.gridVisibility = 'block';
    }
  }

  public add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {this.ingredients.push({name: value})}
    event.chipInput!.clear();
  }

  public remove(ingredient: Ingredient){
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.announcer.announce(`L'ingrédient ${ingredient} a été retiré`);
    }
  }

  public edit(ingredient: Ingredient, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) { this.remove(ingredient); return; }

    const index = this.ingredients.indexOf(ingredient);
    if (index >= 0) this.ingredients[index].name = value;
  }
  

}
