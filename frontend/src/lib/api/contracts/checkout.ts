export type CheckoutRequest = {
  address: string;
  shippingMethodId: string;
  paymentMethod: string;
};

export type CheckoutResponse = {
  orderId: string;
  status: "confirmed";
};
