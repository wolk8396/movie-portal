import { MassagesPassword } from "../../core/models/passwordHelper";

const deleteFavoritesText: string ='Are You are sure ? Do you want to remove this film from your Favorites list.';

const passwordMassages: MassagesPassword = {
	errorMassages: 'Field requirements:',
	requirementsMassages: 'Password Requirements:',
};

const confirmPassword: MassagesPassword = {
  errorMassages: 'The fields is required',
  requirementsMassages: 'Both passwords must be the same',
};

export {deleteFavoritesText, passwordMassages, confirmPassword};