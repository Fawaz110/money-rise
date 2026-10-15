import { Component, inject } from '@angular/core';
import { ToastrService, ToastType } from '../../../Core/Services/toastr.service';

@Component({
  imports: [],
  selector: 'app-toastr',
  styleUrl: './toastr.component.scss',
  templateUrl: './toastr.component.html',
})
export class ToastrComponent {
  protected readonly _ToastService = inject(ToastrService);

  protected iconFor(type: ToastType): string {
    const icons: Record<ToastType, string> = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };

    return icons[type];
  }
}
