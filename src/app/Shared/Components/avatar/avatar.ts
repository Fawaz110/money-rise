import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [NgClass],
  selector: 'app-avatar',
  styleUrl: './avatar.scss',
  templateUrl: './avatar.html',
})
export class Avatar {
  @Input() name: string = ''
  @Input() size: 'sm' | 'md' | 'lg' = 'sm'
  @Input() border: boolean = false;
  @Input() dot: boolean = false;
  @Input() profile?: string
  
  getAvatarLetters = (): string => this.name.split(" ")[0][0] + this.name.split(" ")[this.name.split(" ").length - 1][0]
  
  getAvatarBorder = (): string => this.border ? 'border border-green-base/20' : '';
  
  getAvatarSize = (): string => {
    switch (this.size) {
      case 'md':
        return 'min-w-12 size-12'
        break;
      case 'lg':
        return 'min-w-14 size-14';
        break;
      default:
        return 'min-w-10 size-10';
        break;
    }
  }
}
