import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

interface Option {
  value: any
  label?: string
}

type Props = {
  name: string
  options: Option[]
  onChange?: (evt: any) => void
}

const CheckboxInput: FunctionComponent<Props> = ({
  name,
  options,
  onChange
}) => {
  return <div className={styles.formField}>
    {options.map((option, i) => {
      const optionId = `${name}-${option.value}`;

      return <div key={i} className={styles.formField__row}>
        <input
          id={optionId}
          type="checkbox"
          className={styles.formField__control}
          value={option.value}
          onChange={onChange}
          name={name} />
        {option.label && <label htmlFor={optionId} className={styles.label}>{option.label}</label>}
      </div>
    })}
  </div>;
}

CheckboxInput.defaultProps = {
  onChange: () => {} // noop
};

export default CheckboxInput;
