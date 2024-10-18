import { memo, useEffect, useState } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
} from '@xyflow/react';
import axios from 'axios';
import { JsonPathPicker } from "react-json-path-picker";

function DataSourceNodeComponent({ id, data }: NodeProps<Node<{ url: string, path: string }>>) {
  const { updateNodeData } = useReactFlow();

  const [isValidUrl, setIsValidUrl] = useState(true);
  const [responseExample, setResponseExample] = useState<any>({});
  const [isPathExplorerOpen, setIsPathExplorerOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>('');

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
        setSelectedPath('');
      } catch (error) {
        console.error(error);
      }
    }, 2000)

    return () => clearTimeout(getUrlPaths)

  }, [data.url]);

  const onPathChoosen = (path: string) => {
    setSelectedPath(path);
    setIsPathExplorerOpen(false);
  }

  return (
    <div className='flex border border-[#212121] bg-[#fdfdfc] rounded-3xl p-4 text-md'>
      <div className='flex flex-col gap-2'>
        <div>Data source</div>
        <div>
          url:
          <input
            value={data.url}
            onChange={(evt) => updateNodeData(id, { url: evt.target.value })}
            className="p-2 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
          />
        </div>
        <div>
          <button onClick={() => setIsPathExplorerOpen(true)}>Choose JSON path</button>
          {isPathExplorerOpen && (
            <div>
              <JsonPathPicker
                json={JSON.stringify(responseExample, null, 2)}
                onChoose={onPathChoosen}
                path={selectedPath}
              />
            </div>
          )}
        </div>
        <div>
          path: {selectedPath.replace(/"/g, '').substring(1)}
        </div>
        {!isValidUrl && <div style={{ color: 'red' }}>invalid url</div>}
      </div>
      <Handle type="source" position={Position.Right} className='h-5 w-2 rounded-none  border border-[#212121]' />
      <Handle type="target" position={Position.Left} isConnectable={true} className='h-5 w-2 rounded-none  border border-[#212121]' />
    </div>
  );
}

export const DataSourceNode = memo(DataSourceNodeComponent);
