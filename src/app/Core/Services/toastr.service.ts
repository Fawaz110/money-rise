import { Service, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: number;
    type: ToastType;
    title: string;
    message: string;
    duration: number;
}

@Service()
export class ToastrService {
    private readonly _toasts = signal<Toast[]>([]);
    readonly toasts = this._toasts.asReadonly();
    private nextId = 0;
    private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

    success(message: string, title = 'Success', duration = 4000): void {
        this.show('success', title, message, duration);
    }

    error(message: string, title = 'Request failed', duration = 5000): void {
        this.show('error', title, message, duration);
    }

    warning(message: string, title = 'Warning', duration = 4000): void {
        this.show('warning', title, message, duration);
    }

    info(message: string, title = 'Information', duration = 4000): void {
        this.show('info', title, message, duration);
    }

    private show(type: ToastType, title: string, message: string, duration: number): void {
        const id = ++this.nextId;
        this._toasts.update(toasts => [...toasts, { id, type, title, message, duration }]);
        if (duration > 0) {
            const timer = setTimeout(() => this.dismiss(id), duration);
            this.timers.set(id, timer);
        }
    }

    dismiss(id: number): void {
        const timer = this.timers.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(id);
        }
        this._toasts.update(toasts =>
            toasts.filter(toast => toast.id !== id)
        );
    }
}
