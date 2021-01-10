import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListAComponent } from './pokemon-list-a.component';

describe('PokemonListAComponent', () => {
  let component: PokemonListAComponent;
  let fixture: ComponentFixture<PokemonListAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
