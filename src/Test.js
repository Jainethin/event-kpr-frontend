import React, { useState } from 'react';

const Test = () => {
  const [firstResult, setFirstResult] = useState('');
  const [secondResult, setSecondResult] = useState('');

  // Simulate the first function
  const firstFunction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = "First function result";
        console.log(result);
        resolve(result);
      }, 2000); // Simulating a 2-second task
    });
  };

  // Simulate the second function
  const secondFunction = async (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = `Second function result using: ${input}`;
        console.log(result);
        resolve(result);
      }, 2000); // Simulating another 2-second task
    });
  };

  // Sequential execution
  const executeFunctions = async () => {
    const result1 = await firstFunction(); // Wait for the first function to complete
    setFirstResult(result1);

    const result2 = await secondFunction(result1); // Pass the first result to the second function
    setSecondResult(result2);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sequential Execution Example</h1>
      <button
        onClick={executeFunctions}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Execute Functions
      </button>

      <div className="mt-4">
        <p><strong>First Function Result:</strong> {firstResult}</p>
        <p><strong>Second Function Result:</strong> {secondResult}</p>
      </div>
    </div>
  );
};

export default Test;
