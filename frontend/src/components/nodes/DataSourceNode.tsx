import { memo, useEffect, useState } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
} from '@xyflow/react';
import axios from 'axios';

function DataSourceNodeComponent({ id, data }: NodeProps<Node<{ url: string, path: string }>>) {
  const { updateNodeData } = useReactFlow();

  const [isValidUrl, setIsValidUrl] = useState(true);
  const [responseExample, setResponseExample] = useState<any>({});
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    const getUrlPaths = setTimeout(async () => {
      try {
        new URL(data.url);
        setIsValidUrl(true);
      } catch (error) {
        setIsValidUrl(false);
        return;
      }

      try {
        const result = await axios.get(data.url);
        setResponseExample(result.data);
        setCurrentPath('');
      } catch (error) {
        console.error(error);
      }
    }, 2000)

    return () => clearTimeout(getUrlPaths)

  }, [data.url]);

  console.log(currentPath, responseExample, responseExample[currentPath]);

  const currentObjectPath = currentPath.length > 0 ? responseExample[currentPath] : responseExample;

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
      <div>data source {id}</div>
      <div style={{ marginTop: 5 }}>
        url:
        <input
          value={data.url}
          onChange={(evt) => updateNodeData(id, { url: evt.target.value })}
          style={{ display: 'block' }}
        />
      </div>
      <div>
        path
        <input
          type="text"
          value={data.path}
          onChange={(evt) => updateNodeData(id, { path: evt.target.value })}
        />
        currentPath: {currentPath}
        <hr />
        {currentObjectPath &&
          <select value={currentPath} onChange={e => setCurrentPath(currentPath.length > 0 ? `${currentPath}.${e.target.value}` : e.target.value)}>
            {Object.keys(currentObjectPath).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        }
      </div>
      {!isValidUrl && <div style={{ color: 'red' }}>invalid url</div>}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} isConnectable={true} />
    </div>
  );
}

export const DataSourceNode = memo(DataSourceNodeComponent);
