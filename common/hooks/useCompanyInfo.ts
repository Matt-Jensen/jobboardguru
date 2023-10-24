import { useState } from 'react';
import basket from '../services/basket';

interface Result {
  companyIndustry: string
  companyDescription: string
  companyOfferings: string
  companyWebsite: string
  onChangeCompanyIndustry: (value: string) => void
  onChangeCompanyDescription: (value: string) => void
  onChangeCompanyOfferings: (value: string) => void
  onChangeCompanyWebsite: (value: string) => void
}

export default function useCompanyInfo(
): Result {
  const [companyIndustry, setCompanyIndustry] = useState(basket.industry);
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyOfferings, setCompanyOfferings] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // Handlers
  const onChangeCompanyIndustry = (value: string) => {
    const industry = `${value || ''}`;
    setCompanyIndustry(industry);
    // Sync user industry updates to URL
    basket.update('industry', industry.trim());
  };
  const onChangeCompanyDescription = (value: string) => setCompanyDescription(value);
  const onChangeCompanyOfferings = (value: string) => setCompanyOfferings(value);
  const onChangeCompanyWebsite = (value: string) => setCompanyWebsite(value);

  return {
   companyIndustry,
   companyDescription,
   companyOfferings,
   companyWebsite,
   onChangeCompanyIndustry,
   onChangeCompanyDescription,
   onChangeCompanyOfferings,
   onChangeCompanyWebsite
  };
}