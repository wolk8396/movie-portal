import { RegexPassword } from "../../core/models/password-regex.models";

const PasswordRegex: RegexPassword = {
	character: /[-._!"`'#%&,:;<>=@{}~\\$\\\\(\\)\\*\\+\\/\\\\?\\[\]\\^\\|]+/,
	length_password: /^.{8,20}$/,
	lower_case: /(?=.*[a-z])/,
	numbers: /(?=.*\d)/,
	upper_case: /(?=.*[A-Z])/,
};

export {PasswordRegex}