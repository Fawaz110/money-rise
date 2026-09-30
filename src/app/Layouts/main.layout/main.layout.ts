import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../Shared/Components/navbar/navbar';
import { Aside } from '../../Shared/Components/aside/aside';

@Component({
  imports: [RouterOutlet, Navbar, Aside],
  selector: 'app-main-layout',
  styleUrl: './main.layout.scss',
  templateUrl: './main.layout.html',
  standalone: true
})
export class MainLayout {}
