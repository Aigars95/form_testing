import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './PaymentForm.scss';

type PaymentFormTypes = {
    email: string;
    cardNumber: number;
    cardTerm: number;
    cardCode: string;
    name: string;
    country: string;
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required field').email('Invalid email'),
  cardNumber: yup.string().required('Card number is required field').max(16, 'Invalid card number').min(16, 'Invalid card number'),
  cardTerm: yup.string().required('card term is required field').max(4, 'Invalid card term').min(4, 'Invalid card term'),
  cardCode: yup.string().required('CVC is required field').max(3, 'Invalid CVC').min(3, 'Invalid CVC'),
  name: yup.string().required('Name is required field').matches(/^[a-z]+$/i, 'Name can\'t contain numbers'),
  country: yup.string().required('Country is required field'),
});

const PaymentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormTypes>({
    resolver: yupResolver(schema),
  });

  const [paymentData, setPaymentData] = useState<PaymentFormTypes>();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const onSubmit: SubmitHandler<PaymentFormTypes> = (data) => {
    setPaymentData({
      email: data.email,
      cardNumber: data.cardNumber,
      cardTerm: data.cardTerm,
      cardCode: data.cardCode,
      name: data.name,
      country: data.country,
    });
    setShowPaymentSuccess(true);
  };
  return (
    <div className="form__animal--wrapper">
      <h1>BUY TEDDY BEER</h1>
      <form
        className="form__animal"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">
          <span>Email</span>

          <input id="email" type="text" placeholder="Email" {...register('email')} />
          <span className="error">
            {errors.email?.message}
          </span>
        </label>
        <label htmlFor="cardNumber">
          <span>Card information</span>
          <input id="cardNumber" type="number" placeholder="0000 0000 0000 0000" {...register('cardNumber')} />
          <span className="error">
            {errors.cardNumber?.message}
          </span>

        </label>

        <div className="form__item">
          <label htmlFor="cardTerm">
            <input id="cardTerm" type="number" placeholder="MM/YY" {...register('cardTerm')} />
            <span className="error">
              {errors.cardTerm?.message}
            </span>
          </label>
          <label htmlFor="cardCode">
            <input id="carCode" type="number" placeholder="CVC" {...register('cardCode')} />
            <span className="error">
              {errors.cardCode?.message}
            </span>
          </label>
        </div>

        <label htmlFor="name">
          <span>Name on card</span>

          <input id="name" type="text" placeholder="Name" {...register('name')} />
          <span className="error">
            {errors.name?.message}
          </span>
        </label>

        <label htmlFor="country">
          <span>Country</span>
          <select id="country" {...register('country')}>
            <option value="latvia">Latvia</option>
            <option value="lithuania">lithuania</option>
            <option value="estonia">estonia</option>
          </select>
          <span className="error">
            {errors.country?.message}
          </span>
        </label>
        <button type="submit">Pay</button>
      </form>
      {showPaymentSuccess && <h1>Payment approved</h1>}
    </div>
  );
};

export default PaymentForm;
