import styles from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredCityIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    }
    // const nameControlStyles = formInputsValidity.name ? '' : styles.invalid;
    const nameControlStyles = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
    const streetControlStyles = `${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`;
    const postalCodeControlStyles = `${styles.control} ${formInputsValidity.postalCode ? '' : styles.invalid}`;
    const cityControlStyles = `${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlStyles}>
                <label htmlFor="name">Your name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please, enter a valid name</p>}
            </div>
            <div className={streetControlStyles}>
                <label htmlFor="street">Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please, enter a valid street</p>}
            </div>
            <div className={postalCodeControlStyles}>
                <label htmlFor="postal">Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!formInputsValidity.postalCode && <p>Please, enter a valid postal code</p>}
            </div>
            <div className={cityControlStyles}>
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please, enter a valid city</p>}
            </div>
            <button
                type='button'
                onClick={props.onCancel}
            >Cancel</button>
            <button>Confirm</button>
        </form>
    )
}

export default Checkout;