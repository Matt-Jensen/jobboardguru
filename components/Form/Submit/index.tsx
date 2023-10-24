import { ReactNode, FunctionComponent } from 'react'
import styles from './styles.module.scss';
import formStyles from '../styles.module.scss';

type Props = {
  callToAction: string
  label?: string
  disabled?: boolean
  type?: string
  large?: boolean
  alignRight?: boolean
  onClick?: () => void
}

const Submit: FunctionComponent<Props> = ({
  callToAction,
  label,
  type,
  large,
  alignRight,
  disabled,
  onClick
}) => {
  const largeButtonClass = large ? ` ${styles['button--large']}` : ''
  const alignRightClass = alignRight ? ` ${styles['container--right']}` : '';
  const submitClass = type === 'submit' ? ` ${styles['container--submit']}` : '';

  return <div className={`${styles.container}${alignRightClass}${submitClass}`.trim()}>
  {label && <label className={formStyles.label}>{label}</label>}
   {/* @ts-ignore */}
    <button className={`${styles.button}${largeButtonClass}`} type={type} disabled={disabled} onClick={() => onClick()}>
      {callToAction}
    </button>
  </div>
}

Submit.defaultProps = {
  label: '',
  type: 'submit',
  disabled: false,
  large: false,
  alignRight: false,
  onClick: () => {} // noop
};

export default Submit;