import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, SidenavComponent } from '@angular-cli-gui/ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeneratorsService } from '../services/generatos-service/generators.service';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsComponent implements OnInit {
  public menuItems$!: Observable<MenuItem[]>;

  constructor(private generatorsService: GeneratorsService) {}

  ngOnInit(): void {
    this.menuItems$ = this.generatorsService.getGeneratorsList().pipe(
      map((generatorList) => {
        return generatorList.map((generator) => ({
          displayName: generator.displayName,
          url: generator.originalName,
        }));
      })
    );
  }
}
