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
  increase: any[];
  decrease: any[];
}

export interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: MoveStatAffectSets;
  affecting_natures: NatureStatAffectSets;
  characteristics: any;
  move_damage_class: any;
  names: Name;
}
