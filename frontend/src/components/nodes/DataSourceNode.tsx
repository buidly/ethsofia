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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
        // TODO cache
      } catch (error) {
        console.error(error);
      }
    }, 1000)

    return () => clearTimeout(getUrlPaths)

  }, [data.url]);

  const onPathChoosen = (path: string) => {
    setSelectedPath(path);
    setIsPathExplorerOpen(false);
  }

  return (
    <div className='flex border border-[#212121] bg-[#121212] rounded-3xl text-md flex-col min-w-[30rem]'>
      <div className='px-4 py-2 text-[#fdfdfc]'>
        <h4 className='text-sm uppercase font-normal text-center'>Data Source</h4>
      </div>
      {isPathExplorerOpen && (
        <div className='flex flex-col gap-2 bg-[#eff0a3] p-4 rounded-3xl'>
          <div className='flex flex-row text-md font-normal justify-between items-center'>
            <p>
              Choose Data Path from the JSON response
            </p>
            <FontAwesomeIcon icon={faTimes} onClick={() => setIsPathExplorerOpen(false)} className='w-6 h-6' />
          </div>
          <div className='bg-[#fdfdfc] p-4 rounded-3xl mt-4'>
            <JsonPathPicker
              json={JSON.stringify(responseExample, null, 2)}
              onChoose={onPathChoosen}
              path={selectedPath}
            />
          </div>
        </div>
      )}
      {!isPathExplorerOpen && (
        <div className='flex flex-col gap-2 bg-[#eff0a3] p-4 rounded-3xl'>
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-xs font-normal">Data Source URL:</label>
            <input
              name="url"
              className="p-4 rounded-3xl border border-[#121212] bg-[#eff0a3] focus:outline-none text-sm"
              value={data.url}
              onChange={(evt) => updateNodeData(id, { url: evt.target.value })}
            />
            {!isValidUrl && <div className='text-xs text-red-500'>The provided Data Source URL is invalid</div>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-xs font-normal">Data Source Path:</label>
            <button
              className="px-6 py-4 rounded-3xl border border-[#121212] bg-[#eff0a3] focus:outline-none text-sm w-fit"
              onClick={() => setIsPathExplorerOpen(true)}
            >
              {selectedPath.length ? selectedPath.replace(/"/g, '').substring(1) : 'Choose data path'}
            </button>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} className='h-8 w-2 rounded-none border border-[#212121] bg-[#212121] top-[calc(50%+15px)]' />
      <Handle type="target" position={Position.Left} isConnectable={true} className='h-8 w-2 rounded-none  border border-[#212121] bg-[#212121] top-[calc(50%+15px)]' />
    </div>
  );
}

export const DataSourceNode = memo(DataSourceNodeComponent);
