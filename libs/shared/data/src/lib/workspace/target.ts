import { JsonValue } from '@angular-devkit/core';

export interface Target {
  options?: Record<string, JsonValue | undefined>;
  configurations?: Record<
    string,
    Record<string, JsonValue | undefined> | undefined
  >;
  defaultConfiguration?: string;
  builder: string;
}
