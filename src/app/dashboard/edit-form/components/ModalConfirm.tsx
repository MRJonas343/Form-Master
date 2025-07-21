import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

interface ModalConfirmProps {
	onConfirm: () => void;
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: (isOpen: boolean) => void;
}

export default function ModalConfirm({
	onConfirm,
	isOpen,
	onOpenChange,
}: ModalConfirmProps) {
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Delete question
							</ModalHeader>
							<ModalBody>
								This action will delete all the answers for this question
							</ModalBody>
							<ModalFooter>
								<Button variant="light" onPress={onClose} radius="sm">
									Close
								</Button>
								<Button
									onPress={onConfirm}
									radius="sm"
									variant="light"
									color="danger"
								>
									Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
