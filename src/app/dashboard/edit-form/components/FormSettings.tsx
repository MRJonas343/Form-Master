import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Checkbox,
	Input,
	Select,
	SelectItem,
	Textarea,
	Tooltip,
	User,
	Image,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useReducer, useRef } from "react";
import { tabs, topics } from "@/constants";
import { FaRegQuestionCircle, FaSearch } from "react-icons/fa";
import type { FormGeneralData } from "@/interfaces/formDataToUpdate";
import { useForm } from "react-hook-form";
import type { FormSettingsType } from "@/interfaces";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useImageDropzone2 } from "@/hooks/useImageDropZone";
import { formSettingsReducer, initializer } from "../store/state";
import {
	deleteSelectedUser,
	selectUser,
} from "../utils/handleUsersInSelectState";
import { useDebouncedSearch2 } from "../../hooks/useDebounceSearch";
import { onSubmit } from "../utils/submitForm";

const FormSettings = ({ data }: { data: FormGeneralData }) => {
	const [state, dispatch] = useReducer(formSettingsReducer, initializer(data));
	const { getRootProps, getInputProps } = useImageDropzone2({ dispatch });
	const debouncedSearch = useDebouncedSearch2(state, dispatch);
	const initialData = useRef(data);

	const t = useTranslations("generalSettings");
	const t2 = useTranslations("CloudTags");

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormSettingsType>();

	const handleSearchInputChange = (value: string) => {
		dispatch({ type: "SET_TEXT_SEARCH_VALUE", payload: value });
		debouncedSearch(value);
	};

	const submitHandler = async (formData: FormSettingsType) => {
		const newTags =
			typeof formData.tags === "string"
				? formData.tags.split(",")
				: formData.tags;

		const newFormData = {
			...formData,
			tags: newTags,
		};

		dispatch({ type: "SET_IS_SUBMITTING", payload: true });
		await onSubmit(newFormData, initialData, state);
		dispatch({ type: "SET_IS_SUBMITTING", payload: false });
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className="mt-4 flex flex-col gap-3 w-[90%] sm:w-[95%] mx-auto max-w-[1240px]"
		>
			<div className="md:flex md:gap-8">
				<Input
					isRequired
					autoFocus
					defaultValue={data.form.title}
					radius="sm"
					isInvalid={Boolean(errors.title)}
					errorMessage={t("fieldRequired")}
					variant="bordered"
					className="w-full"
					label={t("title")}
					{...register("title", {
						required: true,
					})}
				/>
				<Select
					isRequired
					radius="sm"
					label={t("topic")}
					variant="bordered"
					isInvalid={Boolean(errors.topic)}
					selectedKeys={state.topicsState}
					onSelectionChange={(topics) =>
						dispatch({ type: "SET_TOPICS_STATE", payload: topics })
					}
					errorMessage={t("fieldRequired")}
					selectionMode="single"
					className="w-full mt-3 md:mt-0"
					{...register("topic", {
						required: true,
					})}
				>
					{topics.map((topic) => (
						<SelectItem key={topic.topic}>{topic.topic}</SelectItem>
					))}
				</Select>
				{
					<Input
						radius="sm"
						variant="bordered"
						label={t("addTopic")}
						errorMessage={t("fieldRequired")}
						//@ts-ignore
						className={`w-full mt-3 md:mt-0 ${!state.topicsState.has("Other") && "hidden"}`}
						//@ts-ignore
						isRequired={state.topicsState.has("Other")}
						isInvalid={Boolean(errors.otherTopic)}
						{...register("otherTopic", {
							//@ts-ignore
							required: state.topicsState.has("Other"),
						})}
					/>
				}
			</div>
			<Textarea
				isRequired
				radius="sm"
				variant="bordered"
				defaultValue={data.form.description}
				label={t("description")}
				className="w-full"
				errorMessage={t("fieldRequired")}
				endContent={
					<Tooltip content={<p className="p-2">{t("tooltip")}</p>}>
						<Button isIconOnly variant="light">
							<FaRegQuestionCircle size={20} />
						</Button>
					</Tooltip>
				}
				isInvalid={Boolean(errors.description)}
				{...register("description", {
					required: true,
				})}
			>
				{t("description")}
			</Textarea>

			<Select
				radius="sm"
				label={t("tags")}
				variant="bordered"
				defaultSelectedKeys={data.form.tags.map((tag) => tag.id.toString())}
				selectionMode="multiple"
				className="w-full"
				{...register("tags")}
			>
				{tabs.map((tag) => (
					<SelectItem key={tag.id}>{t2(tag.value)}</SelectItem>
				))}
			</Select>
			<div
				{...getRootProps({ className: "dropzone" })}
				className="border-2 p-3 border-default-200 rounded-lg cursor-pointer"
			>
				<div className="flex items-center gap-2 pb-2">
					{data.form.imageUrl && (
						<Image
							radius="sm"
							src={data.form.imageUrl}
							alt="form image"
							width={40}
							height={40}
						/>
					)}
					<label className="text-default-500 cursor-pointer">
						{t("changeImage")}
					</label>
				</div>
				<input type="file" className="w-full" {...getInputProps()} />

				{!state.image?.name && (
					<p className="text-default-500">
						{t("dropImage")}{" "}
						<span className="text-blue-600 font-semibold cursor-pointer">
							{t("clickHere")}
						</span>{" "}
						{t("toSelectFromYourDevice")}
					</p>
				)}
				<ul>{state.image?.name}</ul>
			</div>
			<Checkbox
				radius="sm"
				className=""
				isSelected={state.isFormPublic}
				onValueChange={(isFormPublic) =>
					dispatch({ type: "SET_IS_FORM_PUBLIC", payload: isFormPublic })
				}
				{...register("isPublic")}
			>
				{t("makeFormPublic")}
			</Checkbox>

			{!state.isFormPublic && (
				<>
					<div className="flex mt-1 gap-3">
						<Select
							label={t("searchBy")}
							radius="sm"
							size="sm"
							variant="bordered"
							selectionMode="single"
							className="w-48"
							selectedKeys={state.searchingBy}
							onSelectionChange={(searchingBy) =>
								dispatch({ type: "SET_SEARCHING_BY", payload: searchingBy })
							}
						>
							<SelectItem key="username">{t("name")}</SelectItem>
							<SelectItem key="email">{t("email")}</SelectItem>
						</Select>
						<Autocomplete
							aria-label="autocomplete"
							aria-labelledby="autocomplete-label"
							radius="sm"
							size="lg"
							isClearable
							startContent={<FaSearch />}
							placeholder={t("searchPlaceholder")}
							className="w-full"
							variant="bordered"
							inputValue={state.textSearchValue}
							onSelectionChange={(value) =>
								selectUser(value as string, state, dispatch)
							}
							onInputChange={(value) => handleSearchInputChange(value)}
						>
							{state.users.map((user) => (
								<AutocompleteItem
									key={user.id}
									textValue={`${user.name} ${user.email}`}
								>
									<User name={user.name} description={user.email} />
								</AutocompleteItem>
							))}
						</Autocomplete>
					</div>

					<div className="border-2 min-h-24 gap-2 p-4 w-full rounded-lg border-default-200 flex flex-col items-start sm:flex-wrap sm:flex-row sm:gap-4">
						{state.selectedUsers.map((user) => (
							<div
								key={user.id}
								className="flex items-start mb-1 border-default-200 border-2 rounded-lg p-2"
							>
								<User
									name={user.name}
									description={user.email}
									className="min-w-56 justify-start"
								/>
								<Button isIconOnly variant="light" color="danger">
									<IoCloseCircleSharp
										size={24}
										onClick={() => deleteSelectedUser(user.id, state, dispatch)}
									/>
								</Button>
							</div>
						))}
					</div>
				</>
			)}
			<Button
				isLoading={state.isSubmitting}
				className="mb-10 font-semibold"
				type="submit"
				color="primary"
				radius="sm"
				variant="shadow"
			>
				{t("updateForm")}
			</Button>
		</form>
	);
};
export default FormSettings;
