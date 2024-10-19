import { memo } from 'react';
import {
  Handle,
  Position,
} from '@xyflow/react';

function StartNodeComponent() {
  return (
    <div className='flex border border-[#212121] bg-[#121212] rounded-3xl rounded-l-lg p-4 text-md'>
      <div className='px-4 py-2 text-[#fdfdfc]'>
        <h4 className='text-sm uppercase font-normal text-center'>Start</h4>
      </div>
      <Handle type="source" position={Position.Right} className='h-8 w-2 rounded-none  border border-[#212121] bg-[#eff0a3]' />
    </div>
  );
}

export const StartNode = memo(StartNodeComponent);
