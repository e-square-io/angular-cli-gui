import { JsonValue } from '@angular-devkit/core';

export interface Project {
  root: string;
  prefix?: string;
  sourceRoot?: string;
  extensions: Record<string, JsonValue | undefined>;
}
