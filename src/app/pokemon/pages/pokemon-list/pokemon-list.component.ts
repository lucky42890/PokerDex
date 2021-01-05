import { Component, OnInit } from '@angular/core';
import { GridOptions, AllCommunityModules } from '@ag-grid-community/all-modules';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Pokemon, PokemonDTO } from 'src/app/core/interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  gridOptions: GridOptions;
  modules = AllCommunityModules;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {
    // Init ag-grid options
    this.gridOptions = {
      columnDefs: this.createColumnDefs(),
      pagination: true,
      rowSelection: 'single',

      // Get pokemon list and update grid
      onGridReady: () => {
        this.pokemonService.getPokemonList().subscribe(
          (result: PokemonDTO) => {
            this.gridOptions.api?.setRowData(result.results);
          }
        );
      },
      // Auto size of columns on first data render
      onFirstDataRendered: (params) => {
        params.api.sizeColumnsToFit();
      },
      // Navigate to detail page on row selection
      onSelectionChanged: () => {
        const selectedRows = this.gridOptions.api?.getSelectedRows() as Pokemon[];
        if (selectedRows.length) {
          this.router.navigate([`poke/detail/${selectedRows[0].name}`]);
        }
      }
    } as GridOptions;
  }

  ngOnInit(): void {}

  private createColumnDefs(): object[] {
    return [
      { field: 'name' },
      { field: 'url' },
    ];
  }
}
