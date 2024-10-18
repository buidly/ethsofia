import { memo } from 'react';
import {
  Handle,
  NodeProps,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
  type Node,
} from '@xyflow/react';
import { type MyNode } from '../../utils';

function ResultNodeComponent({ id, data }: NodeProps<Node<{ aggregate: string }>>) {
  const { updateNodeData } = useReactFlow();

  const connections = useHandleConnections({
    type: 'target',
  });
  const nodesData = useNodesData<MyNode>(
    connections.map((connection) => connection.source),
  );
  const dataSourceNodes = nodesData.filter((node) => node.type === 'dataSource');

  // TODO: use data sources

  return (
    <div className='flex border border-[#212121] bg-[#fdfdfc] rounded-3xl rounded-r-lg p-4 text-md'>
      <Handle type="target" position={Position.Left} className='h-5 w-2 rounded-none  border border-[#212121]' />
      <div className='flex flex-col'>
        Aggregate results
        <select
          className="p-2 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
          value={data.aggregate}
          onChange={(e) => updateNodeData(id, { aggregate: e.target.value })}
        >
          <option value="min">MIN</option>
          <option value="max">MAX</option>
          <option value="average">AVERAGE</option>
          <option value="sum">SUM</option>
        </select>
        {/* {textNodes.map(({ data }, i) => <div key={i}>{(data as any).text}</div>) ||
          'none'} */}
      </div>
    </div>
  );
}

export const ResultNode = memo(ResultNodeComponent);
