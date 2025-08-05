"use client";

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
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { type FC, useReducer } from "react";
import { useForm } from "react-hook-form";
import { FaRegQuestionCircle, FaSearch } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { tabs, topics } from "@/constants";
import { useImageDropzone } from "@/hooks/useImageDropZone";
import type { FormSettings, GeneralSettingsProps } from "@/interfaces";
import { useDebouncedSearch } from "../hooks/useDebounceSearch";
import { initialState, reducer } from "../store/generalSettingsState";
import {
	deleteSelectedUser,
	selectUser,
} from "../utils/handleUsersInSelectState";
import { submitGeneralSettings } from "../utils/submitGeneralSettings";

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
			session
		);
	};

	const handleSearchInputChange = (value: string) => {
		dispatch({ type: "SET_INPUT_VALUE", payload: value });
		debouncedSearch(value);
	};

	return (
		<form
			className="mx-auto mt-4 flex w-[90%] max-w-[1240px] flex-col gap-3 sm:w-[95%]"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="md:flex md:gap-8">
				<Input
					autoFocus
					className="w-full"
					errorMessage={t("fieldRequired")}
					isInvalid={Boolean(errors.title)}
					label={t("title")}
					radius="sm"
					variant="bordered"
					{...register("title", {
						required: true,
					})}
				/>
				<Select
					className="mt-3 w-full md:mt-0"
					errorMessage={t("fieldRequired")}
					isInvalid={Boolean(errors.topic)}
					label={t("topic")}
					onSelectionChange={(topics) =>
						dispatch({ type: "SET_TOPICS", payload: topics })
					}
					radius="sm"
					selectedKeys={state.topicsState}
					selectionMode="single"
					variant="bordered"
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
						className={`mt-3 w-full md:mt-0 ${!state.topicsState.has("Other") && "hidden"}`}
						errorMessage={t("fieldRequired")}
						isInvalid={Boolean(errors.otherTopic)}
						//@ts-expect-error
						isRequired={state.topicsState.has("Other")}
						label={t("addTopic")}
						radius="sm"
						variant="bordered"
						{...register("otherTopic", {
							//@ts-expect-error
							required: state.topicsState.has("Other"),
						})}
					/>
				}
			</div>
			<Textarea
				className="w-full"
				endContent={
					<Tooltip
						content={<p className="p-2">This field supports markdown</p>}
					>
						<Button isIconOnly variant="light">
							<FaRegQuestionCircle size={20} />
						</Button>
					</Tooltip>
				}
				errorMessage={t("fieldRequired")}
				label={t("description")}
				radius="sm"
				variant="bordered"
				{...register("description", { required: true })}
			>
				Description
			</Textarea>

			<Select
				className="w-full"
				label={t("tags")}
				radius="sm"
				selectionMode="multiple"
				variant="bordered"
				{...register("tags")}
			>
				{tabs.map((tag) => (
					<SelectItem key={tag.id}>{t2(tag.value)}</SelectItem>
				))}
			</Select>
			<div
				{...getRootProps({ className: "dropzone" })}
				className="cursor-pointer rounded-md border-2 border-default-200 p-3"
			>
				<label className="text-default-500">{t("addImage")}</label>
				<input className="w-full" type="file" {...getInputProps()} />

				<p className="text-default-500">
					{t("dropImage")}{" "}
					<span className="cursor-pointer font-semibold text-blue-600">
						{t("clickHere")}
					</span>{" "}
					{t("toSelectFromYourDevice")}
				</p>
				<ul>{state.image?.name}</ul>
			</div>
			<Checkbox
				className=""
				isSelected={state.isFormPublic}
				onValueChange={(isFormPublic) =>
					dispatch({ type: "SET_FORM_PUBLIC", payload: isFormPublic })
				}
				radius="sm"
				{...register("isPublic")}
			>
				{t("makeFormPublic")}
			</Checkbox>
			{!state.isFormPublic && (
				<>
					<div className="mt-1 flex gap-3">
						<Select
							className="w-48"
							label={t("searchBy")}
							onSelectionChange={(searchingBy) =>
								dispatch({ type: "SET_SEARCHING_BY", payload: searchingBy })
							}
							radius="sm"
							selectedKeys={state.searchingBy}
							selectionMode="single"
							size="sm"
							variant="bordered"
						>
							<SelectItem key="username">{t("name")}</SelectItem>
							<SelectItem key="email">{t("email")}</SelectItem>
						</Select>
						<Autocomplete
							aria-label="autocomplete"
							aria-labelledby="autocomplete-label"
							className="w-full"
							inputValue={state.inputValue}
							isClearable
							onInputChange={(value) => handleSearchInputChange(value)}
							onSelectionChange={(value) =>
								selectUser(value as string, state, dispatch)
							}
							placeholder={t("searchPlaceholder")}
							radius="sm"
							size="lg"
							startContent={<FaSearch />}
							variant="bordered"
						>
							{state.users.map((user) => (
								<AutocompleteItem
									key={user.id}
									textValue={`${user.name} ${user.email}`}
								>
									<User description={user.email} name={user.name} />
								</AutocompleteItem>
							))}
						</Autocomplete>
					</div>

					<div className="flex min-h-24 w-full flex-col items-start gap-2 rounded-lg border-2 border-default-200 p-4 sm:flex-row sm:flex-wrap sm:gap-4">
						{state.selectedUsers.map((user) => (
							<div
								className="mb-1 flex items-start rounded-lg border-2 border-default-200 p-2"
								key={user.id}
							>
								<User
									className="min-w-56 justify-start"
									description={user.email}
									name={user.name}
								/>
								<Button color="danger" isIconOnly variant="light">
									<IoCloseCircleSharp
										onClick={() => deleteSelectedUser(user.id, state, dispatch)}
										size={24}
									/>
								</Button>
							</div>
						))}
					</div>
				</>
			)}
			<Button
				className="mb-10 font-semibold"
				color="primary"
				isLoading={state.isSubmitting}
				radius="sm"
				type="submit"
				variant="shadow"
			>
				{t("setQuestions")}
			</Button>
		</form>
	);
};
