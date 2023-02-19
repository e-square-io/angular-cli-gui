import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { map } from 'rxjs';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { CoreService } from './app/core/core.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient, core: CoreService) => () =>
        http.get<string[]>(`/api/workspace`).pipe(
          map((projectNames) =>
            core.update({
              projectNames,
              currentProjectName: projectNames?.[0],
            })
          )
        ),
      deps: [HttpClient, CoreService],
      multi: true,
    },
  ],
}).catch(err => console.error(err));
