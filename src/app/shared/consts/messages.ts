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

const emailValid = 'Please enter a valid email';

const Password = 'The password must contain from 8 to 20 characters.';

const singUpError = 'the email exists in the system';
const notifications = 'Please log in or register';
const singInError = 'Email or Password is incorrect';

export {
  deleteFavoritesText, 
  passwordMassages, 
  confirmPassword, 
  emailValid, 
  Password, 
  singUpError,
  notifications,
  singInError
};