import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
})
export class LoggedLayoutComponent {}
