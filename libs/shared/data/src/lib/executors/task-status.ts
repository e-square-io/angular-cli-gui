import { TerminalRecord } from './terminal-record';

export interface TaskStatus {
  stdOut: TerminalRecord[];
  stdErr: TerminalRecord[];
  isRunning: boolean;
  exitCode?: number | null;
}
