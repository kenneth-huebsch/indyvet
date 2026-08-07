import * as migration_20260807_010156_initial from './20260807_010156_initial'

export const migrations = [
  {
    up: migration_20260807_010156_initial.up,
    down: migration_20260807_010156_initial.down,
    name: '20260807_010156_initial',
  },
]
