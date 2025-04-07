// src/components/Header/Header.js
import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* You can replace this with an actual SVG or image component */}
        <span className={styles.logoText}>NeuroScan // AI</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#eeg-data">EEG Data</a></li>
          <li><a href="#mri-analysis">MRI Analysis</a></li>
          <li><a href="#reports">Reports</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;