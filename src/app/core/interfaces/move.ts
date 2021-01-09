/**
 * TODO: need to define interface/type for `any`, for now, defined needed interfaces
 */

import { BasicInfo } from './pokemon';
import { Stat, Name } from './stat';

export interface ContestComboSets {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

export interface ContestComboDetail {
  use_before: any[];
  use_after: any[];
}

export interface MoveFlavorText {
  flavor_text: string;
  language: any;
  version_group: any;
}

export interface MoveMetaData {
  ailment: any;
  category: any;
  min_hits: number;
  max_hits: number;
  min_turns: number;
  max_turns: number;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface MoveStatChange {
  change: number;
  stat: Stat;
}

export interface PastMoveStatValues {
  accuracy: number;
  effect_chance: number;
  power: number;
  pp: number;
  effect_entries: any[];
  type: any;
  version_group: any;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: ContestComboSets;
  contest_type: any;
  contest_effect: any;
  damage_class: any;
  effect_entries: any[];
  effect_changes: any[];
  flavor_text_entries: MoveFlavorText[];
  generation: any;
  machines: any[];
  meta: MoveMetaData;
  names: Name[];
  past_values: PastMoveStatValues[];
  stat_changes: MoveStatChange[];
  super_contest_effect: any;
  target: BasicInfo;
  type: BasicInfo;
}
