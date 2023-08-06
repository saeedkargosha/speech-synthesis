import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface IProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type'> {
  disabled?: boolean;
  uppercase?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  disabled = false,
  className = '',
  uppercase = false,
  isLoading = false,
  ...rest
}: IProps) => {
  const classname = clsx('', {
    [className]: className,
    upp: uppercase,
  });
  return (
    <button className={classname} disabled={disabled} {...rest}>
      {!isLoading ? children : <span>{'Loading'}</span>}
    </button>
  );
};

export default Button;
