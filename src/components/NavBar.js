import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/app.module.css';

const NavBar = () => {
    return(
        <div className = {styles.nav}>
            <NavLink to='dep' className={styles.child}>Отделы пиццерии</NavLink>
            <NavLink to='jobs' className={styles.child}>Должности</NavLink>
            <NavLink to='staff' className={styles.child}>Сотрудники</NavLink>
            <NavLink to='orders' className={styles.child}>Заказы</NavLink>
            <NavLink to='couriers' className={styles.child}>Доставка</NavLink>
            <NavLink to='/' className={styles.child}>Главная</NavLink>
        </div> 
    );
};

export default NavBar;

