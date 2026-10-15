import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrComponent } from './Shared/Components/toastr.component/toastr.component';

@Component({
  imports: [RouterOutlet, ToastrComponent],
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
