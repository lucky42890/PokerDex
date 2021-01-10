import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PokemonDTO, Pokemon } from '../interfaces/pokemon';
import { Move } from '../interfaces/move';
import { Stat } from '../interfaces/stat';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private API_URL = environment.api_url;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonDTO> {
    const url = this.API_URL + `pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonDTO>(url);
  }

  getAllPokemonList(): Observable<PokemonDTO> {
    const basicUrl = this.API_URL + 'pokemon';
    return this.http.get<PokemonDTO>(basicUrl)
      .pipe(
        switchMap(result => {
          const url = this.API_URL + `pokemon?limit=${result.count}&offset=0`;
          return this.http.get<PokemonDTO>(url);
        })
      );
  }

  getPokemonInfoByName(name: string): Observable<Pokemon> {
    const url = this.API_URL + `pokemon/${name}`;
    return this.http.get<Pokemon>(url);
  }

  getPokemonMove(url: string): Observable<Move> {
    return this.http.get<Move>(url);
  }

  getPokemonStat(name: string): Observable<Stat> {
    const url = this.API_URL + `stat/${name}`;
    return this.http.get<Stat>(url);
  }
}
