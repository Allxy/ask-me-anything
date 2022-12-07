import React, {useEffect, useState} from 'react';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App" onClick={()=>setState((state+1))}>
      {state}
    </div>
  );
}

export default App;
