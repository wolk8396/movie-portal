import { NavLink } from "react-router-dom";
import { NavModel } from "../../../models/nav.models";
import React from "react";
import classNames from "classnames";

interface LinksProps {
	data: NavModel[];
	classNameUl: string;
	classNameLi: string;
	classNameLink: string;
	title?: string;
  open: boolean;
}

const NavigationHeader: React.FC<LinksProps> = props => {
	const { data, classNameUl, classNameLi, classNameLink, title, open} = props;
  const isActive = classNames(classNameUl, {isActive: open});

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
