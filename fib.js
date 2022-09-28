exports.handler = async (event) => {
  // TODO implement
  const result = [0, 1];
  
  for (let i = 2; i < 10; i++) {
      const prevNum1 = result[i-1];
      const prevNum2 = result[i-2];
      result.push(prevNum1 + prevNum2);
  }
  const response = {
      statusCode: 200,
      body: result.join(' '),
      // body: `0 1 1 2 3 5 8 13 21 34` 
  };
  return response;
};
