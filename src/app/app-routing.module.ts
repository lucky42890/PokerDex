import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'poke', loadChildren: () => PokemonModule },
      { path: '**', redirectTo: 'poke' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
