import { PasswordRules } from "../../core/models/passwordHelper"

const PasswordRequirement: PasswordRules[] =[
	{
		name_rule: 'letters',
		rules:'A-z',
	},
	{
		name_rule:'numbers',
		rules:'0-9',
	},
	{
		name_rule:'length_password',
		rules:'8-20 symbol',
	},
	{ 
		name_rule:'special_symbols',
		rules:'? ! * + % @ $ #',
	},
]

export {PasswordRequirement}