// src/components/Footer/Footer.js
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>© {currentYear} NeuroScan // AI by Algo Sappers 6.0. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;