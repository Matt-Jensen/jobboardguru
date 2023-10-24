import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

type Props = {
  children?: ReactNode
}

const ContainerSidbar: FunctionComponent = ({ children }: Props) => {
  return <div className={styles.container__content}>{children}</div>
}

export default ContainerSidbar;