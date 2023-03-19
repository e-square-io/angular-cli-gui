export const COMMANDS = ['build', 'lint', 'serve', 'test'] as const;
export type AngularCommand = (typeof COMMANDS)[number];
