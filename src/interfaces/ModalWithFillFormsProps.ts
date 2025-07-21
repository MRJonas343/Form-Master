export interface ModalWithFillFormsProps {
	formId: number;
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: (isOpen: boolean) => void;
}

export interface FilledForms {
	userId: string;
	userName: string;
	filledAt: string;
}
