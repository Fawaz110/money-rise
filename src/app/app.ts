import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private _TranslateService = inject(TranslateService);

  constructor() {
    this._TranslateService.addLangs(['ar', 'en']);
    this._TranslateService.use("ar")
  } 
}
