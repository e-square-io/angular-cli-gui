import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'cli-configuration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent {}
