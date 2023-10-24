import { ReactNode, FunctionComponent, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import COUNTRIES from '../../../config/countries';
import ChevronDownIcon from '../../../public/assets/svgs/chevron-down.svg';
import parentStyles from '../styles.module.scss';
import styles from './styles.module.scss';

type Props = {
  name: string
  id?: string
  label?: string
  value?: string
  defaultCountryCode?: string
  onChange?: (evt: any) => void
}

const PhoneInput: FunctionComponent<Props> = ({
  name,
  id,
  label,
  value,
  defaultCountryCode,
  onChange
}) => {
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [countryData] = COUNTRIES.filter(({ code }) => code === countryCode);
  const countrySelectId = `${id}country-code`;
  const onChangeCountry = (updatedCountryCode: string) => setCountryCode(updatedCountryCode);

  return <div className={parentStyles.formField}>
    {label && <label htmlFor={id} className={parentStyles.label}>{label}</label>}

    <div className={styles.row}>
      <label htmlFor={countrySelectId} className={styles.row__select}>
        <LazyLoadImage
          className={styles.row__select__flag}
          alt={`Flag of ${countryData.name}`}
          width={24}
          height={13}
          src={`/assets/flags/large/flag-${countryCode}.jpg`} />
        <span className={styles.row__select__number}>+{countryData.value}</span>
        <select
          id={countrySelectId}
          className={styles.row__select__menu}
          value={countryCode}
          name="country_code"
          onChange={(evt) => onChangeCountry(evt.target.value)}>
          {COUNTRIES.map((option, i) => <option
            key={i}
            value={option.code}>{option.name} (+{option.value})</option>)}
        </select>
        <ChevronDownIcon />
      </label>

      <input
        id={id}
        name={name}
        type="number"
        className={`${parentStyles.formField__control} ${styles.row__input}`}
        value={value}
        onChange={onChange} />
    </div>
  </div>;
}

PhoneInput.defaultProps = {
  id: '',
  label: '',
  value: '',
  defaultCountryCode: 'us',
  onChange: () => {} // noop
};

export default PhoneInput;

<select name="phoneCountry">
</select>