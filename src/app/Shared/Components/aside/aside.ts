import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-aside',
  styleUrl: './aside.scss',
  templateUrl: './aside.html',
})
export class Aside {}
