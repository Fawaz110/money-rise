import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery'

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar implements AfterViewInit {
  @ViewChild('userMenu') userMenuElement!: ElementRef

  ngAfterViewInit(): void {

  }

  // toggleUserMenu() {
  //   let menu = this.userMenuElement.nativeElement as HTMLDivElement;
  //   if (menu.classList.contains('hidden')) {
  //     console.log('hidden need to be shown');
  //     menu.classList.add('opacity-0');
  //     menu.classList.remove('hidden');
  //     setTimeout(() => {
  //       menu.classList.remove('opacity-0');
  //       menu.classList.remove('translate-x-full');
  //     }, 10);
  //   }
  //   else {
  //     menu.classList.add('opacity-0');
  //     menu.classList.add('translate-x-full');
  //     setTimeout(() => {
  //       menu.classList.add('hidden');
  //       menu.classList.remove('opacity-0');
  //     }, 200);
  //   }
  // }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (window.scrollY > 50)
      $('nav').addClass('bg-bg-main');
    else
      $('nav').removeClass('bg-bg-main');

  }

}
