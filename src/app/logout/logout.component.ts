import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnDestroy {

	readonly destroy$ = new ReplaySubject<void>(1);

	constructor(
		authService: AuthService,
		router: Router,
	) {
		authService.logout();

		timer(5_000).pipe(
			takeUntil(this.destroy$),
		).subscribe(() => router.navigate([ '/' ]));
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
