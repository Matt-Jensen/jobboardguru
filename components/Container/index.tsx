import { ReactNode, FunctionComponent } from 'react'
import styles from './styles.module.scss';

type Props = {
  children?: ReactNode
}

const Container: FunctionComponent = ({ children }: Props) => {
  return <main className={styles.container}>{children}</main>
}

export default Container
