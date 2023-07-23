import React, { FC } from 'react';
import classNames from 'classnames';
import cls from './button.module.scss';

interface ButtonProps {
	text: string;
	isValid: boolean;
	onClick: () => void;
}

const Button: FC<ButtonProps> = React.memo(({ text, isValid, onClick }) => {
	return (
		<button
			className={classNames({ [cls.button]: true, [cls.invalid]: !isValid })}
			onClick={isValid ? onClick : undefined}
		>
			{text}
		</button>
	);
});

export default Button;
