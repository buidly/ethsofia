import { memo } from 'react';
import {
  Handle,
  Position,
} from '@xyflow/react';

function StartNodeComponent() {
  return (
    <div className='flex border border-[#212121] bg-[#fdfdfc] rounded-3xl rounded-l-lg p-4 text-md'>
      <div>
        Start
      </div>
      <Handle type="source" position={Position.Right} className='h-5 w-2 rounded-none  border border-[#212121]' />
    </div>
  );
}

export const StartNode = memo(StartNodeComponent);
