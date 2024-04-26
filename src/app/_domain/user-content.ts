export interface UserContent {
	readonly quoteOfTheDay?: Quote;
	readonly catUrl?: string;
}

export interface Quote {
	readonly content: string;
	readonly author: string;
}