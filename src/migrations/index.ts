import * as migration_20260807_010156_initial from './20260807_010156_initial';
import * as migration_20260810_210851_phase_2_data_model from './20260810_210851_phase_2_data_model';

export const migrations = [
  {
    up: migration_20260807_010156_initial.up,
    down: migration_20260807_010156_initial.down,
    name: '20260807_010156_initial',
  },
  {
    up: migration_20260810_210851_phase_2_data_model.up,
    down: migration_20260810_210851_phase_2_data_model.down,
    name: '20260810_210851_phase_2_data_model'
  },
];
