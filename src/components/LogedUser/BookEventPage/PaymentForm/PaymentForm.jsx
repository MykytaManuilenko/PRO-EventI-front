import React from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";
import usePaymentForm from "./usePaymentForm";
import "./PaymentForm.scss";
import StripeInput from "../../../UI/Input/StripeInput";
import Button from "../../../UI/Button/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const PaymentForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit } = usePaymentForm(
    props.eventDetails.price,
    props.eventId,
    history,
    dispatch
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="paymentForm">
        <p className="title">Payment details</p>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <div className="cardDetails">
          <TextField
            label="Expiration Date"
            name="ccexp"
            variant="outlined"
            required
            fullWidth
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="CVC"
            name="cvc"
            variant="outlined"
            required
            fullWidth
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <Button class="payButton" type="submit">
          Pay
        </Button>
      </form>
    </>
  );
};

export default PaymentForm;
