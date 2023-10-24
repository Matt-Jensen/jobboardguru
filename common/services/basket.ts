import PRODUCT from '../../config/product';
import qp from './queryParams';

interface BasketItem {
  name: string,
  amount: number,
  note?: string
}

if (typeof CustomEvent !== 'undefined' && typeof window !== 'undefined') {
  // @ts-ignore
  let last = getQpBasketState();
  window.addEventListener('queryparamchange', () => {
    const current = getQpBasketState();
    if (last !== current) {
      const event = new CustomEvent('fnp:basket_changed', {detail: true});
      window.dispatchEvent(event);
      last = current;
    }
  });
}

export default {
  // Lookup GET Param configured by user
  // state or use default state
  get state(): string {
    // @ts-ignore
    const getParam = qp.state;
    const isValidGetParam = PRODUCT.states.filter(({abbr}) => getParam === abbr).length > 0;
    return isValidGetParam ? getParam : PRODUCT.defaults.state;
  },

  // Lookup GET Param configured by user
  // company type or use default state
  get type(): string {
    // @ts-ignore
    const getParam = qp.type;
    const isValidGetParam = PRODUCT.companies.filter(({abbr}) => getParam === abbr).length > 0;
    return isValidGetParam ? getParam : PRODUCT.defaults.type;
  },

  // Lookup GET Param configured by user
  // company name or use default name
  get companyName(): string {
    // @ts-ignore
    const getParam = qp.company_name;
    return getParam || PRODUCT.defaults.companyName;
  },

  // Lookup GET Param configured by user
  // email or use default name
  get email(): string {
    // @ts-ignore
    return qp.email || '';
  },

  // Lookup GET Param configured by user
  // if addon was previously set
  get activeAddOns(): string[] {
    // @ts-ignore
    const getParams: string[] = qp['addOns[]'].split('|');
    const addOnIds = Object.entries(PRODUCT.addOns).map(([,data]) => data.id);
    const validGetParams = getParams.filter(id => addOnIds.includes(id));
    const isValidGetParam = Boolean(validGetParams.length);
    return isValidGetParam ? validGetParams : [];
  },

  // Lookup GET Param configured by user
  // if industry previously set
  get industry() : string {
    // @ts-ignore
    const getParam = qp.industry;
    const isValidGetParam = PRODUCT.industries.includes(getParam);

    if (isValidGetParam) {
      return getParam;
    }

    return PRODUCT.industries.includes('Counseling Service')
      ? 'Counseling Service'
      : PRODUCT.industries[0];
  },

  // Items in user's basket
  get items(): BasketItem[] {
    const result = [];
    const state = this.state;
    const companyType = this.type;
    const [stateData] = PRODUCT.states.filter(({abbr}) => abbr === state);
    const stateFilingFee = stateData.filingFee;
    const stateAnnualFee = stateData.annualFee;
    const addOnIds = this.activeAddOns;
    const allAddOns = Object.entries(PRODUCT.addOns);

    if (stateFilingFee) {
      result.push({
        name: `${stateData.name} ${companyType} Fee`,
        amount: stateFilingFee,
      });
    }

    if (stateAnnualFee) {
      result.push({
        name: `${stateData.name} Annual Fee`,
        amount: stateAnnualFee,
        notes: stateData.annualFeeNotes || ''
      });
    }

    // Include required items
    for (let i = 0; i < PRODUCT.requiredItems.length; i++) {
      const item = PRODUCT.requiredItems[i];

      result.push({
        name: item.name,
        amount: item.cost
      });
    }

    // Include any addons
    for (let i = 0; i < addOnIds.length; i++) {
      const addOnId = addOnIds[i];
      // @ts-ignore
      const [addOnData] = allAddOns
        .map(([,data]) => data)
        .filter(({id}) => id === addOnId);

      result.push({
        name: addOnData.name,
        amount: addOnData.cost
      });
    }

    return result;
  },

  // Value of all items in basket
  get total(): number {
    return this.items.reduce((acc, { amount }) => {
      acc += amount;
      return acc;
    }, 0)
  },

  // Update the basket content
  update(name: string, value: string | string[]): void {
    if (Array.isArray(value)) {
      // @ts-ignore
      qp[`${name}[]`] = value;
    } else {
      // @ts-ignore
      qp[name] = value;
    }
  },

  // Create a query string
  // to store baskets accross
  // page loads
  get urlQuery(): string {
    const query = new URLSearchParams();
    const state = this.state;
    const type = this.type;
    const email = this.email;
    const industry = this.industry;
    const companyName = this.companyName;
    const activeAddOns = this.activeAddOns;

    if (state) {
      query.set('state', state);
    }

    if (type) {
      query.set('type', type);
    }

    if (email) {
      query.set('email', email);
    }

    if (companyName) {
      query.set('company_name', companyName);
    }

    if (industry) {
      query.set('industry', industry);
    }

    if (activeAddOns.length) {
      activeAddOns.forEach(addOn => {
        query.append('addOns[]', addOn);
      });
    }

    return decodeURIComponent(query.toString());
  },

  // Create a link to the questionniare
  // that preserves the basket's state
  get questionnaireUrl(): string {
    const query = this.urlQuery;
    return `/questionnaire${Boolean(query) ? '?' : ''}${query}`;
  },

  // Create a link to the questionnaire
  // that preserves the basket's state
  get checkoutUrl(): string {
    const query = this.urlQuery;
    return `/checkout?${query}${Boolean(query) ? '&' : ''}p=${this.total}`;
  }
}

// Hash to check if any basket
// changes have occured
function getQpBasketState() {
  // @ts-ignore
  return `${qp.state}${qp.type}${qp.company_name}${qp['addOns[]'].split('|')}`;
}