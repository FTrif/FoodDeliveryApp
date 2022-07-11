import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim() === 5;

const Checkout = props => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameImputRef = useRef();
  const streetImputRef = useRef();
  const postalImputRef = useRef();
  const cityImputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameImputRef.current.value;
    const enteredStreet = streetImputRef.current.value;
    const enteredPostal = postalImputRef.current.value;
    const enteredCity = cityImputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.confirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? '' : classes.invalid
  } `;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? '' : classes.invalid
  } `;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? '' : classes.invalid
  } `;
  const postalControlClasses = `${classes.control} ${
    formInputValidity.postal ? '' : classes.invalid
  } `;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameImputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetImputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalImputRef} />
        {!formInputValidity.postal && <p>Please enter a valid postal code!</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityImputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
