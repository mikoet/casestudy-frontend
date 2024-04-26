import { Component } from '@angular/core';
import { UserContentService } from '../_services/user-content.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { UserData } from '../_domain/user-data';
import { UserContent } from '../_domain/user-content';

@Component({
	selector: 'app-user-content',
	standalone: true,
	imports: [
		AsyncPipe,
		JsonPipe,
	],
	templateUrl: './user-content.component.html',
	styleUrl: './user-content.component.scss'
})
export class UserContentComponent {

	userData$: Observable<UserData | null>;
	userContent$: Observable<UserContent | null>;

	constructor(
		private authService: AuthService,
		private contentService: UserContentService,
	) {
		this.userData$ = this.authService.userData$;
		this.userContent$ = this.contentService.userContent$;
	}
}
