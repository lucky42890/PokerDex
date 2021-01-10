import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonListAComponent } from './pages/pokemon-list-a/pokemon-list-a.component';

const routes: Routes = [
  { path: 'list', component: PokemonListComponent },
  { path: 'list-a', component: PokemonListAComponent },
  { path: 'detail/:name', component: PokemonDetailComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
