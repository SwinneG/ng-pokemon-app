import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{

    searchTerms = new Subject<string>();
    pokemons$: Observable<Pokemon[]>

    constructor(
      private router: Router,
      private pokemonService: PokemonService
    ) {}
    
    ngOnInit() {
      this.pokemons$ = this.searchTerms.pipe(
        //{...a.ab...abz.ab....abc......}  (les points sont du temps, 1pt = 100ms)
        // => on ne veut pas faire 5 appels au serveur mais juste une pour abc
        debounceTime(300),
        //{.....ab....ab...abc......}
        //=> ca a permis d'éliminer des requetes dont on a pas besoin
        distinctUntilChanged(),
        //{.....ab.........abc......}
        //=> ca a permis d'éliminer les doublons
        switchMap((term) => this.pokemonService.searchPokemonList(term))
        //{.....pokemonList(ab).........pokemonList(abc)......}
      );
    }

    search(term: string) {
      this.searchTerms.next((term));
    }

    goToDetailPokemon(pokemon: Pokemon) {
      const link = ['/pokemon', pokemon.id];
      this.router.navigate(link);
    }

}
