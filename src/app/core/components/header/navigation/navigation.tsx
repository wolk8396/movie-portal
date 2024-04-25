import { NavLink } from "react-router-dom";
import { NavModel } from "../../../models/nav.models";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface LinksProps {
	data: NavModel[];
	classNameUl: string;
	classNameLi: string;
	classNameLink: string;
	title?: string;
  open: boolean;
	auth?: boolean;
}

const NavigationHeader: React.FC<LinksProps> = props => {
	const { data, classNameUl, classNameLi, classNameLink, title, open, auth} = props;
  const isActive = classNames(classNameUl, {isActive: open});
	const [update, setUpdate] = useState<NavModel[]>(data)

	// useEffect(() => {
	// 	const updateUrl = [...update].map(item => {
	// 		const url = item.name === 'Favorites' && auth ? item.url = 'sign-up' : item.url
	// 		return {
	// 			...item,
	// 			url: url
	// 		}
	// 	})
	// }, [auth])

	return (
		<ul className={isActive}>
			{data.map(({ name, url, id }) => (
				<li key={id} className={classNameLi} >
					{title}
					<NavLink  className={classNameLink} to={url}>
						{name}
					</NavLink >
				</li>
			))}
		</ul>
	);
};

export default React.memo(NavigationHeader);
