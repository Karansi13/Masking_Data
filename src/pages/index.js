import React, { useState } from 'react';

const MaskSensitiveData = () => {
  const [inputData, setInputData] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);

  const maskSensitiveData = (data) => {
    const lines = data.split('\n');
    const result = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim());
      if (key.toLowerCase() === 'aadhaar') {
        result[key] = value.replace(/(\d{4})-(\d{4})-(\d{4})/, '$1-****-****');
      } else if (key.toLowerCase() === 'pan') {
        result[key] = value.replace(/([A-Z]{5}\d{4})([A-Z])/, '$1****');
      } else if (key.toLowerCase() === 'bank account') {
        result[key] = value.replace(/(\d{6})(\d{4})/, '******$2');
      } else {
        result[key] = value;
      }
    });

    return result;
  };

  const handleSubmit = () => {
    const processedData = maskSensitiveData(inputData);
    setJsonOutput(processedData);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Mask Sensitive Data</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Enter data here (e.g., Aadhaar: 1234-5678-9012)"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        className='text-black'
      ></textarea>
      <button onClick={handleSubmit} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Convert to JSON
      </button>
      {jsonOutput && (
        <div style={{ marginTop: '20px' }} className='text-black'>
          <h3>JSON Output:</h3>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MaskSensitiveData;
