import Link from 'next/link'
import { ReactNode, FunctionComponent, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import basket from '../../common/services/basket';
import AddOns from './AddOns';
import styles from './styles.module.scss';
import { FEATURES } from './data';

type Props = {}

const LandingFeatures: FunctionComponent<Props> = ({}) => {
  const [questionnaireLink, setQuestionnaireLink] = useState(basket.questionnaireUrl);

  // Update on basket changes
  useEffect(() => {
    window.addEventListener('fnp:basket_changed', () => {
      setQuestionnaireLink(basket.questionnaireUrl);
    });
  });

  return (
    <section className={styles.container}>
      <div className={styles.container__main}>
        <h5 className={styles.groupHeading}>All Packages Include</h5>
        <ul className={styles.featureList}>
          {FEATURES.map((feature, i) => 
            <li className={styles.featureList__item} key={i}>
              <LazyLoadImage
                className={styles.featureList__item__aside}
                alt={feature.imageAlt}
                height={24}
                width={24}
                src={`/assets/components/landingFeatures/${feature.imageSrc}`} />

              <div className={styles.featureList__item__main}>
                <h6 className={styles.featureHeading}>{feature.heading}</h6>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </li>
          )}
        </ul>

        <aside className={styles.container__main__callToAction}>
          <Link href={questionnaireLink}>
            <a className={styles.actionButton}>Start Your Company</a>
          </Link>
        </aside>

        <h5 className={styles.groupHeading}>Looking for additional services?</h5>

        <AddOns />
      </div>
    </section>
  );
};

export default LandingFeatures;