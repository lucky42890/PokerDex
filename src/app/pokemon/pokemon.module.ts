import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonListAComponent } from './pages/pokemon-list-a/pokemon-list-a.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonListAComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    NgbModule,
    AgGridModule.withComponents([]),
  ]
})
export class PokemonModule { }
