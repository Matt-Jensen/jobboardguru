import { useEffect, useState } from 'react';
import debounce from 'lodash/fp/debounce';
import basket from '../services/basket';

interface Result {
  companyName: string
  companyType: string
  companyState: string
  canQueryCompany: boolean
  isQueryingCompany: boolean
  isCompanyQueryDirty: boolean
  hasQueriedCompany: boolean
  onCompanyNameChange: (val: string) => void
  onCompanyTypeChange: (val: string) => void
  onCompanyStateChange: (val: string) => void
  submitCompanyQuery: () => void
}

export default function useCompany(
): Result {
  let isMounted = true;
  const [companyName, setCompanyName] = useState(basket.companyName);
  const [companyType, setCompanyType] = useState(basket.type);
  const [companyState, setCompanyState] = useState(basket.state);
  const [canQueryCompany, setCanQueryCompany] = useState(Boolean(companyName));
  const [isQueryingCompany, setIsQueryingCompany] = useState(false);
  const [isCompanyQueryDirty, setIsCompanyQueryDirty] = useState(false);
  const [hasQueriedCompany, setHasQueriedCompany] = useState(false);

  let queryState = getCompanyQueryState();
  const onQueueCompanyQuerySubmit = debounce(2200, submitCompanyQuery);

  // Update user ability to
  // request new company query
  const onCompanyQueryUpdate = () => {
    const latestQueryState = getCompanyQueryState();

    if (queryState !== latestQueryState) {
      setCanQueryCompany(Boolean(basket.companyName));
      setIsCompanyQueryDirty(true);
      queryState = latestQueryState;
    }

    onQueueCompanyQuerySubmit();
  }

  // Sync user company name updates to basket
  const onCompanyNameChange = (value: string) => {
    if (!isMounted) return;
    const companyName = `${value || ''}`;
    setCompanyName(companyName);
    basket.update('company_name', companyName.trim());
    onCompanyQueryUpdate();
  };

  // Sync user company type updates to basket
  const onCompanyTypeChange = (value: string) => {
    if (!isMounted) return;
    const type = `${value || ''}`.trim();
    setCompanyType(type);
    basket.update('type', type);
    onCompanyQueryUpdate();
  };

  // Sync user company state updates to basket
  const onCompanyStateChange = (value: string) => {
    if (!isMounted) return;
    const state = `${value || ''}`.trim();
    setCompanyState(state);
    basket.update('state', state);
    onCompanyQueryUpdate();
  };

  // User request company for current
  // name, state, and corporate structure
  function submitCompanyQuery() {
    if (!isMounted) return;
    setIsQueryingCompany(true);
    setHasQueriedCompany(true);
    setCanQueryCompany(false);

    window.setTimeout(() => {
      if (isMounted) {
        setIsQueryingCompany(false);
        setIsCompanyQueryDirty(false);
      }
    }, randomNumber(2, 5) * 1000);
  };

  // Prevent setting state
  // on unmounted hook
  useEffect(() => () => {
    isMounted = false;
  }, []);

  return {
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
  };
}

// Hash to check if any basket
// changes have occured
function getCompanyQueryState() {
  // @ts-ignore
  return `${basket.state}${basket.type}${basket.companyName}`;
}

// Create a random integer
function randomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}