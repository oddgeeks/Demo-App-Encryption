import { useEffect, useState } from 'react';
import { connectWebSocket } from '../utils/websocket';
import JSONDisplay from '../components/JSONDisplay';
import { DecryptedData } from '../types/types';

export default function Home() {
  const [data, setData] = useState<DecryptedData | null>(null);

  useEffect(() => {
    connectWebSocket((newData: DecryptedData) => {
      setData(newData);
    });
  }, []);

  return (
    <div className='p-5'>
      <h1>Real-Time JSON Display</h1>
      {data ? <JSONDisplay jsonData={data} /> : <p>No data available</p>}
    </div>
  );
}
