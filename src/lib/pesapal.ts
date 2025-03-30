
import { PesaPal } from 'pesapaljs';

const pesapal = new PesaPal({
  key: process.env.PESAPAL_CONSUMER_KEY || '',
  secret: process.env.PESAPAL_CONSUMER_SECRET || '',
  debug: process.env.NODE_ENV !== 'production'
});

export const createPaymentURL = async (
  amount: number,
  email: string,
  reference: string,
  description: string = 'Deposit to Vertex Trading'
) => {
  try {
    const payment = pesapal.createPayment({
      amount,
      description,
      type: 'MERCHANT',
      reference,
      email
    });
    
    return await pesapal.getPaymentURL(payment);
  } catch (error) {
    console.error('PesaPal payment error:', error);
    throw error;
  }
};

export const getPaymentStatus = async (reference: string) => {
  try {
    return await pesapal.getPaymentStatus(reference);
  } catch (error) {
    console.error('PesaPal status check error:', error);
    throw error;
  }
};
