export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };

  export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    Cost: number;
  };