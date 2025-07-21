export interface FormSettings {
	title: string;
	description: string;
	tags: string;
	topic: string;
	isPublic: boolean;
	users?: string[];
	otherTopic?: string;
}

export interface FormSettingsType {
	title: string;
	description: string;
	tags: string;
	topic: string;
	isPublic: boolean;
	users?: string[];
	otherTopic?: string;
}

export interface NewFormSettingsType {
	title: string;
	description: string;
	tags: string[];
	topic: string;
	isPublic: boolean;
	users?: string[];
	otherTopic?: string;
}

export interface FormSettingsToUpdate {
	title?: string;
	description?: string;
	topic?: string;
	isPublic?: boolean;
	users?: string[];
	otherTopic?: string;
	tagsToAdd?: number[];
	tagsToDelete?: number[];
	usersToAdd?: string[];
	usersToRemove?: string[];
}
