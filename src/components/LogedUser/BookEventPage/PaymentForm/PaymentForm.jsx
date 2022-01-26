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
import { styled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const PaymentForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit } = usePaymentForm(
    "2",
    props.eventId,
    history,
    dispatch
  );

  const CardElementContainer = styled("div")({
    width: "60%",
    display: "flex",
    flexDirection: "column",
    aligItems: "center",
    "& .StripeElement": {
      width: "100%",
      padding: "15px",
    },
  });
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
        {/* <CardElementContainer>
          <CardElement />
        </CardElementContainer> */}

        <Button class="payButton" type="submit">
          Pay
        </Button>
        {/* <button>Pay</button> */}
      </form>
    </>
  );
};

export default PaymentForm;
