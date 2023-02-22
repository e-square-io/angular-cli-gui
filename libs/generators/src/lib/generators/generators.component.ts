import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
})
export class GeneratorsComponent {

  menuItems = ['Component', 'Directive', 'Module', 'Pipe'];

}
