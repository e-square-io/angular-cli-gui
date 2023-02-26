import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimations(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (http: HttpClient, core: CoreService) => () =>
    //     http.get<string[]>(`/api/workspace`).pipe(
    //       map((projectNames) =>
    //         core.update({
    //           projectNames,
    //           currentProjectName: projectNames?.[0],
    //         })
    //       )
    //     ),
    //   deps: [HttpClient, CoreService],
    //   multi: true,
    // },
  ],
}).catch((err) => console.error(err));
