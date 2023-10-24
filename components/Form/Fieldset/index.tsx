import { ReactNode, FunctionComponent } from 'react'
import styles from '../styles.module.scss';

type Props = {
  legend: string,
  layout?: string,
  children?: ReactNode
}

const LAYOUTS = {
  '2-column-grid': styles['fieldset__main--grid']
};

const Fieldset: FunctionComponent<Props> = ({ children, legend = "", layout }) => {
  // @ts-ignore
  const layoutClass = layout ? LAYOUTS[`${layout}`] || '' : '';
  return <fieldset className={styles.fieldset}>
    {legend && <h6 className={styles.fieldset__legend}>{legend}</h6>}

    <div className={`${styles.fieldset__main} ${layoutClass}`.trim()}>
      {children}
    </div>
  </fieldset>
}

Fieldset.defaultProps = {
  layout: ''
};

export default Fieldset;