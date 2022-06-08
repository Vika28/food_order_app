import {Fragment} from "react";
import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import {useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item) => <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodorderapp-56bab-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button-alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button
                className={styles.button}
                onClick={orderHandler}
            >Order</button>}
        </div>
    );

    const cartModalContent =(
        <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout
                onConfirm={submitOrderHandler}
                onCancel={props.onClose}
            />}
            {!isCheckOut && modalActions}
    </Fragment>);

    const isSubmittingModalContent = <p>Sending order data</p>;

    const didSubmitModalConetnt = <Fragment>
        <p>Successfully send the order</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onClose}>Close</button>
        </div>
    </Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalConetnt}
        </Modal>
    )
}

export default Cart;