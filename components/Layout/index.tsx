import { FunctionComponent } from 'react';
import Meta from '../meta'
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode
}

const Layout: FunctionComponent = ({ children }: Props) => {
  return (
    <>
      <Meta />
      {children}
      {/*<Footer />*/}
    </>
  )
}

export default Layout
