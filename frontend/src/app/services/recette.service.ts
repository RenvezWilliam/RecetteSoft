import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Ingredient } from "../content/search/search.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class RecetteService{

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

    private listeComplete: any;

    async getRecipes(ingredients: Ingredient[]): Promise<any> {
        await this.doTheRequest();
        let ingredient_liste = [];
        let result = [];

        for (let i = 0; i < ingredients.length; i++) {
            ingredient_liste.push(ingredients[i].name.toLowerCase());
        }
        
        if (ingredient_liste.length == 0) return this.listeComplete;
        
        for (let i = 0; i < this.listeComplete.length; i++) {
            for (let j = 0; j < ingredient_liste.length; j++) {
                if(! this.listeComplete[i]['ingredients'].includes(ingredient_liste[j])) break;
                
                if (j == ingredient_liste.length - 1) result.push(this.listeComplete[i]);
            }
        }

        return result;
    }

    async doTheRequest(): Promise<void> {
        try { this.listeComplete = await this.http.get('http://localhost:3000/recette').toPromise(); }
        catch (e) { this._snackBar.open("😱... La base de donnée n'est pas joignable!", "Ok", {duration: 10000}) }
    }

    async addRecipe(values: any[]) {
        /* CONTINUER ICI */

        let formValue: {nom: string, titre: string, page: number, duree: string, ingredients: string[]}
    }

}
