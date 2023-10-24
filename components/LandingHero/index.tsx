import { ReactNode, FunctionComponent, useState } from 'react'
import Testimonials from './Testimonials';
import basket from '../../common/services/basket';
import useCompany from '../../common/hooks/useCompany';
import styles from './styles.module.scss';

type Props = {}

const LandingHero: FunctionComponent = ({}: Props) => {
  const { companyName, onCompanyNameChange } = useCompany();

  const handleSubmit = (evt: any): void => {
    evt.preventDefault();

    // Redirect user to questionnaire
    window.location.replace(basket.questionnaireUrl);
  };

  return (
    <section className={styles.landingHero}>
      <div className={styles.landingHero__main}>
        <span className={styles.landingHero__pill}>
          <img className={styles.landingHero__pill__icon} src="/assets/flags/usa-circle.png" />
          Now accepting new companies
        </span>

        <h1 className={styles.landingHero__heading}>
          Set up your <u>online business</u> for success in the US from anywhere in the world!
        </h1>

        <p className={styles.landingHero__description}>
          We're going to help you turn your vision into the ideal US business. While you focus on growing your company, <strong>we take the struggle out of forming your business and staying compliant.</strong>
        </p>

        <form className={styles.landingHero__form} onSubmit={handleSubmit}>
          <label htmlFor="companyName" className={styles.landingHero__formField}>
            <input
              id="companyName"
              className={styles.landingHero__formField__input}
              type="text"
              name="company_name"
              value={companyName}
              onChange={(evt) => onCompanyNameChange(evt.target.value || '')}
              placeholder="Enter a company name, we'll check availability" />
            <button className={styles.landingHero__formField__submit} type="submit">Search Now</button>
          </label>

          <span className={styles.landingHero__form__smallText}>
            Start today, it takes 10 minutes or less to finish your application.
            <a href="#packages">View Package &amp; Options</a>
          </span>
        </form>

        <Testimonials />
      </div>

      <aside className={styles.landingHero__featured}>
        <div className={styles.landingHero__featured__image}></div>
        <div className={`${styles.landingHero__featured__image} ${styles['landingHero__featured__image--large']}`}></div>
        <div className={styles.landingHero__featured__image}></div>
      </aside>
    </section>
  );
}

export default LandingHero
