import { useState } from 'react';
import basket from '../services/basket';

interface Result {
  contactName: string
  contactEmail: string
  contactPhone: string
  contactFrom: string
  onChangeContactName: (value: string) => void
  onChangeContactEmail: (value: string) => void
  onChangeContactPhone: (value: string) => void
  onChangeContactFrom: (value: string) => void
}

export default function useContact(
): Result {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState(basket.email);
  const [contactPhone, setContactPhone] = useState('');
  const [contactFrom, setContactFrom] = useState('ca');

  // Handlers
  const onChangeContactName = (value: string) => setContactName(value);
  const onChangeContactEmail = (value: string) => {
    const email = `${value || ''}`;
    setContactEmail(email);
    basket.update('email', email.trim()); // add to URL
  };
  const onChangeContactPhone = (value: string) => setContactPhone(value);
  const onChangeContactFrom = (value: string) => setContactFrom(value);

  return {
   contactName,
   contactEmail,
   contactPhone,
   contactFrom,
   onChangeContactName,
   onChangeContactEmail,
   onChangeContactPhone,
   onChangeContactFrom
  };
}