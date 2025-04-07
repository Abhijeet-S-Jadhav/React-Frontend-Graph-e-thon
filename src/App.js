// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import EEGPanel from './components/EEGPanel/EEGPanel';
import MRIViewer from './components/MRIViewer/MRIViewer';
import Modal from './components/Modal/Modal';
import Footer from './components/Footer/Footer';

import './App.css'; // Import main layout styles

function App() {
  const [isMriVisible, setIsMriVisible] = useState(false);
  const [isProcessingMri, setIsProcessingMri] = useState(false); // Track MRI processing state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Function triggered by EEGPanel to show MRI panel
  const handleProcessMRI = () => {
    setIsProcessingMri(true); // Indicate processing starts
    // Simulate processing time before showing MRI
    setTimeout(() => {
      setIsMriVisible(true);
      setIsProcessingMri(false); // Processing finished
      // Optional: Scroll to MRI section smoothly
       const mriElement = document.querySelector(`.${'right-panel-wrapper'}`); // Use a more specific selector if needed
       if (mriElement) {
           mriElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }

    }, 1000); // Simulate 1 second processing
  };

  // Function triggered by MRIViewer to open the modal
  const handleOpenModal = (imageSrc, sliceName) => {
    setModalImage(imageSrc);
    setModalTitle(sliceName);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage('');
    setModalTitle('');
  };

  return (
    <div className="App">
      <Header />
      <Hero />

      <main className="main-container">
         {/* Left Panel Wrapper */}
        <div className="left-panel-wrapper">
             <EEGPanel onProcessMRI={handleProcessMRI} isProcessing={isProcessingMri} />
        </div>

         {/* Right Panel Wrapper */}
        <div className="right-panel-wrapper">
            <MRIViewer isVisible={isMriVisible} onImageClick={handleOpenModal} />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={modalImage}
        sliceName={modalTitle}
      />

      <Footer />
    </div>
  );
}

export default App;