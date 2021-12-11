import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from './App';
import PaymentForm from './components/PaymentForm/PaymentForm';

describe('<PaymentForm/>', () => {
  it('should render initial content', () => {
    render(<PaymentForm />);
    expect(screen.queryByText('BUY TEDDY BEER')).toBeInTheDocument();
    expect(screen.queryByText('Email')).toBeInTheDocument();
    expect(screen.queryByText('Card information')).toBeInTheDocument();
    expect(screen.queryByText('Name on card')).toBeInTheDocument();
    expect(screen.queryByText('Country')).toBeInTheDocument();
    expect(screen.queryByText('Pay')).toBeInTheDocument();

    expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0000 0000 0000 0000')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('CVC')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('should render initial content', () => {
    render(<PaymentForm />);
    expect(screen.queryByText('BUY TEDDY BEER')).toBeInTheDocument();
    expect(screen.queryByText('Email')).toBeInTheDocument();
    expect(screen.queryByText('Card information')).toBeInTheDocument();
    expect(screen.queryByText('Name on card')).toBeInTheDocument();
    expect(screen.queryByText('Country')).toBeInTheDocument();
    expect(screen.queryByText('Pay')).toBeInTheDocument();

    expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0000 0000 0000 0000')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('CVC')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('should validate empty form fields', async () => {
    render(<PaymentForm />);
    fireEvent.submit(screen.getByText('Pay'));

    await waitFor(() => {
      expect(screen.queryByText('Email is required field')).toBeInTheDocument();
      expect(screen.queryByText('Card number is required field')).toBeInTheDocument();
      expect(screen.queryByText('card term is required field')).toBeInTheDocument();
      expect(screen.queryByText('CVC is required field')).toBeInTheDocument();
      expect(screen.queryByText('Name is required field')).toBeInTheDocument();
    });
  });
  it('should submit form', async () => {
    render(<PaymentForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('0000 0000 0000 0000'), { target: { value: '1234567890987654' } });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), { target: { value: '2214' } });
    fireEvent.change(screen.getByPlaceholderText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Name' } });
    fireEvent.submit(screen.getByText('Pay'));

    await waitFor(() => {
      expect(screen.queryByText('Payment approved')).toBeInTheDocument();
    });
  });
  it('should validate incorrect data in form fields', async () => {
    render(<PaymentForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testtest.com' } });
    fireEvent.change(screen.getByPlaceholderText('0000 0000 0000 0000'), { target: { value: '7890654' } });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), { target: { value: '24' } });
    fireEvent.change(screen.getByPlaceholderText('CVC'), { target: { value: '1232' } });
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Name12' } });
    fireEvent.submit(screen.getByText('Pay'));

    await waitFor(() => {
      expect(screen.queryByText('Invalid email')).toBeInTheDocument();
      expect(screen.queryByText('Invalid card number')).toBeInTheDocument();
      expect(screen.queryByText('Invalid card term')).toBeInTheDocument();
      expect(screen.queryByText('Invalid CVC')).toBeInTheDocument();
      expect(screen.queryByText('Name can\'t contain numbers')).toBeInTheDocument();
    });
  });
});
