import React from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineRocket, AiOutlineShoppingCart } from 'react-icons/ai';

import styles from './NavigationBar.module.scss';

type Props = {
  showCheckout: boolean;
}

const NavigationBar = ({ showCheckout }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.navIcon}>
        <Link className={styles.navIcon} to="/" aria-label="Go to home page">
          <AiOutlineRocket aria-hidden size={32} />
        </Link>
      </div>

      {/* Open Slots */}
      <div className={styles.navIcon}></div>
      <div className={styles.navIcon}></div>

      {
        showCheckout ? (
          <Link className={styles.navIcon} to="/checkout" aria-label="Go to checkout">
            <AiOutlineShoppingCart aria-hidden size={32} />
          </Link>
        ) : <div className={styles.navIcon}></div>
      }
    </div>
  )
};

export default NavigationBar;