import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';

export interface Ingredient {
    name: string;
}

export interface Recette {
    id: number,
    nom: string,
    titre: string,
    page: number,
    duree: string,
    note: string,
    ingredients: Ingredient[]
}

@Injectable({
    providedIn: 'root'
})
export class RecetteService{

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

    private listeComplete: any;

    

    async getRecipes(ingredients: Ingredient[]): Promise<any> {
        await this.getAllRecipes();
        let ingredient_liste = [];
        let result = [];


        for (let i = 0; i < ingredients.length; i++) {
            ingredient_liste.push(ingredients[i].name.toLowerCase());
        }
        
        if (ingredient_liste.length == 0) return this.listeComplete;
        
        console.log(this.listeComplete)

        for (let i = 0; i < this.listeComplete.length; i++) {
            for (let j = 0; j < ingredient_liste.length; j++) {
                if(! this.listeComplete[i]['ingredients'].includes(ingredient_liste[j])) break;
                
                if (j == ingredient_liste.length - 1) result.push(this.listeComplete[i]);
            }
        }

        return result;
    }

    async getAllRecipes(): Promise<void> {
        try { this.listeComplete = await this.http.get('http://localhost:3000/recette').toPromise(); }
        catch (e) { this._snackBar.open("😱... La base de donnée n'est pas joignable!", "Ok", {duration: 10000}) }
    }

    async onAddRecipe(values: any[]) {
        /* CONTINUER ICI */
        try {
            await this.getAllRecipes();
            const id = Number(this.listeComplete[this.listeComplete.length - 1].id) + 1;
            let ingredients = [];
            let recette: Recette;

            for (let i = 0; i < values[4].length; i++) ingredients.push(values[4][i].name.toLowerCase())

            recette = {
                id: id,
                nom: values[0],
                titre: values[1],
                page: values[2],
                duree: values[3],
                note: "généré automatiquement",
                ingredients: ingredients
            }
            this.addRecette(recette);
            
        } catch (e) {
            this._snackBar.open("😱...Une erreur est survenue, je ne peux pas ajouter de recette !", "Ok", {duration: 10000})
            console.error(e);
        }
        
    }

    private addRecette(recette: Recette) {
        fetch('http://localhost:3000/recette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(recette),
        })
        .then(response => {
            if (response.ok) this._snackBar.open("🍴Recette ajoutée !", "Super !", {duration: 10000})
            else this._snackBar.open("😱...Une erreur est survenue, je ne peux pas ajouter de recette !", "Ok", {duration: 10000})
        })
        .catch(error => {
            this._snackBar.open("😱...Une erreur est survenue, je ne peux pas ajouter de recette !", "Ok", {duration: 10000})
            console.error(error);
        })
    }
}
