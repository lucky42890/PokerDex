import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions, AllCommunityModules } from '@ag-grid-community/all-modules';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/services/storage.service';

const DEFAULT_ROW_NUM = 20;

@Component({
  selector: 'app-pokemon-list-a',
  templateUrl: './pokemon-list-a.component.html',
  styleUrls: ['./pokemon-list-a.component.scss']
})
export class PokemonListAComponent implements OnInit {

  public gridOptions: GridOptions;
  public modules = AllCommunityModules;

  public personalGridOptions: GridOptions;
  public personalModalTitle = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private pokemonService: PokemonService,
    private storageService: StorageService,
    private spinnerService: NgxSpinnerService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Init ag-grid options for entire pokemon list
    this.gridOptions = {
      columnDefs: this.createColumnDefs(),
      pagination: true,
      paginationPageSize: DEFAULT_ROW_NUM,
      cacheBlockSize: DEFAULT_ROW_NUM,
      rowSelection: 'single',
      rowData: [],

      // Auto size of columns on first data render
      onFirstDataRendered: (params) => {
        params.api.sizeColumnsToFit();
      },
      // Navigate to detail page for clicked row
      onRowClicked: (event) => {
        this.ngZone.run(() => {
          this.router.navigate([`poke/detail/${event.data.name}`]);
        });
      }
    } as GridOptions;

    this.spinnerService.show();
    try {
      this.pokemonService
        .getAllPokemonList()
        .subscribe(
          result => {
            this.spinnerService.hide();
            this.gridOptions.api?.setRowData(result.results);
          }
        );

    } catch (err) {
      this.spinnerService.hide();
      console.log('API get error of pokemon list', err);
    }
  }

  private createColumnDefs(): object[] {
    return [
      { field: 'name', filter: 'agTextColumnFilter' },
      { field: 'url', filter: 'agTextColumnFilter' },
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
      // Navigate to detail page for clicked row
      onRowClicked: (event) => {
        this.modalService.dismissAll();
        this.ngZone.run(() => {
          this.router.navigate([`poke/detail/${event.data.name}`]);
        });
      }
    } as GridOptions;

    this.personalModalTitle = type === 'caught' ? 'Pokemon list I\'ve caught' : 'Pokemon list I want to catch';
    this.modalService.open(content);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.gridOptions.api?.sizeColumnsToFit();
  }
}
