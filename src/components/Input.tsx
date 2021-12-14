import React, { FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  id?: string;
  name: string;
  label?: ReactNode;
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler;
  rows?: number;
  readOnly?: boolean;
}

const Input: FunctionComponent<Props> = ({
  id, name, label, type = 'text', placeholder,
  className, value, onChange, rows = 4, readOnly = false,
}) => (
  <label className="textbox-container" htmlFor={id || name}>
    {label && <span className="label-text">{label}</span>}
    {
      type === 'textarea'
        ? (
          <textarea
            data-testid="textarea"
            id={id || name}
            name={name}
            className={cx('textbox', className)}
            value={value}
            onChange={onChange}
            rows={rows}
            readOnly={readOnly}
            placeholder={placeholder}
          />
        )
        : (
          <input
            data-testid="input"
            id={id || name}
            name={name}
            type={type}
            className={cx('textbox', className)}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
          />
        )
    }
  </label>
);

export default Input;
