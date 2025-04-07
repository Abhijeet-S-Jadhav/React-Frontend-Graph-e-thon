// src/components/MRIViewer/MRIViewer.js
import React, { useState, useEffect } from 'react';
import styles from './MRIViewer.module.css';

function MRIViewer({ isVisible, onImageClick }) {
  const [mriStats, setMriStats] = useState({
    resolution: '--',
    timeslice: '--',
    sliceIndex: '--'
  });

  // Simulate loading MRI data when visible
  useEffect(() => {
    if (isVisible) {
      // Simulate fetching/calculating stats
      setTimeout(() => {
        setMriStats({
          resolution: '1.0 x 1.0 x 1.0 mm',
          timeslice: 'T1 Post-Gadolinium',
          sliceIndex: '128 / 256',
        });
      }, 500); // Simulate delay
    } else {
       // Optionally reset stats when hidden
       setMriStats({ resolution: '--', timeslice: '--', sliceIndex: '--'});
    }
  }, [isVisible]); // Re-run effect when isVisible changes

   const axialImg = "https://mrimaster.com/wp-content/uploads/2023/08/slice-thickness-5mm-1.jpg";
   const sagittalImg = "https://upload.wikimedia.org/wikipedia/commons/c/c5/MRI_brain_sagittal_section.jpg?20131018125821";
   const coronalImg = "https://www.rcemlearning.co.uk/wp-content/uploads/modules/principles-of-mri-of-the-brain-and-spine/Screen-Shot-2017-10-30-at-17.38.10.png";


  return (
    <div className={`panel ${styles.mriViewer} ${isVisible ? styles.visible : styles.hidden}`}>
      <h2>MRI Visualization & Synergy</h2>
        <div className={styles.contentWrapper}> {/* Needed if visibility logic applied */}
        <div className={styles.mriStats}>
            <p><strong>Resolution:</strong> <span className={styles.statValue}>{mriStats.resolution}</span></p>
            <p><strong>Sequence:</strong> <span className={styles.statValue}>{mriStats.timeslice}</span></p>
            <p><strong>Slice Index:</strong> <span className={styles.statValue}>{mriStats.sliceIndex}</span></p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.mriPreviews}>
            <div className={styles.mriSlice} onClick={() => onImageClick(axialImg, 'Axial Slice')}>
            <img src={axialImg} alt="Axial Slice" />
            <p>Axial</p>
            </div>
            <div className={styles.mriSlice} onClick={() => onImageClick(sagittalImg, 'Sagittal Slice')}>
            <img src={sagittalImg} alt="Sagittal Slice"/>
            <p>Sagittal</p>
            </div>
            <div className={styles.mriSlice} onClick={() => onImageClick(coronalImg, 'Coronal Slice')}>
            <img src={coronalImg} alt="Coronal Slice" />
            <p>Coronal</p>
            </div>
        </div>
        </div>
    </div>
  );
}

export default MRIViewer;