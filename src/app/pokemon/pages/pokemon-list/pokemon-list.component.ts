import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions, AllCommunityModules } from '@ag-grid-community/all-modules';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { BasicInfo } from 'src/app/core/interfaces/pokemon';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

const DEFAULT_ROW_NUM = 20;

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public gridOptions: GridOptions;
  public modules = [ServerSideRowModelModule];

  public personalGridOptions: GridOptions;
  public personalModules = AllCommunityModules;
  public personalModalTitle = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private pokemonService: PokemonService,
    private storageService: StorageService
  ) {
    // Init ag-grid options for entire pokemon list
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
        const selectedRows = this.gridOptions.api?.getSelectedRows() as BasicInfo[];
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

  openModal(content: any, type: string): void {
    // Init ag-grid options for personal list
    this.personalGridOptions = {
      columnDefs: [
        { field: 'name' },
      ],
      rowSelection: 'single',
      rowData: type === 'caught' ? this.storageService.getCaughtList() : this.storageService.getWishList(),

      // Auto size of columns on first data render
      onFirstDataRendered: (params) => {
        params.api.sizeColumnsToFit();
      },
      // Navigate to detail page on row selection
      onSelectionChanged: () => {
        const selectedRows = this.personalGridOptions.api?.getSelectedRows() as BasicInfo[];
        if (selectedRows.length) {
          this.modalService.dismissAll();
          this.router.navigate([`poke/detail/${selectedRows[0].name}`]);
        }
      }
    } as GridOptions;

    this.personalModalTitle = type === 'caught' ? 'Pokemon list I\'ve caught' : 'Pokemon list I want to catch';
    this.modalService.open(content);
  }
}
