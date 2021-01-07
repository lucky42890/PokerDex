import { Component, OnInit } from '@angular/core';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonInfo } from 'src/app/core/interfaces/pokemon';
import { Router } from '@angular/router';

const DEFAULT_ROW_NUM = 20;

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  gridOptions: GridOptions;
  modules = [ServerSideRowModelModule];

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {
    // Init ag-grid options
    this.gridOptions = {
      columnDefs: this.createColumnDefs(),
      pagination: true,
      paginationPageSize: DEFAULT_ROW_NUM,
      cacheBlockSize: DEFAULT_ROW_NUM,
      rowSelection: 'single',
      rowModelType: 'serverSide',

      // Auto size of columns on first data render
      onFirstDataRendered: (params) => {
        params.api.sizeColumnsToFit();
      },
      // Navigate to detail page on row selection
      onSelectionChanged: () => {
        const selectedRows = this.gridOptions.api?.getSelectedRows() as PokemonInfo[];
        if (selectedRows.length) {
          this.router.navigate([`poke/detail/${selectedRows[0].name}`]);
        }
      },
      serverSideDatasource: {
        getRows: (params) => {
          try {
            this.pokemonService
              .getPokemonList(DEFAULT_ROW_NUM, params.request.startRow)
              .subscribe(
                result => {
                  params.successCallback(result.results, result.count);
                }
              );
          } catch (err) {
            console.log(err);
            params.failCallback();
          }
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
