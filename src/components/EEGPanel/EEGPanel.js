// src/components/EEGPanel/EEGPanel.js
import React, { useState } from 'react';
import styles from './EEGPanel.module.css';

// Mock data function (replace with actual processing logic later)
const generateMockEEGData = () => {
  const channels = ['Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4', 'P3', 'P4', 'O1', 'O2'];
  const bands = ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'];
  return channels.map(channel => ({
    channel,
    band: bands[Math.floor(Math.random() * bands.length)],
    peak: (Math.random() * 100).toFixed(2),
    mean: (Math.random() * 50).toFixed(2),
    stdDev: (Math.random() * 15).toFixed(2),
  }));
};


function EEGPanel({ onProcessMRI, isProcessing }) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [eegFile, setEegFile] = useState(null);
  const [eegFileName, setEegFileName] = useState('');
  const [eegName, setEegName] = useState('');

  const [submittedData, setSubmittedData] = useState(null);
  const [eegTableData, setEegTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For upload simulation

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEegFile(file);
      setEegFileName(file.name);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setSubmittedData(null); // Reset previous data display
    setEegTableData([]);

    // Simulate API call / processing
    setTimeout(() => {
      const formData = {
        patientName,
        patientAge,
        patientGender,
        diagnosis,
        fileName: eegFileName,
        sampleName: eegName,
      };
      setSubmittedData(formData);
      setEegTableData(generateMockEEGData()); // Generate mock data
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second upload/processing time
  };

  const canUpload = patientName && patientAge && patientGender && eegFile && eegName;

  return (
    <div className={`panel ${styles.eegPanel}`}>
      <h2>Upload & Configure EEG</h2>

      {/* Form Section */}
      <form onSubmit={handleUpload} className={styles.uploadSection}>
        <div className={styles.formGrid}> {/* Grid for inputs */}
            <div>
                <label htmlFor="patientName">Patient Name:</label>
                <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. John Doe"
                required
                />
            </div>
            <div>
                <label htmlFor="patientAge">Age:</label>
                <input
                type="number"
                id="patientAge"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="e.g. 31"
                required
                min="0"
                />
            </div>
             <div>
                <label htmlFor="patientGender">Gender:</label>
                <select
                id="patientGender"
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
                required
                >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
            </div>
            <div>
                 <label htmlFor="diagnosis">Diagnosis/Prelim:</label>
                <input
                    type="text"
                    id="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="e.g. Epilepsy"
                />
            </div>
             <div>
                <label htmlFor="eegFile">Upload EEG File:</label>
                <input
                    type="file"
                    id="eegFile"
                    onChange={handleFileChange}
                    accept=".txt,.csv,.edf"
                    required
                    className={styles.fileInput}
                />
                 {eegFileName && <span className={styles.fileNameDisplay}>Selected: {eegFileName}</span>}
            </div>
            <div>
                 <label htmlFor="eegName">EEG Sample Name:</label>
                <input
                    type="text"
                    id="eegName"
                    value={eegName}
                    onChange={(e) => setEegName(e.target.value)}
                    placeholder="e.g. Patient001_Baseline_EEG"
                    required
                />
            </div>
        </div>

        <button type="submit" disabled={!canUpload || isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Sample'}
        </button>
      </form>

      {/* Divider */}
      {(isLoading || submittedData) && <hr className={styles.divider} />}


      {/* Loading Indicator */}
      {isLoading && <div className={styles.loadingIndicator}>Processing EEG Data...</div>}


      {/* EEG Summary Section - Conditional Rendering */}
      {submittedData && !isLoading && (
        <div className={styles.sampleInfo} >
          <h3>EEG Summary</h3>
          <div className={styles.infoGrid}>
            <div><strong>Patient:</strong> <span>{submittedData.patientName}</span></div>
            <div><strong>Age:</strong> <span>{submittedData.patientAge}</span></div>
            <div><strong>Gender:</strong> <span>{submittedData.patientGender}</span></div>
            <div><strong>Diagnosis:</strong> <span>{submittedData.diagnosis || 'N/A'}</span></div>
            <div><strong>File Name:</strong> <span>{submittedData.fileName}</span></div>
            <div><strong>Sample Name:</strong> <span>{submittedData.sampleName}</span></div>
          </div>

          <h4>EEG Data Channels (Mock)</h4>
          <div className={styles.tableContainer}>
             <table className={styles.eegTable}>
                <thead>
                    <tr>
                    <th>Channel</th>
                    <th>Band</th>
                    <th>Peak (μV)</th>
                    <th>Mean (μV)</th>
                    <th>Std Dev</th>
                    </tr>
                </thead>
                <tbody>
                    {eegTableData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.channel}</td>
                        <td>{row.band}</td>
                        <td>{row.peak}</td>
                        <td>{row.mean}</td>
                        <td>{row.stdDev}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
          </div>


          <div className={styles.eegVisual}>
            <h4>EEG Visualization (Placeholder)</h4>
            <img
              src="https://www.researchgate.net/publication/331401347/figure/fig1/AS:731261270237184@1551357681016/Example-of-EEG-recording-for-10-channels-during-perception-of-visual-stimuli-green.png"
              alt="Sample EEG Wave"
              className={styles.eegImage}
            />
          </div>

          <button onClick={onProcessMRI} disabled={isProcessing}>
             {isProcessing ? 'Processing...' : 'Process MRI Synergy'}
          </button>
        </div>
      )}
    </div>
  );
}

export default EEGPanel;