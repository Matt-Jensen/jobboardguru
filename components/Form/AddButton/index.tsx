import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';
import AddPersonIcon from '../../../public/assets/svgs/add-person.svg';

type Props = {
  callToAction: string
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const AddButton: FunctionComponent<Props> = ({ callToAction, className, disabled, onClick }) => {
  return <div className={`${styles.addButtonContainer} ${className}`.trim()}>
    <button
      className={styles.addButton}
      disabled={disabled}
      onClick={onClick}>
      <AddPersonIcon />
      {callToAction}
    </button>
  </div>
}

AddButton.defaultProps = {
  className: '',
  disabled: false,
  onClick: () => {} // noop
}

export default AddButton;