// src/components/Hero/Hero.js
import React from 'react';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.gridPattern}></div> {/* Added Grid Pattern */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Neuro EEG-MRI Synergy</h1>
        <p className={styles.heroSubtitle}>Non-Invasive Brain Analytics Platform</p>
      </div>
    </section>
  );
}

export default Hero;