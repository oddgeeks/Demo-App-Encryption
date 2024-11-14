import dynamic from 'next/dynamic';
import { DecryptedData } from '../types/types';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface JSONDisplayProps {
  jsonData: DecryptedData;
}

const JSONDisplay: React.FC<JSONDisplayProps> = ({ jsonData }) => {
  return (
    <div className='mt-5 p-5 rounded-sm bg-slate-50'>
      <ReactJson src={jsonData} theme="monokai" collapsed={false} />
    </div>
  );
};

export default JSONDisplay;
