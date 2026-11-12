import * as migration_20261112_085549_initial from './20261112_085549_initial';
import * as migration_20261112_205715_mcp_api_keys from './20261112_205715_mcp_api_keys';

export const migrations = [
  {
    up: migration_20261112_085549_initial.up,
    down: migration_20261112_085549_initial.down,
    name: '20261112_085549_initial',
  },
  {
    up: migration_20261112_205715_mcp_api_keys.up,
    down: migration_20261112_205715_mcp_api_keys.down,
    name: '20261112_205715_mcp_api_keys'
  },
];
