// src/components/Modal/Modal.js
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, imageSrc, sliceName }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]); // Depend on isOpen and onClose


  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}> {/* Close on overlay click */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking content */}
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={imageSrc} alt={sliceName || "Enlarged MRI Slice"} className={styles.modalImage} />
        {sliceName && <p className={styles.modalCaption}>{sliceName}</p>}
      </div>
    </div>
  );
}

export default Modal;