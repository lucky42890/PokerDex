import { Move } from './move';

export interface Name {
  name: string;
}

export interface MoveStatAffect {
  change: number;
  move: Move;
}

export interface MoveStatAffectSets {
  increase: MoveStatAffect[];
  decrease: MoveStatAffect[];
}

export interface NatureStatAffectSets {
  increase: any[];    // TODO: need to implement correct interface/type
  decrease: any[];    // TODO: need to implement correct interface/type
}

export interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: MoveStatAffectSets;
  affecting_natures: NatureStatAffectSets;
  characteristics: any;     // TODO: need to implement correct interface/type
  move_damage_class: any;   // TODO: need to implement correct interface/type
  names: Name;
}
