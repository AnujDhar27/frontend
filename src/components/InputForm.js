import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Prepare the data in the required format
      const parsedData = {
        data: inputData.split(',')
      };

      // Make the API call to your deployed Flask app
      const response = await axios.post('https://bajaj-finserv-pied.vercel.app/', parsedData);
      setResponseData(response.data);

    } catch (err) {
      setError('There was an issue processing your request. Please make sure the input is correct.');
    }
  };

  return (
    <div>
      <h2>BFHL Challenge Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dataInput">Enter your data (comma-separated values):</label>
        <input
          type="text"
          id="dataInput"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="e.g., A,1,B,c,2,z"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h3>API Response:</h3>
          <p><strong>Numbers:</strong> {responseData.numbers.join(', ')}</p>
          <p><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</p>
          <p><strong>Highest Lowercase Alphabet:</strong> {responseData.highest_lowercase_alphabet.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
