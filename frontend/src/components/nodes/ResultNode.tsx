import { memo } from 'react';
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  type Node,
} from '@xyflow/react';

function ResultNodeComponent({ id, data }: NodeProps<Node<{ aggregate: string }>>) {
  const { updateNodeData } = useReactFlow();

  // const connections = useHandleConnections({
  //   type: 'target',
  // });
  // const nodesData = useNodesData<MyNode>(
  //   connections.map((connection) => connection.source),
  // );
  // const dataSourceNodes = nodesData.filter((node) => node.type === 'dataSource');
  {/* {textNodes.map(({ data }, i) => <div key={i}>{(data as any).text}</div>) ||
          'none'} */}

  return (
    <div className='flex border border-[#212121] bg-[#121212] rounded-3xl rounded-r-lg text-md flex-col'>
      <Handle type="target" position={Position.Left} className='h-8 w-2 rounded-none  border border-[#212121] bg-[#212121] top-[calc(50%+15px)]' />
      <div className='px-4 py-2 text-[#fdfdfc]'>
        <h4 className='text-sm uppercase font-normal text-center'>Aggregate data results</h4>
      </div>
      <div className='flex flex-col gap-4 bg-[#eff0a3] p-4 rounded-3xl rounded-r-lg'>
        <div className="flex flex-col gap-2">
          <label htmlFor="aggregate" className="text-xs font-normal">Aggregation:</label>
          <select
            name="aggregate"
            className="p-4 rounded-3xl border border-[#121212] bg-[#eff0a3] focus:outline-none text-sm"
            value={data.aggregate}
            onChange={(e) => updateNodeData(id, { aggregate: e.target.value })}
          >
            <option value="min">MIN</option>
            <option value="max">MAX</option>
            <option value="average">AVERAGE</option>
            <option value="sum">SUM</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export const ResultNode = memo(ResultNodeComponent);
