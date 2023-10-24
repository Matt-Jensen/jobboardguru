import productData from '../../config/product';

export const FEATURES = [
  {
    imageAlt: 'paper stack icon',
    imageSrc: 'paper-stack.png',
    heading: 'Preparing & Filing the Articles of Organization',
    description: 'We will form your U.S business and get your EIN. This is the legal paperwork necessary for setting up payment solutions like Stripe or Paypal and setting up a U.S business bank account.',
  },
  {
    imageAlt: 'Bank icon',
    imageSrc: 'bank.png',
    heading: 'Business bank account set up',
    description: 'Set up your bank account with our banking partners and begin accepting payments from clients anywhere in the world.',
  },
  {
    imageAlt: 'Phone icon',
    imageSrc: 'phone-call.png',
    heading: 'U.S. phone line',
    description: 'Set up your bank account with our banking partners and begin accepting payments from clients anywhere in the world.',
  },
  {
    imageAlt: 'Mailbox icon',
    imageSrc: 'mailbox.png',
    heading: 'Business mailing address',
    description: 'We will set you up with your very own business mailing address in the US and you will have direct access to your mail through our personal dashboard.',
  },
  {
    imageAlt: 'Handshake icon',
    imageSrc: 'handshake.png',
    heading: 'Registered agent service',
    description: 'A registered agent is an individual or business that receives legal documents on behalf of your U.S business. We will set up your personal registered agent and take care of yearly compliance.',
  },
  {
    imageAlt: 'Tax document icon',
    imageSrc: 'tax.png',
    heading: 'Tax Consultation',
    description: 'Not sure where to being? We will set you up with an online CPA service to help you assess your business needs.',
  },
  {
    imageAlt: 'Calendar icon',
    imageSrc: 'calendar.png',
    heading: 'Annual compliance reminders (Hassle free)',
    description: 'As your incorporation partners, we will send you rely reminders for all of the annual reports and payments to the IRS to ensure that we keep you 100% compliant.',
  },
  {
    imageAlt: 'Analytics dashboard icon',
    imageSrc: 'analytics.png',
    heading: 'Online dashboard',
    description: 'You will have access to all of your legal documents and more on our personal dashboard.',
  },
  {
    imageAlt: 'Search availability icon',
    imageSrc: 'search-availability.png',
    heading: 'Name availability searches',
    description: 'Before we file your business in the U.S, we perform a thorough name availability check to make sure that your business name is accepted and available in the state.',
  },
  {
    imageAlt: 'Customer service icon',
    imageSrc: 'customer-service.png',
    heading: 'Support',
    description: 'Throughout your journey, we are here for you and you can contact us via chat or by email.',
  },
  {
    imageAlt: 'Stamp document icon',
    imageSrc: 'stamp.png',
    heading: 'Legal Documents',
    description: 'In your online dashboard we offer important business documents like an operating agreement and corporation bylaws to ensure that you have everything you need to get starting the right way.',
  },
  {
    imageAlt: 'Contract with signature',
    imageSrc: 'contract.png',
    heading: 'Tax forms 5472 and 1120',
    description: 'These are annual forms that MUST be filing if you\'re a foreign owned business. If not filed or filed incorrectly, the IRS charged a minimum penalty of 25,000.'
  },
  {
    imageAlt: 'Folder with shield',
    imageSrc: 'document.png',
    heading: 'Annual state filing',
    description: 'We file the annual state reports to making sure that your U.S business is 100% compliant.'
  },
  {
    imageAlt: 'Certified document',
    imageSrc: 'certified.png',
    heading: 'File for your ITIN',
    description: 'If you don\'t have a Social Security Number, you\'ll need an ITIN when submitting annual reports to the IRS. Don\'t sweat it, we have a team of IRS Certified Acceptance Agents that will take care of the paperwork and get your ITIN ASAP!'
  }
];

export const ADD_ONS = [
  {
    id: productData.addOns.speedy.id,
    heading: `${productData.addOns.speedy.name} - $${productData.addOns.speedy.cost}`,
    description: 'The moment we receive a speedy request our team makes this client first priority and significantly decreases approval time.',
  }
];