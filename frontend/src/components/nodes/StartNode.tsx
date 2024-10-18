import { memo } from 'react';
import {
  Handle,
  Position,
} from '@xyflow/react';

function StartNodeComponent() {
  return (
    <div
      style={{
        border: '1px solid green',
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <div>
        Start
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export const StartNode = memo(StartNodeComponent);
