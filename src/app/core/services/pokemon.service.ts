import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonDTO } from '../interfaces/pokemon';

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
}
