import Link from 'next/link'
import { ReactNode, FunctionComponent, useEffect, useState } from 'react'
import styles from './styles.module.scss';
import basket from '../../common/services/basket';

type Props = {
  hideCta?: boolean
}

const LargeBasket: FunctionComponent<Props> = ({ hideCta }) => {
  const [total, setTotal] = useState(basket.total);
  const [items, setItems] = useState(basket.items);
  const [questionnaireLink, setQuestionnaireLink] = useState(basket.questionnaireUrl);

  // Update on basket changes
  useEffect(() => {
    window.addEventListener('fnp:basket_changed', () => {
      setTotal(basket.total);
      setItems(basket.items);
      setQuestionnaireLink(basket.questionnaireUrl);
    });
  });

  return (
    <div className={styles.container}>
      <strong className={styles.heading}>${total}</strong>
      <span className={styles.subHeading}>Annual Cost</span>

      <ul className={styles.list}>
        {basket.items.map((item, i) => 
          <li className={styles.list__item} key={i}>
            <span className={styles.description}>{item.name}</span>
            <span className={styles.description}>${item.amount}</span>
          </li>
        )}
      </ul>

      <footer className={styles.footer}>
        <strong className={styles.description}>Total (USD)</strong>
        <strong className={styles.description}>${total}</strong>
      </footer>

      {!hideCta &&
        <Link href={questionnaireLink}>
          <a className={styles.actionButton}>Start Your Company</a>
        </Link>
      }
    </div>
  );
}

LargeBasket.defaultProps = {
  hideCta: false
}

export default LargeBasket;