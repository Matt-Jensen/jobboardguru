import { ReactNode, FunctionComponent, useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import Container from '../../components/Container';
import Header from '../../components/Container/Header';
import Content from '../../components/Container/Content';
import Sidebar from '../../components/Container/Sidebar';
import Fieldset from '../../components/Form/Fieldset';
import TextInput from '../../components/Form/TextInput';
import NumberInput from '../../components/Form/NumberInput';
import CheckboxInput from '../../components/Form/CheckboxInput';
import SelectMenu from '../../components/Form/SelectMenu';
import PhoneInput from '../../components/Form/PhoneInput';
import AddButton from '../../components/Form/AddButton';
import Form from '../../components/Form';
import InfoPill from '../../components/Form/InfoPill';
import basket from '../../common/services/basket';
import progress from '../../common/services/progress';
import PRODUCT from '../../config/product';
import COUNTRIES from '../../config/countries';
import useCompany from '../../common/hooks/useCompany';
import useContact from '../../common/hooks/useContact';
import useCompanyInfo from '../../common/hooks/useCompanyInfo';
import useMembers from '../../common/hooks/useMembers';
import formStyles from '../../components/Form/styles.module.scss';
import SuccessCheckIcon from '../../public/assets/svgs/form-success-check.svg';

// Load non-SSR components
const Navigation = dynamic(() => import('../../components/Navigation'), {
  ssr: false,
});
const LargeBasket = dynamic(() => import('../../components/LargeBasket'), {
  ssr: false,
});
const AddOns = dynamic(() => import('../../components/LandingFeatures/AddOns'), {
  ssr: false,
});
const Submit = dynamic(() => import('../../components/Form/Submit'), {
  ssr: false
});

type Props = {}

const Questionnaire: FunctionComponent<Props> = ({}) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const {
    companyName,
    companyType,
    companyState,
    canQueryCompany,
    isQueryingCompany,
    isCompanyQueryDirty,
    hasQueriedCompany,
    onCompanyNameChange,
    onCompanyTypeChange,
    onCompanyStateChange,
    submitCompanyQuery
  } = useCompany();
  const {
    contactName,
    contactEmail,
    contactPhone,
    contactFrom,
    onChangeContactName,
    onChangeContactEmail,
    onChangeContactPhone,
    onChangeContactFrom
  } = useContact();
  const {
    companyIndustry,
    companyDescription,
    companyOfferings,
    companyWebsite,
    onChangeCompanyIndustry,
    onChangeCompanyDescription,
    onChangeCompanyOfferings,
    onChangeCompanyWebsite
  } = useCompanyInfo();
  const {
    members,
    totalOwnership,
    addMember,
    updateMember,
    removeMember
  } = useMembers();
  const showQueryInfo = hasQueriedCompany && !isQueryingCompany;
  const companyQuerySuccessful = hasQueriedCompany && Boolean(companyName) && !isQueryingCompany && !isCompanyQueryDirty;

  // Send user to checkout form
  // Preserving basket state
  const onCheckout = (evt: any) => {
    evt.preventDefault();
    if (!canSubmit) return;
    window.location.replace(basket.checkoutUrl);
  };

  // Update can submit ability
  useEffect(() => {
    window.addEventListener('fnp:progress', () => {
      setCanSubmit(progress.progress === 1 && totalOwnership === 100);
    });
  });
  useEffect(() => {
    setCanSubmit(progress.progress === 1 && totalOwnership === 100);
    companyName && submitCompanyQuery();
  }, [totalOwnership])

  return <>
    <Navigation
      destination="checkout"
      progress={true} />

    <Container>
      <Header>Questionnaire</Header>
      <Content>
        <Form
          legalCopy={PRODUCT.legalDisclaimer}
          onSubmit={onCheckout}>
          <Fieldset legend="State formation" layout="2-column-grid">
            <TextInput
              id="company_name"
              name="company_name"
              placeholder="e.g. Amazon"
              label="Company Name"
              value={companyName}
              disabled={isQueryingCompany}
              onChange={evt => onCompanyNameChange(evt.target.value)} />

            <SelectMenu
              id="type"
              name="type"
              label="What type of company formation"
              value={companyType}
              disabled={isQueryingCompany}
              options={PRODUCT.companies.map(opt => ({ name: opt.name, value: opt.abbr }))}
              onChange={evt => onCompanyTypeChange(evt.target.value)} />

            <SelectMenu
              id="state"
              name="state"
              label="Which state to form entity in"
              value={companyState}
              disabled={isQueryingCompany}
              options={PRODUCT.states.map(opt => ({ name: opt.name, value: opt.abbr }))}
              onChange={evt => onCompanyStateChange(evt.target.value)} />

            <div className="-flex-end -justify-center">
              {showQueryInfo && !isQueryingCompany &&
                <h5 className={formStyles.successHeading}>
                  <SuccessCheckIcon /> Company available!
                </h5>}
              {isQueryingCompany &&
                <h5 className={formStyles.loadingHeading}>
                  Loading...
                </h5>}
            </div>

            {showQueryInfo &&
              <InfoPill content="We will do a more comprehensive check of name availability when we file your formation, but, for now, you’re looking good!" />}
          </Fieldset>

          <Fieldset legend="Contact details" layout="2-column-grid">
            <TextInput
              id="contact_name"
              name="contact_name"
              placeholder="e.g. John Smith"
              label="Name"
              value={contactName}
              onChange={evt => onChangeContactName(evt.target.value)} />

            <TextInput
              id="contact_email"
              name="contact_email"
              placeholder="e.g. john@gmail.com"
              label="Email"
              value={contactEmail}
              onChange={evt => onChangeContactEmail(evt.target.value)} />

            <PhoneInput
              label="Phone"
              name="phone"
              value={contactPhone}
              onChange={evt => onChangeContactPhone(evt.target.value)} />

            <SelectMenu
              id="contact_from"
              name="contact_from"
              label="Where are you from?"
              value={contactFrom}
              options={COUNTRIES.map((opt: any) => ({ name: opt.name, value: opt.code }))}
              onChange={evt => onChangeContactFrom(evt.target.value)} />
          </Fieldset>

          <Fieldset legend="Company information" layout="2-column-grid">
            <SelectMenu
              id="company_industry"
              name="company_industry"
              label="Which industry are you changing?"
              options={PRODUCT.industries.map(option => ({ name: option, value: option }))}
              value={companyIndustry}
              onChange={evt => onChangeCompanyIndustry(evt.target.value)} />

            <TextInput
              id="company_description"
              name="company_description"
              placeholder="e.g. data management and logistics"
              label="Please describe your business"
              value={companyDescription}
              onChange={evt => onChangeCompanyDescription(evt.target.value)} />

            <TextInput
              id="company_offerings"
              name="company_offerings"
              placeholder="e.g. manual data entry & automated migrations"
              label="What is being sold/provided?"
              value={companyOfferings}
              onChange={evt => onChangeCompanyOfferings(evt.target.value)} />

            <TextInput
              id="company_website"
              name="company_website"
              placeholder="e.g. amazon.com"
              label="Do you have a website?"
              value={companyWebsite}
              onChange={evt => onChangeCompanyWebsite(evt.target.value)} />
          </Fieldset>

          <Fieldset legend="Company members">
            {members.map((member, i) => {
              const id = `${i + 1}`;
              let maxOwnership = 100 - totalOwnership + (member.ownership || 0);
              if (maxOwnership < 0) maxOwnership = 0;

              return <div className={`${formStyles.fieldset__main} ${formStyles['fieldset__main--grid']} -mb-large`} key={i}>
                <TextInput
                  id={`member_name_${id}`}
                  name={`member_name_${id}`}
                  placeholder="e.g. John Smith"
                  value={member.name}
                  onChange={evt => updateMember(member, { name: evt.target.value})}
                  label="Name" />

                <NumberInput
                  id={`member_percentage_${id}`}
                  name={`member_percentage_${id}`}
                  label="Percentage ownership"
                  placeholder={`e.g. 32  (from 0 - ${maxOwnership})`}
                  min="1"
                  max={`${maxOwnership}`}
                  value={member.ownership}
                  postfix="%"
                  onChange={evt => updateMember(member, { ownership: parseInt(evt.target.value, 10)})} />

                <CheckboxInput
                  name={`member_business_entity_${id}`}
                  onChange={evt => updateMember(member, { businessEntity: evt.target.checked})}
                  options={[{ value: 'true', label: 'This member is a business entity'}]} />

                {members.length > 1 &&
                  <button 
                    className={formStyles.removeButton}
                    onClick={() => removeMember(member)}>Remove Member</button>}
              </div>
            })}

            <AddButton
              className={'-mt-large'}
              disabled={totalOwnership === 100}
              callToAction="Add Another Member"
              onClick={addMember} />
          </Fieldset>

          <Fieldset legend="Additional services">
            <AddOns className={'-mb-none'} />
          </Fieldset>

          <Submit
            callToAction="Checkout"
            large={true}
            alignRight={true}
            disabled={!canSubmit} />
        </Form>
      </Content>
      <Sidebar>
        <LargeBasket hideCta={true} />
      </Sidebar>
    </Container>
  </>
};

export default Questionnaire;