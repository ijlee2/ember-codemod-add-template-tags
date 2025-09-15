export const SOURCE_FOR_EXTERNAL_PACKAGES = {
  node: undefined,
  'v1-addon': 'addon',
  'v1-app': undefined,
  'v2-addon': 'dist',
  'v2-app': undefined,
} as const;

export const SOURCE_FOR_INTERNAL_PACKAGES = {
  node: undefined,
  'v1-addon': 'addon',
  'v1-app': 'app',
  'v2-addon': 'src',
  'v2-app': 'app',
} as const;
