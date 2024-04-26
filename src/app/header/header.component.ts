import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface HeaderItem {
	label: string;
	routerLink: string[];
}

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		AsyncPipe,
		NgClass,
		RouterLink,
		RouterLinkActive,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {

	readonly authService = inject(AuthService);

	readonly items: HeaderItem[] = [
		{
			label: 'Startseite',
			routerLink: [ '/home' ],
		},
		{
			label: 'Über',
			routerLink: [ '/about' ],
		},
	];

	isMenuOpen = false;

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
