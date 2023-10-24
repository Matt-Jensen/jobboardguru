import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

type Props = {
  children?: ReactNode
}

const ContainerHeader: FunctionComponent = ({ children }: Props) => {
  return <header className={styles.container__header}>
    <h3 className={styles.heading}>{children}</h3>
  </header>
}

export default ContainerHeader;