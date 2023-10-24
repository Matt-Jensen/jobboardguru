import Link from 'next/link'
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { MAIN_SITE } from '../../lib/constants';
import basket from '../../common/services/basket';
import domain from '../../config/domain';
import product from '../../config/product';

const SUCCESS_URL = domain.successPath;

type Props = {
  email?: string
}

const CheckoutForm: FunctionComponent<Props> = ({ email }) => {
  const formElementRef = useRef(null);
  const [checkoutEmail, setCheckoutEmail] = useState(email);

  function applyErrorStates(evt: any) {
    let form;
    if (evt.tagName === 'FORM') {
      form = evt;
    } else {
      form = evt.target.closest('form');
    }

    if (!form) return;
    const focusedElement = document.activeElement;
    const formElements = getFormElements(form);
    const isFormAnswered = formElements.every(field => Boolean(field && field.value));
    const invalidElements = Array.from(form.querySelectorAll(':invalid')).filter(field => {
      // @ts-ignore
      return field !== focusedElement && Boolean(field.value);
    }).map(el => el as HTMLElement);
    const validElements = formElements.filter(field => !invalidElements.includes(field));

    validElements.forEach(removeFieldError);
      invalidElements.forEach((field: HTMLElement) => {
      if (field.matches('#email')) {
        addFieldError(field, 'Your email is incomplete.');
      } else if (field.matches('#cardNumber')) {
        addFieldError(field, 'Your card number is incomplete.');
      } else if (field.matches('#cardExpiry')) {
        addFieldError(field, 'Your card\'s expiration date is incomplete.');
      } else if (field.matches('#cardCvc')) {
        addFieldError(field, 'Your card\'s security code is incomplete.');
      } else if (field.matches('#billingName')) {
        addFieldError(field, 'Card\'s billing name is incomplete.');
      } else {
        addFieldError(field, 'Please correct field.');
      }
    });


    if (invalidElements.length === 0 && isFormAnswered) {
      enableSubmit(form);
    } else {
      disableSubmit(form);
    }
  }

  function getFormElements(form: HTMLFormElement) {
    var elements = form.elements;

    return [
      // @ts-ignore
      elements.email,
      // @ts-ignore
      elements.cardNumber,
      // @ts-ignore
      elements.cardExpiry,
      // @ts-ignore
      elements.cardCvc,
      // @ts-ignore
      elements.billingName
    ];
    /* @ts-enable */
  }

  function addFieldError(field: HTMLElement, errorMsg: string) {
    const container = field.closest('.FormFieldGroup-container');
    if (!container) return;
    const errorLabel = container.querySelector('.FieldError');
    if (!errorLabel) return;
    const errorTxt = errorLabel.querySelector('span:first-child');
    const errorWrapper = errorLabel.parentElement;
    if (!errorWrapper) return;

    errorWrapper.style.opacity = '1';
    errorWrapper.style.height = 'auto';
    field.classList.add('CheckoutInput--invalid');

    if (errorTxt && !Boolean(errorTxt.textContent)) {
      errorTxt.textContent = errorMsg;
    }
  }

  function removeFieldError(field: HTMLElement) {
    const container = field.closest('.FormFieldGroup-container')
    if (!container) return;
    const errorLabel = container.querySelector('.FieldError');
    if (!errorLabel) return;
    const errorTxt = errorLabel.querySelector('span:first-child');
    const errorWrapper = errorLabel.parentElement;
    if (!errorWrapper) return;

    errorWrapper.style.opacity = '0';
    errorWrapper.style.height = '0px';
    field.classList.remove('CheckoutInput--invalid');
    if (errorTxt) errorTxt.textContent = '';
  }

  function handleFormSubmit(evt: any) {
    if (evt) evt.preventDefault();
    const form = evt.target;
    disableSubmit(form);
    addLoadingState(form);
    window.setTimeout(() =>
      window.location.replace(`${SUCCESS_URL}?p=${basket.total}`), 3000);
  }

  function disableSubmit(form: HTMLFormElement) {
    const submitButton = form.querySelector('button.SubmitButton');
    if (!submitButton) return;
    // @ts-ignore
    submitButton.disabled = true;
    submitButton.classList.add('SubmitButton--incomplete');
    submitButton.classList.remove('SubmitButton--complete');
  }

  function enableSubmit(form: HTMLFormElement) {
    const submitButton = form.querySelector('button.SubmitButton');
    if (!submitButton) return;
    // @ts-ignore
    submitButton.disabled = false;
    submitButton.classList.remove('SubmitButton--incomplete');
    submitButton.classList.add('SubmitButton--complete');
  }

  function addLoadingState(form: HTMLFormElement) {
    const submitButton = form.querySelector('button.SubmitButton');
    if (submitButton) submitButton.textContent = 'Submitting...';
  }

  // Autocorrect on load
  useEffect(() => {
    window.setTimeout(() => requestAnimationFrame(() => {
      const formEl = formElementRef.current;
      applyErrorStates(formEl);
    }), 400);
  }, []);

  return (
    <form
      className="A F G J S checkoutPage"
      onKeyDown={applyErrorStates}
      onSubmit={handleFormSubmit}
      onBlur={applyErrorStates}
      ref={formElementRef}>
      <div className="tatsu-z-JHd5-2Ie t OB tatsu-section-offset">
        <div className="w OB X c i o">
          <div className="tatsu-section-pad-inner">
            <div className="x">
              <div className="IB be-preview OB tatsu-AuSO0K-yI0 DB AB CB EB">
                <div className="z NB Y d j p">
                  <div className="BB">
                    <div className="FB QB OB tatsu-column-no-bg HB tatsu-EPY8GI4gJ JB Y e d k j q p">
                      <div className="tatsu-column-inner gradientClass">
                        <div className="GB">
                          <div className="MB c i o">
                            <div className="PB tatsu-rZptyLA3l a g m s"></div>
                            <div className="PB tatsu-twQQj7R2Z QB"></div>
                          </div>
                        </div>
                        <div className="KB">
                          <div className="LB"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="v">
          <div className="u"></div>
        </div>
        <div className="y tatsu-section-overlay W b h n"></div>
      </div>
      <div className="tatsu-UXN6e2J7RQ t OB tatsu-section-offset">
        <div className="w OB X c i o">
          <div className="tatsu-section-pad-inner">
            <div className="x">
              <div className="IB be-preview OB tatsu-bjqb8Wca1H DB AB CB EB">
                <div className="z NB Y d j p">
                  <div className="BB">
                    <div className="FB QB OB tatsu-column-no-bg HB tatsu-99Td6LZG3 JB Y d e j k p q">
                      <div className="tatsu-column-inner gradientClass">
                        <div className="GB">
                          <div className="MB c i o">
                            <div className="PB tatsu-9X424tC_W QB">
                              <div id="root">
                                <div className="App-Container is-noBackground flex-container justify-content-center">
                                  <div className="App App--singleItem">
                                    <div className="App-Overview">
                                      <header className="Header">
                                        <div className="Header-Content flex-container justify-content-space-between align-items-stretch">
                                          <div className="Header-business flex-item width-grow flex-container align-items-center">
                                            <Link href={MAIN_SITE}>
                                              <a className="Link Header-businessLink Link--primary" aria-label="Previous page" title="JobBoardGuru Main Site" target="_self">
                                                <div style={{ position: 'relative' }}>
                                                  <div className="flex-container align-items-center">
                                                    <div className="Header-backArrowContainer" style={{ opacity: 1, transform: 'none' }}>
                                                      <svg className="InlineSVG Icon Header-backArrow mr2 Icon--sm" focusable="false" width="12" height="12" viewBox="0 0 16 16">
                                                        <path d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z" fillRule="evenodd"/>
                                                      </svg>
                                                    </div>
                                                    <div className="Header-merchantLogoContainer" style={{ transform: 'none' }}>
                                                      <div className="Header-merchantLogoWithLabel flex-item width-grow">
                                                        <div className="HeaderImage HeaderImage--icon HeaderImage--iconFallback flex-item width-fixed flex-container justify-content-center align-items-center width-fixed">
                                                          <svg className="InlineSVG Icon HeaderImage-fallbackIcon Icon--sm" focusable="false" viewBox="0 0 16 16">
                                                            <path d="M3 7.5V12h10V7.5c.718 0 1.398-.168 2-.468V15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7.032c.602.3 1.282.468 2 .468zM0 3L1.703.445A1 1 0 0 1 2.535 0h10.93a1 1 0 0 1 .832.445L16 3a3 3 0 0 1-5.5 1.659C9.963 5.467 9.043 6 8 6s-1.963-.533-2.5-1.341A3 3 0 0 1 0 3z" fillRule="evenodd"/>
                                                          </svg>
                                                        </div>
                                                        <span className="Header-businessLink-label Text Text-color--gray800 Text-fontSize--14 Text-fontWeight--500">Back</span>
                                                        <h1 className="Header-businessLink-name Text Text-color--gray800 Text-fontSize--14 Text-fontWeight--500 Text--truncate A B E G I K T">Back</h1>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </header>
                                      <div>
                                        <div className="ProductSummary">
                                          <div className="ProductSummary-info">
                                            <span className="Text Text-color--gray500 Text-fontSize--16 Text-fontWeight--500">Total</span>
                                            <span className="ProductSummary-totalAmount Text Text-color--default Text-fontWeight--600 Text--tabularNumbers" id="ProductSummary-totalAmount">${basket.total}</span>
                                            <span className="ProductSummary-description Text Text-color--gray500 Text-fontSize--14 Text-fontWeight--500" id="ProductSummary-description">
                                              <div className="ProductSummaryDescription ProductSummaryDescription--singleItem" style={{ fontWeight: 600 }}>Billed after the {product.freeTrialStatement}.</div>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="App-Payment">
                                      <div className="CheckoutPaymentForm">
                                        <div className="PaymentRequestOrHeader" style={{ height: 'auto', minHeight: '44px' }}>
                                          <div className="PaymentHeaderContainer" style={{ display: 'block', opacity: 1 }}>
                                            <div className="PaymentHeader">
                                              <div className="Text Text-color--default Text-fontSize--20 Text-fontWeight--500">Pay with card</div>
                                            </div>
                                          </div>
                                          <div className="ButtonAndDividerContainer" style={{ opacity: 0, display: 'none' }}></div>
                                        </div>

                                        <div>
                                          <div className="App-Global-Fields flex-container spacing-16 direction-row wrap-wrap">
                                            <div className="flex-item width-12">
                                              <div className="FormFieldGroup">
                                                <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
                                                  <label htmlFor="email">
                                                    <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Email</span>
                                                  </label>
                                                </div>
                                                <div className="FormFieldGroup-Fieldset" id="email-fieldset">
                                                  <div className="FormFieldGroup-container">
                                                    <div className="FormFieldGroup-child FormFieldGroup-child--width-12 FormFieldGroup-childLeft FormFieldGroup-childRight FormFieldGroup-childTop FormFieldGroup-childBottom">
                                                      <div className="FormFieldInput">
                                                        <span className="InputContainer">
                                                          <input
                                                            id="email"
                                                            className="CheckoutInput Input Input--empty"
                                                            required
                                                            name="email"
                                                            type="email"
                                                            value={checkoutEmail}
                                                            onChange={(evt) => setCheckoutEmail(evt.target.value)}
                                                            aria-invalid="false" />
                                                        </span>
                                                        </div>
                                                      </div>
                                                      <div style={{ opacity: 0, height: '0px' }}>
                                                        <span className="FieldError Text Text-color--red Text-fontSize--13">
                                                          <span aria-hidden="true"></span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div style={{ opacity: 0, height: '0px' }}>
                                                      <span className="FieldError Text Text-color--red Text-fontSize--13">
                                                        <span aria-hidden="true"></span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex-container spacing-16 direction-row wrap-wrap">
                                              <div className="flex-item width-12">
                                                <div className="FormFieldGroup">
                                                  <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
                                                    <label htmlFor="cardNumber-fieldset">
                                                      <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Card information</span>
                                                    </label>
                                                  </div>
                                                  <fieldset className="FormFieldGroup-Fieldset" id="cardNumber-fieldset">
                                                    <div className="FormFieldGroup-container" id="cardNumber-fieldset">
                                                      <div className="FormFieldGroup-child FormFieldGroup-child--width-12 FormFieldGroup-childLeft FormFieldGroup-childRight FormFieldGroup-childTop">
                                                        <div className="FormFieldInput">
                                                          <span className="InputContainer">
                                                            <input
                                                              className="CheckoutInput CheckoutInput--tabularnums Input Input--empty"
                                                              id="cardNumber"
                                                              required
                                                              pattern="^(?:[0-9]{13}(?:[0-9]{3})?)$"
                                                              name="cardNumber"
                                                              type="text"
                                                              aria-label="Card number"
                                                              placeholder="1234 1234 1234 1234"
                                                              aria-invalid="false" />
                                                          </span>
                                                          <div className="FormFieldInput-Icons" style={{ opacity: 1 }}>
                                                            <div style={{ transform: 'none' }}>
                                                              <span className="FormFieldInput-IconsIcon is-visible">
                                                                <img src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg" alt="visa" className="BrandIcon" />
                                                              </span>
                                                            </div>
                                                            <div style={{ transform: 'none' }}>
                                                              <span className="FormFieldInput-IconsIcon is-visible">
                                                                <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="mastercard" className="BrandIcon" />
                                                              </span>
                                                            </div>
                                                            <div style={{ transform: 'none' }}>
                                                              <span className="FormFieldInput-IconsIcon is-visible">
                                                                <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="amex" className="BrandIcon" />
                                                              </span>
                                                            </div>
                                                            <div className="CardFormFieldGroupIconOverflow">
                                                              <span className="CardFormFieldGroupIconOverflow-Item CardFormFieldGroupIconOverflow-Item--invisible" role="presentation">
                                                                <span className="FormFieldInput-IconsIcon" role="presentation">
                                                                  <img src="https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg" alt="unionpay" className="BrandIcon" />
                                                                </span>
                                                              </span>
                                                              <span className="CardFormFieldGroupIconOverflow-Item CardFormFieldGroupIconOverflow-Item--invisible" role="presentation">
                                                                <span className="FormFieldInput-IconsIcon" role="presentation">
                                                                  <img src="https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg" alt="jcb" className="BrandIcon" />
                                                                </span>
                                                              </span>
                                                              <span className="CardFormFieldGroupIconOverflow-Item CardFormFieldGroupIconOverflow-Item--visible" role="presentation">
                                                                <span className="FormFieldInput-IconsIcon" role="presentation">
                                                                  <img src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" alt="discover" className="BrandIcon" />
                                                                </span>
                                                              </span>
                                                              <span className="CardFormFieldGroupIconOverflow-Item CardFormFieldGroupIconOverflow-Item--invisible" role="presentation">
                                                                <span className="FormFieldInput-IconsIcon" role="presentation">
                                                                  <img src="https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg" alt="diners" className="BrandIcon" />
                                                                </span>
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div className="FormFieldGroup-child FormFieldGroup-child--width-6 FormFieldGroup-childLeft FormFieldGroup-childBottom">
                                                        <div className="FormFieldInput">
                                                          <span className="InputContainer" data-max>
                                                            <input
                                                              className="CheckoutInput CheckoutInput--tabularnums Input Input--empty"
                                                              id="cardExpiry"
                                                              required
                                                              pattern="^\d{1,2}(\/|\s)\d{2}$"
                                                              name="cardExpiry"
                                                              type="text"
                                                              aria-label="Expiration"
                                                              placeholder="MM / YY"
                                                              aria-invalid="false" />
                                                          </span>
                                                        </div>
                                                      </div>

                                                      <div className="FormFieldGroup-child FormFieldGroup-child--width-6 FormFieldGroup-childRight FormFieldGroup-childBottom">
                                                        <div className="FormFieldInput has-icon">
                                                          <span className="InputContainer" data-max>
                                                            <input
                                                              className="CheckoutInput CheckoutInput--tabularnums Input Input--empty"
                                                              id="cardCvc"
                                                              pattern="^\d{3,4}$"
                                                              required
                                                              name="cardCvc"
                                                              type="text"
                                                              aria-label="CVC"
                                                              placeholder="CVC"
                                                              aria-invalid="false" />
                                                          </span>
                                                          <div className="FormFieldInput-Icon is-loaded">
                                                            <svg className="Icon Icon--md" focusable="false" viewBox="0 0 32 21">
                                                              <g fill="none" fillRule="evenodd">
                                                                <g className="Icon-fill">
                                                                  <g transform="translate(0 2)">
                                                                    <path d="M21.68 0H2c-.92 0-2 1.06-2 2v15c0 .94 1.08 2 2 2h25c.92 0 2-1.06 2-2V9.47a5.98 5.98 0 0 1-3 1.45V11c0 .66-.36 1-1 1H3c-.64 0-1-.34-1-1v-1c0-.66.36-1 1-1h17.53a5.98 5.98 0 0 1 1.15-9z" opacity=".2"/>
                                                                    <path d="M19.34 3H0v3h19.08a6.04 6.04 0 0 1 .26-3z" opacity=".3"/>
                                                                  </g>
                                                                  <g transform="translate(18)">
                                                                    <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zM4.22 4.1h-.79l-1.93.98v1l1.53-.8V9.9h1.2V4.1zm2.3.8c.57 0 .97.32.97.78 0 .5-.47.85-1.15.85h-.3v.85h.36c.72 0 1.21.36 1.21.88 0 .5-.48.84-1.16.84-.5 0-1-.16-1.52-.47v1c.56.24 1.12.37 1.67.37 1.31 0 2.21-.67 2.21-1.64 0-.68-.42-1.23-1.12-1.45.6-.2.99-.73.99-1.33C8.68 4.64 7.85 4 6.65 4a4 4 0 0 0-1.57.34v.98c.48-.27.97-.42 1.44-.42zm4.32 2.18c.73 0 1.24.43 1.24.99 0 .59-.51 1-1.24 1-.44 0-.9-.14-1.37-.43v1.03c.49.22.99.33 1.48.33.26 0 .5-.04.73-.1.52-.85.82-1.83.82-2.88l-.02-.42a2.3 2.3 0 0 0-1.23-.32c-.18 0-.37.01-.57.04v-1.3h1.44a5.62 5.62 0 0 0-.46-.92H9.64v3.15c.4-.1.8-.17 1.2-.17z"/>
                                                                  </g>
                                                                </g>
                                                              </g>
                                                            </svg>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div style={{ opacity: 0, height: '0px' }}>
                                                        <span className="FieldError Text Text-color--red Text-fontSize--13">
                                                          <span aria-hidden="true"></span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </fieldset>
                                                </div>
                                              </div>

                                              <div className="billing-container flex-item width-12" aria-hidden="false">
                                                <div style={{ pointerEvents: 'auto', height: 'auto', opacity: 1 }}>
                                                  <div className="flex-container spacing-16 direction-row wrap-wrap">
                                                    <div className="flex-item width-12">
                                                      <div className="FormFieldGroup">
                                                        <div className="FormFieldGroup-labelContainer flex-container justify-content-space-between">
                                                          <label htmlFor="billingName">
                                                            <span className="Text Text-color--gray600 Text-fontSize--13 Text-fontWeight--500">Name on card</span>
                                                          </label>
                                                        </div>
                                                        <div className="FormFieldGroup-Fieldset">
                                                          <div className="FormFieldGroup-container" id="billingName-fieldset">
                                                            <div className="FormFieldGroup-child FormFieldGroup-child--width-12 FormFieldGroup-childLeft FormFieldGroup-childRight FormFieldGroup-childTop FormFieldGroup-childBottom">
                                                              <div className="FormFieldInput">
                                                                <span className="InputContainer" data-max>
                                                                  <input 
                                                                    className="CheckoutInput Input Input--empty"
                                                                    id="billingName"
                                                                    required
                                                                    pattern="^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$"
                                                                    name="billingName"
                                                                    type="text"
                                                                    aria-invalid="false" />
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              <div style={{ opacity: 0, height: '0px' }}>
                                                                <span className="FieldError Text Text-color--red Text-fontSize--13">
                                                                  <span aria-hidden="true"></span>
                                                                </span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="flex-item width-12"></div>
                                                <div className="flex-item width-12">
                                                  <button className="SubmitButton SubmitButton--incomplete" type="submit" style={{ backgroundColor: 'rgb(0, 116, 212)', color: 'rgb(255, 255, 255)' }}>
                                                    <div className="SubmitButton-Shimmer" style={{ background: 'linear-gradient(to right, rgba(0, 116, 212, 0) 0%, rgb(58, 139, 238) 50%, rgba(0, 116, 212, 0) 100%)' }}></div>
                                                    <div className="SubmitButton-TextContainer">
                                                      <span className="SubmitButton-Text SubmitButton-Text--current Text Text-color--default Text-fontWeight--500 Text--truncate" aria-hidden="false">Pay ${basket.total}</span>
                                                    </div>
                                                    <div className="SubmitButton-IconContainer">
                                                      <div className="SubmitButton-Icon SubmitButton-Icon--pre">
                                                        <div className="Icon Icon--md Icon--square">
                                                          <svg viewBox="0 0 16 16"
                                                            xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <path d="M3 7V5a5 5 0 1 1 10 0v2h.5a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1zm5 2.5a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zM11 7V5a3 3 0 1 0-6 0v2z" fill="#ffffff" fillRule="evenodd"/>
                                                          </svg>
                                                        </div>
                                                      </div>
                                                      <div className="SubmitButton-Icon SubmitButton-SpinnerIcon SubmitButton-Icon--pre">
                                                        <div className="Icon Icon--md Icon--square">
                                                          <svg viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <ellipse cx="12" cy="12" rx="10" ry="10" style={{ stroke: 'rgb(255, 255, 255)' }} />
                                                          </svg>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="SubmitButton-CheckmarkIcon">
                                                      <div className="Icon Icon--md">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg" width="22" height="14" focusable="false">
                                                          <path d="M 0.5 6 L 8 13.5 L 21.5 0" fill="transparent" strokeWidth="2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                  </button>
                                                  <div className="ConfirmPayment-PostSubmit">
                                                    <div></div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <footer className="App-Footer Footer">
                                          <div className="Footer-PoweredBy">
                                            {/* Stripe */}
                                            <a className="Link Link--primary" href="https://stripe.com" target="_blank" rel="noopener">
                                              <span className="Text Text-color--gray400 Text-fontSize--12 Text-fontWeight--400">Powered by 
                                                <svg className="InlineSVG Icon Footer-PoweredBy-Icon Icon--md" focusable="false" width="33" height="15">
                                                  <g fillRule="evenodd">
                                                    <path d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843zM15.772 3.94h2.268v7.905h-2.268zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.117-1.716.533-1.716-.804V5.865h1.716V3.94H8.816l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.93 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"/>
                                                  </g>
                                                </svg>
                                              </span>
                                            </a>
                                          </div>
                                          <div className="CheckoutFooter-links flex-container direction-row">
                                            <button className="Button CheckoutFooter-link Button--link Button--md" type="button">
                                              <div className="flex-container justify-content-center align-items-center">
                                                <span className="Text Text-color--default Text-fontWeight--500 Text--truncate">
                                                  {/* Stripe Terms */}
                                                  <a className="Link Link--primary" href="https://stripe.com/checkout/terms" target="_blank" rel="noopener">
                                                    <span className="Text Text-color--gray400 Text-fontSize--12 Text-fontWeight--400">Terms</span>
                                                  </a>
                                                </span>
                                              </div>
                                            </button>
                                            <button className="Button CheckoutFooter-link Button--link Button--md" type="button">
                                              <div className="flex-container justify-content-center align-items-center">
                                                <span className="Text Text-color--default Text-fontWeight--500 Text--truncate">
                                                  {/* Stripe Privacy */}
                                                  <a className="Link Link--primary" href="https://stripe.com/privacy" target="_blank" rel="noopener">
                                                    <span className="Text Text-color--gray400 Text-fontSize--12 Text-fontWeight--400">Privacy</span>
                                                  </a>
                                                </span>
                                              </div>
                                            </button>
                                          </div>
                                        </footer>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="KB">
                              <div className="LB"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="v">
              <div className="u"></div>
            </div>
            <div className="y tatsu-section-overlay W b h n"></div>
          </div>
          <div className="tatsu-2tCfuLPFB t OB tatsu-section-offset">
            <div className="w OB X c i o">
              <div className="tatsu-section-pad-inner">
                <div className="x">
                  <div className="IB be-preview OB tatsu-5vSpMY8XXJ DB AB CB EB">
                    <div className="z NB Y d j p">
                      <div className="BB">
                        <div className="FB QB OB tatsu-column-no-bg HB tatsu-t4OaSmQvIu JB Y d e j k p q"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="v">
              <div className="u"></div>
            </div>
            <div className="y tatsu-section-overlay W b h n"></div>
          </div>
        </form>
  );
}

CheckoutForm.defaultProps = {
  email: ''
};

export default CheckoutForm;
