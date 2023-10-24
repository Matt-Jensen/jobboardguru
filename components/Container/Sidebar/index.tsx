import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

type Props = {
  children?: ReactNode
}

const ContainerSidbar: FunctionComponent = ({ children }: Props) => {
  return <aside className={styles.container__sidebar}>{children}</aside>
}

export default ContainerSidbar
