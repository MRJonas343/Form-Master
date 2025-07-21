export interface FormDataToUpdate {
	formGeneralData: FormGeneralData;
	questions: Question[];
}

export interface FormGeneralData {
	form: Form;
	usersWithPermissions: UsersWithPermission[];
}

export interface Form {
	id: number;
	author_id: string;
	created_at: Date;
	title: string;
	topic: string;
	description: string;
	isPublic: boolean;
	imageUrl: string;
	tags: Tags[];
}
export interface Tags {
	id: number;
	tag: string;
}

export interface UsersWithPermission {
	id: string;
	name: string;
	email: string;
}

export interface Question {
	id: number;
	question: string;
	description: string | null;
	displayInTable: boolean;
	order: number;
	type: string;
	formId: number;
	options?: Option[];
}

export interface Option {
	id: number;
	questionId: number;
	optionText: string;
}
