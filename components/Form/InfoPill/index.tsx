import { ReactNode, FunctionComponent } from 'react'
import InfoIcon from '../../../public/assets/svgs/info-icon.svg';
import styles from '../styles.module.scss';

type Props = {
  content: string,
}

const InfoPill: FunctionComponent<Props> = ({ content }) => {
  return <div className={styles.infoPill}>
    <InfoIcon />
    {content}
  </div>
}

export default InfoPill;