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
    this.caughtList.push(pokemonName);
    this.saveDataToStorage();
  }

  addPokemonToWishList(pokemonName: string): void {
    this.wishlist.push(pokemonName);
    this.saveDataToStorage();
  }

  isAlreadyInCaughtList(name: string): boolean {
    return this.caughtList.filter(item => item === name).length > 0;
  }

  isAlreadyInWishList(name: string): boolean {
    return this.wishlist.filter(item => item === name).length > 0;
  }

  getCaughtList(): any[] {
    return this.caughtList.map(str => ({ name: str }));
  }

  getWishList(): any[] {
    return this.wishlist.map(str => ({ name: str }));
  }
}
