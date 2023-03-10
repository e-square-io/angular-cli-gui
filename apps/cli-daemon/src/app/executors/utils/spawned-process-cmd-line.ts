import { ChildProcessWithoutNullStreams } from 'child_process';

export function spawnedProcessCommandLine(
  spawnedProcess: ChildProcessWithoutNullStreams
): string {
  return spawnedProcess.spawnargs[spawnedProcess.spawnargs.length - 1]
    .replace(/"/gi, '')
    .replace('npx', '')
    .trim();
}
