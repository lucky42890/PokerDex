import { Component, OnInit } from '@angular/core';
import { GridOptions, AllCommunityModules } from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  gridOptions: GridOptions;
  modules = AllCommunityModules;

  constructor() {
    // Init ag-grid options
    this.gridOptions = {
      columnDefs: this.createColumnDefs(),
      pagination: true,
      onGridReady: () => {
        this.gridOptions.api?.setRowData([
          { name: 'test', url: 'test_url'}
        ]);
      },
      onFirstDataRendered: (params) => {
        params.api.sizeColumnsToFit();
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
