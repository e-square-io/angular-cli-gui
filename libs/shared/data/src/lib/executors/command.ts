import { AngularCommand } from './commands';

export interface Command extends Record<string, string | number | boolean> {
  command: AngularCommand;
}
