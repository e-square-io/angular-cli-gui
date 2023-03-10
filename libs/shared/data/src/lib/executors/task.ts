export interface Task {
  pid: number;
  isRunning: boolean;
  exitCode?: number | null;
  commandLine: string;
}
