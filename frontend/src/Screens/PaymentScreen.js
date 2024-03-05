import { useState, useEffect } from "react" 
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Button, Col, FormGroup } from "react-bootstrap"
import FormContainer from "../Components/FormContainer"
import CheckoutSteps from "../Components/CheckoutSteps"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    };

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type="radio"
                    className="my-2"
                    label='Paypal or Credit Card'
                    id="PayPal"
                    name='Paymentmethod'
                    value='Paypal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </FormGroup>

            <Button type="submit" varient='Primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen