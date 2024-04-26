import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quote, UserContent } from '../_domain/user-content';

@Injectable({
	providedIn: 'root'
})
export class UserContentService {

	private _userContent$ = new BehaviorSubject<UserContent | null>(null);
	public readonly userContent$ = this._userContent$.asObservable();
	public get userContent() {
		return this._userContent$.getValue();
	}

	constructor(
		private httpClient: HttpClient,
		authService: AuthService,
	) {
		authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
			if (isLoggedIn) {
				this.loadUserContent();
			} else {
				this.resetUserContent();
			}
		});
	}

	private loadUserContent() {
		const category = 'random';
		const quoteUrl = `https://api.quotable.io/${category}`;

		this.httpClient.get<Quote>(quoteUrl).subscribe((quote: Quote) => {
			console.log(quote);

			this._userContent$.next({
				...this.userContent,
				quoteOfTheDay: quote ?? null,
			});
		});

		this._userContent$.next({
			...this.userContent,
			catUrl: `https://cataas.com/cat`,
		});
	}

	private resetUserContent() {
		this._userContent$.next(null);
	}
}
