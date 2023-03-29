import { MenuItem } from '@angular-cli-gui/ui/sidenav';

export const HOME_MENU_ITEMS: MenuItem[] = [
  {
    url: '/generators',
    displayName: 'Generators',
    icon: 'generating_tokens',
  },
  {
    url: '/workspace-manager',
    displayName: 'Workspace Manager',
    icon: 'workspaces',
  },
];
