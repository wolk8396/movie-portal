import React, { useEffect } from 'react';

import './passwoedHelper.scss'

import classNames from "classnames";
import { passwordMassages } from "../../../shared/consts/messages";
import { PasswordRules, ValidPassword } from "../../../core/models/passwordHelper";
import { useHelperPassWordValidator } from '../../../core/hooks/validatorHook';


interface HelperPasswordProps {
	requirements: PasswordRules[],
	classUl:string;
	classLi:string;
	value:string;
	isValidField: boolean;
}

const HelperPassword = (props: HelperPasswordProps) => {
	const { allValuePassword, validPassword, checkPassWord} = useHelperPassWordValidator();
	const {isValidField, classUl, classLi, value, requirements} = props;
	const { requirementsMassages, errorMassages } = passwordMassages;
	const classNameUrl = classNames(classUl, {isValid: allValuePassword}, {isHidden: !isValidField});
	const title = allValuePassword ? requirementsMassages : errorMassages;

	useEffect(() => {
		checkPassWord(value);
	}, [value])

	return (
		<>
			<ul className={classNameUrl}>{title}
				{requirements.map(({name_rule, rules}, i) => 
					<li key={i} 
						className={classNames(classLi, {isActive: validPassword[name_rule]})}
					>{rules}
					</li>
				)}
			</ul>
		</>
	)
}

export default HelperPassword;