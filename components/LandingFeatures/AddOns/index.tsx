import { ReactNode, FunctionComponent, useState, useEffect } from 'react'
import basket from '../../../common/services/basket';
import { ADD_ONS } from '../data';
import styles from '../styles.module.scss';

type Props = {
  className?: string
}

const LandingFeaturesAddOns: FunctionComponent<Props> = ({ className }) => {
  const [activeAddOnIds, setActiveAddonIds] = useState(basket.activeAddOns);

  const onAddOnChange = (addOnId: string, value: boolean) => {
    let update = value
      ? [...activeAddOnIds, addOnId] // add option
      : activeAddOnIds.filter(id => id !== addOnId); // remove option

    // Sanity check - filter unique
    update = update
      .filter((a, i, arr) => arr.indexOf(a) === i)

    basket.update('addOns', update);
  };

  // Update on basket changes
  useEffect(() => {
    window.addEventListener('fnp:basket_changed', () => {
      setActiveAddonIds(basket.activeAddOns);
    });
  });

  return (
    <ul className={`${styles.featureList}${className ? ' ' : ''}${className}`}>
      {ADD_ONS.map((addOn, i) =>
        <li className={styles.featureList__item} key={i}>
          <div className={styles.featureList__item__aside}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={activeAddOnIds.includes(addOn.id)}
              onChange={(evt) => onAddOnChange(addOn.id, evt.target.checked)}
              name={addOn.id} />
          </div>

          <div className={styles.featureList__item__main}>
            <h6 className={styles.featureHeading}>{addOn.heading}</h6>
            <p className={styles.featureDescription}>{addOn.description}</p>
          </div>
        </li>
      )}
    </ul>
  );
};

LandingFeaturesAddOns.defaultProps = {
  className: ''
};

export default LandingFeaturesAddOns;