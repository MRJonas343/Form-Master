// ⚠️ BARREL EXPORTS DISABLED FOR SERVER ACTIONS
//
// This barrel export file has been disabled because Next.js server actions
// (functions with "use server") create conflicting $$ACTION_0 identifiers
// when re-exported through barrel files.
//
// All imports must now be direct imports from individual service files:
// ❌ import { createForm } from "@/services";
// ✅ import { createForm } from "@/services/forms/createForm";
//
// This is a known Next.js limitation with server actions and barrel exports.

/* ORIGINAL EXPORTS - COMMENTED OUT TO PREVENT $$ACTION_0 CONFLICTS

export * from "./auth/authorize";
export * from "./auth/createUser";
export * from "./auth/signInWithGithub";
export * from "./comments/createComment";
export * from "./comments/getComments";
export * from "./edit-form/addQuestion";
export * from "./edit-form/deleteQuestion";
export * from "./edit-form/getFormToEdit";
export * from "./edit-form/swapQuestions";
export * from "./edit-form/updateFormQuestions";
export * from "./edit-form/updateFormSetting";
export * from "./filledForms/fillForm";
export * from "./filledForms/getFilledForm";
export * from "./filledForms/getFilledForms";
export * from "./filledForms/getFormQuestions";
export * from "./filledForms/isFormAlreadyFill";

export * from "./forms/createForm";
export * from "./forms/deleteForm";
export * from "./forms/getAllFormsByUserId";
export * from "./forms/getFilledForms";
export * from "./forms/getFormById";
export * from "./forms/getFormResults";
export * from "./forms/getFormsByTag";
export * from "./forms/getFormsWithFullTextSearch";
export * from "./forms/getLatestForms";
export * from "./forms/getPopularForms";
export * from "./forms/getUserForms";
export * from "./forms/setNewFormQuestions";
export * from "./lang/local";
export * from "./permissions/checkFormOwnership";
export * from "./permissions/checkPermission";
export * from "./salesforce/createAccount";
export * from "./salesforce/createContact";
export * from "./salesforce/getAccessToken";
export * from "./salesforce/searchAccount";
export * from "./users/blockUser";
export * from "./users/chekUserStatus";
export * from "./users/deleteUser";
export * from "./users/getAllUsers";
export * from "./users/getUserById";

*/
