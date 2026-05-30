import React, { useState, useEffect } from 'react';

// function UseEffect() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => prev + 1);
//     }, 1000000000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h1>useEffect Example: Self Counter</h1>
//       <h2>{count}</h2>
//     </div>
//   );
// }
function UseEffect() {
  // fetch data api
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data => setApiData(data));
  }, []);

  return (
    <>
      <h1>UseEffect Example: Self Counter</h1>
      <h2>Counter</h2>
      <h3>API Title: {apiData?.title}</h3>
     

    </>
  );
}

export default UseEffect;