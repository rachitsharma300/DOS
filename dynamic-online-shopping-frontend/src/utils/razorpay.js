export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (orderId, amount, onSuccess, onError) => {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    onError("Razorpay SDK failed to load");
    return;
  }

  try {
    const response = await paymentAPI.createOrder(orderId);
    const { id: razorpayOrderId, amount: orderAmount } = response.data;

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: orderAmount,
      currency: "INR",
      name: "DynamicShop",
      description: "Order Payment",
      order_id: razorpayOrderId,
      handler: async function (response) {
        try {
          await paymentAPI.verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          onSuccess();
        } catch (error) {
          onError("Payment verification failed");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    onError("Failed to create payment order");
  }
};
