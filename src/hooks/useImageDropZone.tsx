import { useDropzone } from "react-dropzone";
import type { FormSettingsAction } from "@/app/dashboard/edit-form/store/state";
import type { Action } from "@/app/dashboard/store/generalSettingsState";

interface UseImageDropzoneProps {
	dispatch: (value: Action) => void;
}

interface UseImageDropzoneProps2 {
	dispatch: (value: FormSettingsAction) => void;
}

export const useImageDropzone = ({ dispatch }: UseImageDropzoneProps) => {
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".webp"],
		},
		onDrop: (acceptedFiles) => {
			dispatch({ type: "SET_IMAGE", payload: acceptedFiles[0] });
		},
	});

	return { getRootProps, getInputProps };
};

interface UseImageDropzoneProps {
	dispatch: (value: Action) => void;
}

export const useImageDropzone2 = ({ dispatch }: UseImageDropzoneProps2) => {
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".webp"],
		},
		onDrop: (acceptedFiles) => {
			dispatch({ type: "SET_IMAGE", payload: acceptedFiles[0] });
		},
	});

	return { getRootProps, getInputProps };
};
