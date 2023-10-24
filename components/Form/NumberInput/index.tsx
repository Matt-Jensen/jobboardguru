import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

type Props = {
  name: string
  id?: string
  label?: string
  placeholder?: string
  max?: string
  min?: string
  step?: string
  postfix?: string
  value?: string | number
  onChange?: (evt: any) => void
}

const TextInput: FunctionComponent<Props> = ({
  name,
  id,
  label,
  placeholder,
  max,
  min,
  step,
  postfix,
  value,
  onChange
}) => {
  const postfixClass = postfix ? ` ${styles['formField--postfix']}` : '';

  return <div className={`${styles.formField}${postfixClass}`}>
    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    <input
      id={id}
      type="number"
      className={styles.formField__control}
      placeholder={placeholder}
      name={name}
      max={max}
      min={min}
      step={step}
      value={value}
      onChange={onChange} />
    {postfix && <span className={styles.formField__postfix}>{postfix}</span>}
  </div>;
}

TextInput.defaultProps = {
  id: '',
  label: '',
  placeholder: '',
  max: '',
  min: '',
  step: '',
  postfix: '',
  value: '',
  onChange: () => {} // noop
};

export default TextInput;
