import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../_domain/user-data';

const AUTH_TOKEN_STRING = 'authToken';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
	public readonly isLoggedIn$ = this._isLoggedIn$.asObservable();
	public get isLoggedIn() {
		return this._isLoggedIn$.getValue();
	}

	private _userData$ = new BehaviorSubject<UserData | null>(null);
	public readonly userData$ = this._userData$.asObservable();
	public get userData() {
		return this._userData$.getValue();
	}

	constructor() {
		const token = localStorage.getItem(AUTH_TOKEN_STRING);
		if (!!token) {
			this._isLoggedIn$.next(true);
		}
	}

	login(username: string, password: string, storeToken: boolean = false): Observable<boolean> {
		// NOTE Do some fake login and store some user data which could be fetched from the backend.
		const isLoggedInSuccessful = username === 'top' && password === 'secret';

		this._isLoggedIn$.next(isLoggedInSuccessful);
		if (isLoggedInSuccessful) {
			if (storeToken) {
				localStorage.setItem(AUTH_TOKEN_STRING, 'secret user auth token');
			}

			this._userData$.next({
				id: 158,
				firstname: 'Max',
				lastname: 'Mustermann',
			});
		}

		return this.isLoggedIn$;
	}

	logout() {
		localStorage.removeItem(AUTH_TOKEN_STRING);
		this._isLoggedIn$.next(false);
		this._userData$.next(null);
	}
}
