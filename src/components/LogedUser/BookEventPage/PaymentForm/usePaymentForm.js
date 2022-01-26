import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../../../utils/axiosInstance";
import { uiActions } from "../../../../redux/slices/ui";

function usePaymentForm(eventPrice, eventId, history, dispatch) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const cardElement = elements?.getElement(CardElement);
    const cardElement = elements?.getElement(CardNumberElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;
    console.log("paymentMethodId :>> ", paymentMethodId);
    console.log("eventPrice :>> ", eventPrice);

    const data = {
      paymentMethodId: paymentMethodId,
      currency: "pln",
    };
    axiosInstance
      .post(`/api/events/book/${eventId}`, data)
      .then((res) => {
        console.log("res :>> ", res);
        dispatch(
          uiActions.openAlert({
            status: "success",
            message:
              "Your ticket is in your profile :) We are waiting to see you on event!",
          })
        );
        history.push(`/events/${eventId}`);
      })
      .catch((err) => {
        console.log("err :>> ", err);
        dispatch(
          uiActions.openAlert({
            status: "error",
            message: err.response.data.message,
          })
        );
      });
    // fetch(`${process.env.REACT_APP_API_URL}/charge`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     paymentMethodId,
    //     amount: eventPrice,
    //   }),
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  return {
    handleSubmit,
  };
}

export default usePaymentForm;
