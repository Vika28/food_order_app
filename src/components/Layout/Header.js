import { Fragment } from "react";
import styles from './Header.module.css';
import meals from './../../assets/meals.jpeg';
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={meals} alt=""/>
            </div>
        </Fragment>
    )
}

export default Header;