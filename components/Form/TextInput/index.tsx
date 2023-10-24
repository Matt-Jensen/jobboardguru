import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';
import SuccessCheckIcon from '../../../public/assets/svgs/form-success-check.svg';

type Props = {
  name: string
  id?: string
  value?: string
  label?: string
  placeholder?: string
  success?: boolean
  successMsg?: string
  postfix?: string
  disabled?: boolean
  onChange?: (evt: any) => void
}

const TextInput: FunctionComponent<Props> = ({
  name,
  value,
  success,
  successMsg,
  id,
  label,
  placeholder,
  postfix,
  disabled,
  onChange
}) => {
  const postfixClass = postfix ? ` ${styles['formField--postfix']}` : '';
  const successClass = success ? ` ${styles['formField__control--success']}` : '';

  return <div className={`${styles.formField}${postfixClass}`}>
    {label
      && <label
        htmlFor={id}
        className={styles.label}>
        {success && <SuccessCheckIcon />}
        {label}
        {success && successMsg && <span className={styles.label__successMsg}>{successMsg}</span>}
        </label>
    }
    <input
      id={id}
      className={`${styles.formField__control}${successClass}`}
      type="text"
      placeholder={placeholder}
      value={value}
      name={name}
      disabled={disabled}
      onChange={onChange} />
    {postfix && <span className={styles.formField__postfix}>{postfix}</span>}
  </div>;
}

TextInput.defaultProps = {
  id: '',
  label: '',
  value: '',
  placeholder: '',
  success: false,
  successMsg: '',
  postfix: '',
  disabled: false,
  onChange: () => {} // noop
};

export default TextInput;
