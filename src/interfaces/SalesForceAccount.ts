export interface SalesForceAccount {
	name: string;
	phone: string;
	country: string;
}

export interface SalesForceContact {
	FirstName: string;
	LastName: string;
	Email: string;
	Phone: string;
	AccountId: string;
	Title: string;
}

export interface SalesForceUser {
	attributes: Attributes;
	Id: string;
	AccountId: string;
}

export interface Attributes {
	type: string;
	url: string;
}
