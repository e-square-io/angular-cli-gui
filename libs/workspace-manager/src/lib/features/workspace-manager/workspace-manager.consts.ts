type BaseLink = { displayName: string; href: string; icon: string };
export const LINKS = [
  { displayName: 'Workspaces', href: 'workspaces-list', icon: 'view_list' },
  { displayName: 'Create', href: 'create-workspace', icon: 'add_circle' },
  { displayName: 'Connect', href: 'connect-workspace', icon: 'link' },
] as const satisfies Readonly<BaseLink[]>;

export type Link = (typeof LINKS)[number];
