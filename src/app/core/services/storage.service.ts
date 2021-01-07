import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private caughtList: string[] = [];
  private wishlist: string[] = [];

  constructor() {
    this.loadDataFromStorage();
  }

  loadDataFromStorage(): void {
    this.caughtList = JSON.parse(localStorage.getItem('caughtList') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  saveDataToStorage(): void {
    localStorage.setItem('caughtList', JSON.stringify(this.caughtList));
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  addPokemonToCaughtList(pokemonName: string): void {
    if (this.caughtList.indexOf(pokemonName) < 0) {
      this.caughtList.push(pokemonName);
      this.saveDataToStorage();
    }
  }

  addPokemonToWishList(pokemonName: string): void {
    if (this.wishlist.indexOf(pokemonName) < 0) {
      this.wishlist.push(pokemonName);
      this.saveDataToStorage();
    }
  }

  getCaughtList(): any[] {
    return this.caughtList.map(str => ({ name: str }));
  }

  getWishList(): any[] {
    return this.wishlist.map(str => ({ name: str }));
  }
}
