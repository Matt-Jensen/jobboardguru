import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

interface Option {
  name: string,
  value: any
}

type Props = {
  name: string
  options: Option[]
  value?: any
  id?: string
  label?: string
  disabled?: boolean
  onChange?: (evt: any) => void
}

const SelectMenu: FunctionComponent<Props> = ({
  name,
  id,
  label,
  options,
  value,
  disabled,
  onChange
}) => {
  return <div className={styles.formField}>
    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    <select
      id={id}
      className={styles.formField__control}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}>
      {options.map((option, i) => <option key={i} value={option.value}>{option.name}</option>)}
    </select>
  </div>;
}

SelectMenu.defaultProps = {
  id: '',
  label: '',
  value: '',
  disabled: false,
  onChange: () => {} // noop
};

export default SelectMenu;
