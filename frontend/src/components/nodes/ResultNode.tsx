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
    <div
      style={{
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        Result:
        <select value={data.aggregate} onChange={(e) => updateNodeData(id, { aggregate: e.target.value })}>
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
