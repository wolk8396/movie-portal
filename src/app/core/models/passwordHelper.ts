interface ValidPassword {
	length_password: boolean,
	letters:boolean,
	numbers: boolean,
	special_symbols: boolean,
	[key:string]: boolean
};

interface PasswordRules {
	rules: string,
	name_rule:string,
	[key: string]: string
};

interface MassagesPassword {
	errorMassages:string,
	requirementsMassages:string
};



export type { MassagesPassword, PasswordRules , ValidPassword};