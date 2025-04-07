// src/components/Hero/Hero.js
import React from 'react';
import BrainModel from '../BrainModel/BrainModel'; // Import the new component
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      {/* Render the 3D model */}
      <BrainModel />

      {/* Keep the overlays/patterns */}
      <div className={styles.gridPattern}></div>
      <div className={styles.heroOverlay}></div>

      {/* Keep the content on top */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Neuro EEG-MRI Synergy</h1>
        <p className={styles.heroSubtitle}>Non-Invasive Brain Analytics Platform</p>
      </div>
    </section>
  );
}

export default Hero;