import { FunctionComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MAIN_SITE } from '../../lib/constants';
import styles from './styles.module.scss';

const SuccessHero: FunctionComponent = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <LazyLoadImage
          className={styles.featureList__item__aside}
          alt="Internal Server Error"
          height={68}
          width={68}
          src={`/assets/components/successHero/server-error@2x.webp`} />
        <h1 className={styles.heading}>Checkout Failed</h1>
        <p className={styles.subHeading}>Unfortunately, we are experiencing some unforeseen issues with our system.  To guarantee the security of your personal information it has not been stored.</p>
      </header>

      <footer className={styles.footer}>
        <p>Please check back again soon.</p>
        <a href={MAIN_SITE}>Return to JobBoardGuru</a>
        <br /><br /><br /><br />
        <p>If you would like to get in touch with the team or have any questions, <a href="mailto:mjens02@gmail.com">please email us</a></p>
      </footer>
    </section>
  );
}

export default SuccessHero;
