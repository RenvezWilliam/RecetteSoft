import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, inject } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { Ingredient } from '../search/search.component';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {

  public recipeName!: string;
  public bookTitle!: string;
  public recipePage!: number;
  public recipeDuration!: string;

  public ingredients: Ingredient[] = [];
  public addOnBlur = true;
  announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private recetteService: RecetteService, private _snackBar: MatSnackBar) {}


  public onSubmit() {
    if (this.recipeName == null) {this.showError(); return;}
    if (this.bookTitle == null) {this.showError(); return;}
    if (this.recipePage == null) {this.showError(); return;}
    if (this.recipeDuration == null) {this.showError(); return;}
    if (this.ingredients.length == 0) {this.showError(); return;}

    this.recetteService.addRecipe([this.recipeName, this.bookTitle, this.recipePage, this.recipeDuration, this.ingredients]);

  }

  private showError() {
    this._snackBar.open("🧐 Il manque des choses dans ta recette","Ok", {duration:10000})
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
