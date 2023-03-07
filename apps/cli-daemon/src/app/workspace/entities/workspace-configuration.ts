export interface ExtractValuePaths {
  path: string;
  overridePath?: string;
}
export const configurationsPaths: ExtractValuePaths[] = [
  { path: 'definitions.project.properties.prefix', overridePath: 'prefix' },
  { path: 'definitions.project.properties.root', overridePath: 'root' },
  {
    path: 'definitions.project.properties.sourceRoot',
    overridePath: 'sourceRoot',
  },
];
