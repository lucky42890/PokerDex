import { GridOptions, AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemonName = '';
  public pokemonInfo: Pokemon;

  public moveGridOptions: GridOptions;
  public statGridOptions: GridOptions;
  public modules = AllCommunityModules;

  public modalTitle = '';
  public modalContent = '';

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private pokemonService: PokemonService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.pokemonName = this.route.snapshot.paramMap.get('name') || '';

    try {
      this.pokemonService
        .getPokemonInfoByName(this.pokemonName)
        .subscribe(
          result => {
            this.pokemonInfo = result;

            // Init ag-grid options
            this.moveGridOptions = {
              columnDefs: [
                { field: 'name' },
                { field: 'url' },
              ],
              rowSelection: 'single',
              rowData: this.pokemonInfo.moves.map(move => move.move),

              // Auto size of columns on first data render
              onFirstDataRendered: (params) => {
                params.api.sizeColumnsToFit();
              },
              // Navigate to detail page on row selection
              onSelectionChanged: () => {
              }
            } as GridOptions;

            this.statGridOptions = {
              columnDefs: [
                { field: 'base_stat' },
                { field: 'effort' },
                { field: 'name' },
              ],
              rowSelection: 'single',
              rowData: this.pokemonInfo.stats.map(stat => ({
                base_stat: stat.base_stat,
                effort: stat.effort,
                name: stat.stat.name
              })),

              // Auto size of columns on first data render
              onFirstDataRendered: (params) => {
                params.api.sizeColumnsToFit();
              },
              // Navigate to detail page on row selection
              onSelectionChanged: () => {
              }
            } as GridOptions;
          }
        );

    } catch (err) {
      console.log('API get error of pokemon detail information', err);
    }
  }

  openModal(content: any, modalType: string): void {
    let alreadyExist = false;

    if (modalType === 'caughtlist') {
      // For caught list modal
      this.modalTitle = 'Add pokemon to Caught list!';
      this.modalContent = 'We will add this pokemon to your caught list! Please confirm!';

      if (this.storageService.isAlreadyInCaughtList(this.pokemonName)) {
        alreadyExist = true;
        this.modalContent = 'This pokemon is already in caught list!';
      }
    } else {
      // For wish list modal
      this.modalTitle = 'Add pokemon to Wish list!';
      this.modalContent = 'We will add this pokemon to your wish list! Please confirm!';

      if (this.storageService.isAlreadyInWishList(this.pokemonName)) {
        alreadyExist = true;
        this.modalContent = 'This pokemon is already in wish list!';
      }
    }

    const modalRef = this.modalService.open(content);
    modalRef.closed.subscribe(
      message => {
        if (message === 'Okay') {
          if (modalType === 'caughtlist') {
            if (!alreadyExist) {
              this.storageService.addPokemonToCaughtList(this.pokemonName);
            }
          } else if (modalType === 'wishlist') {
            if (!alreadyExist) {
              this.storageService.addPokemonToWishList(this.pokemonName);
            }
          }
        }
      }
    );
  }
}
