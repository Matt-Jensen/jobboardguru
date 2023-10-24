import { FunctionComponent, useEffect, useState } from 'react'
import { MAIN_SITE, QUESTIONNAIRE_PATH } from '../../lib/constants';
import basket from '../../common/services/basket';
import styles from './styles.module.scss';

type Props = {
  progress: boolean,
  destination: string
}

const Navigation: FunctionComponent<Props> = ({ destination = 'questionnaire', progress = false }: Props) => {
  const [total, setTotal] = useState(basket.total);
  const [progressValue, setProgressValue] = useState('0');
  const [progressPercent, setProgressPercent] = useState('0');
  const [destUrl, setDestUrl] = useState(destination === 'checkout' ? basket.checkoutUrl : basket.questionnaireUrl);
  const questionnaireUrl = QUESTIONNAIRE_PATH;

  useEffect(() => {
    // Update on basket changes
    window.addEventListener('fnp:basket_changed', () => {
      setTotal(basket.total);
      setDestUrl(destination === 'checkout' ? basket.checkoutUrl : basket.questionnaireUrl);
    });

    // Update progress bar
    window.addEventListener('fnp:progress', (evt) => {
      // @ts-ignore
      const value = evt.detail ? parseFloat(evt.detail) : 0;
      const percent = Math.round(value * 100);
      setProgressValue(`${value}`);
      setProgressPercent(`${percent}`);
    });
  });

  return (
    <nav className={styles.navigation}>
      <a className={styles.navigation__logo} href={MAIN_SITE}>
        <img src="/assets/logo.png" alt="JobBoardGuru logo" />
      </a>

      <a href={destUrl} className={styles.navigation__checkout}>
        <strong className={styles.navigation__checkout__label}>Checkout</strong>
        <u className={styles.navigation__checkout__amount}>${total} + Fees</u> 
      </a>

      {progress && progressPercent !== '0' &&
        <span className={styles.progressBarText}>{progressPercent}% Completed</span>}

      {progress &&
        <progress className={styles.progressBar} value={progressValue}></progress>}
    </nav>
  )
}

export default Navigation;
