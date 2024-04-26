import { Component, OnDestroy, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, take, takeUntil } from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

	readonly loginForm = this.formBuilder.group({
		username: [
			'',
			[
				Validators.required,
				Validators.minLength(3),
			],	
		],
		password: [
			'',
			[
				Validators.required,
				Validators.minLength(6),
			],
		],
		storeToken: [false],
	});

	isUsernameOrPasswordWrong = false;

	readonly destroy$ = new ReplaySubject<void>(1);

	constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: NonNullableFormBuilder,
		private readonly router: Router,
	) {
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	get username() {
		return this.loginForm.controls.username;
	}

	get password() {
		return this.loginForm.controls.password;
	}

	get storeToken() {
		return this.loginForm.controls.storeToken;
	}

	performLogin() {
		this.authService.login(
			this.loginForm.controls.username.value,
			this.loginForm.controls.password.value,
			this.loginForm.controls.storeToken.value,
		).pipe(
			take(1),
			takeUntil(this.destroy$),
		).subscribe((isLoggedIn: boolean) => {
			setTimeout(() => this.isUsernameOrPasswordWrong = !isLoggedIn);

			if (isLoggedIn) {
				this.router.navigate([ '/', 'user-content' ]);
			}
		});
	}
}
