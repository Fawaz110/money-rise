import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-auth.layout',
  styleUrl: './auth.layout.scss',
  templateUrl: './auth.layout.html',
  standalone: true
})
export class AuthLayout {}
