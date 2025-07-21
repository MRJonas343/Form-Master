"use client";

import {
	Button,
	Input,
	Select,
	Textarea,
	Checkbox,
	Tooltip,
	Autocomplete,
	AutocompleteItem,
	User,
} from "@nextui-org/react";
import type { FormSettings, GeneralSettingsProps } from "@/interfaces";
import { tabs, topics } from "@/constants";
import { FaRegQuestionCircle, FaSearch } from "react-icons/fa";
import { SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useReducer, type FC } from "react";
import { useTranslations } from "next-intl";
import { IoCloseCircleSharp } from "react-icons/io5";
import { initialState, reducer } from "../store/generalSettingsState";
import { submitGeneralSettings } from "../utils/submitGeneralSettings";
import { useImageDropzone } from "@/hooks/useImageDropZone";
import { useDebouncedSearch } from "../hooks/useDebounceSearch";
import {
	deleteSelectedUser,
	selectUser,
} from "../utils/handleUsersInSelectState";

export const GeneralSettings: FC<GeneralSettingsProps> = ({
	changeTab,
	setFormId,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { getRootProps, getInputProps } = useImageDropzone({ dispatch });
	const debouncedSearch = useDebouncedSearch(state, dispatch);
	const { data: session } = useSession();

	const t = useTranslations("generalSettings");
	const t2 = useTranslations("CloudTags");

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormSettings>();

	const onSubmit = async (data: FormSettings) => {
		if (!session) return;
		await submitGeneralSettings(
			data,
			setFormId,
			changeTab,
			dispatch,
			state,
			session,
		);
	};

	const handleSearchInputChange = (value: string) => {
		dispatch({ type: "SET_INPUT_VALUE", payload: value });
		debouncedSearch(value);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-4 flex flex-col gap-3 w-[90%] sm:w-[95%] mx-auto max-w-[1240px]"
		>
			<div className="md:flex md:gap-8">
				<Input
					autoFocus
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
					radius="sm"
					label={t("topic")}
					variant="bordered"
					isInvalid={Boolean(errors.topic)}
					selectedKeys={state.topicsState}
					onSelectionChange={(topics) =>
						dispatch({ type: "SET_TOPICS", payload: topics })
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
						//@ts-ignore
						className={`w-full mt-3 md:mt-0 ${!state.topicsState.has("Other") && "hidden"}`}
						//@ts-ignore
						isRequired={state.topicsState.has("Other")}
						isInvalid={Boolean(errors.otherTopic)}
						errorMessage={t("fieldRequired")}
						{...register("otherTopic", {
							//@ts-ignore
							required: state.topicsState.has("Other"),
						})}
					/>
				}
			</div>
			<Textarea
				radius="sm"
				variant="bordered"
				label={t("description")}
				className="w-full"
				errorMessage={t("fieldRequired")}
				endContent={
					<Tooltip
						content={<p className="p-2">This field supports markdown</p>}
					>
						<Button isIconOnly variant="light">
							<FaRegQuestionCircle size={20} />
						</Button>
					</Tooltip>
				}
				{...register("description", { required: true })}
			>
				Description
			</Textarea>

			<Select
				radius="sm"
				label={t("tags")}
				variant="bordered"
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
				className="border-2 p-3 border-default-200 rounded-md cursor-pointer"
			>
				<label className="text-default-500">{t("addImage")}</label>
				<input type="file" className="w-full" {...getInputProps()} />

				<p className="text-default-500">
					{t("dropImage")}{" "}
					<span className="text-blue-600 font-semibold cursor-pointer">
						{t("clickHere")}
					</span>{" "}
					{t("toSelectFromYourDevice")}
				</p>
				<ul>{state.image?.name}</ul>
			</div>
			<Checkbox
				radius="sm"
				className=""
				isSelected={state.isFormPublic}
				onValueChange={(isFormPublic) =>
					dispatch({ type: "SET_FORM_PUBLIC", payload: isFormPublic })
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
							inputValue={state.inputValue}
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
				{t("setQuestions")}
			</Button>
		</form>
	);
};
