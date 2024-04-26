import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserContentComponent } from './user-content/user-content.component';
import { AuthService } from './_services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},

	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'logout',
		component: LogoutComponent,
	},

	{
		path: 'user-content',
		component: UserContentComponent,
		canActivate: [
			(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const authService = inject(AuthService);
				return authService.isLoggedIn$;
			},
		],
	},
];
