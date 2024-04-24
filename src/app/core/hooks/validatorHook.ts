import { useState } from "react";
import { ValidPassword } from "../models/passwordHelper";
import { PasswordRegex } from "../../shared/consts/regex-password";


interface ValidatorPassword {
	validPassword: ValidPassword,
	allValuePassword: boolean,
	checkPassWord: Function
};

export const useHelperPassWordValidator = (): ValidatorPassword => {
	const {character, ...isValid} = PasswordRegex;
	const {numbers, length_password, lower_case, upper_case} = isValid;
	const PasswordValid: ValidPassword = {
		length_password: false,
		letters:false,
		numbers: false,
		special_symbols: false
	};
	const [validPassword, setValidPassword] = useState<ValidPassword>(PasswordValid);
	const [allValuePassword, setAllValuePassword] = useState<boolean>(false);

	const CheckPassWordStrength = (value: string): ValidPassword => {
		PasswordValid.length_password = length_password.test(value) ? true : false;
		PasswordValid.letters = lower_case.test(value) && upper_case.test(value);
		PasswordValid.numbers = numbers.test(value) ? true : false;
		PasswordValid.special_symbols = character.test(value) ? true : false;
		return PasswordValid;
	}

	const allValid = (password: ValidPassword): boolean => {
		return Object.values(password).every(value => value);
	}

	const checkPassWord = (value: string) => {
		const PassWordStrength = CheckPassWordStrength(value);
		const valuePassword = allValid(PassWordStrength);
		setAllValuePassword(valuePassword);
		setValidPassword(PassWordStrength);
	}

	return {allValuePassword, checkPassWord, validPassword};
}
