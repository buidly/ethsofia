import { MyNode } from '../../../utils';
import { useDnD } from './DnDContext';

export const Sidebar = ({ currentNodes }: { currentNodes: MyNode[] }) => {
  const [_, setType] = useDnD();

  const hasStartNode = currentNodes.some((node) => node.type === 'start');
  const hasResultNode = currentNodes.some((node) => node.type === 'result');

  const onDragStart = (event: any, nodeType: any) => {
    // @ts-ignore
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='p-6 flex flex-col gap-4 bg-[#d8dfe9] rounded-3xl flex-1'>
      <p className='font-light'>You can drag these nodes to the pane on the left.</p>
      <div className='flex flex-row gap-2'>
        <div
          className={`dndnode py-4 px-10 border-2 border-[#212121] rounded-3xl rounded-l-lg bg-[#fdfdfc] ${hasStartNode ? 'opacity-50' : ''}`}
          onDragStart={(event) => onDragStart({ event }, 'start')}
          draggable={!hasStartNode}
        >
          Start
        </div>
        <div
          className="dndnode py-4 px-10 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
          onDragStart={(event) => onDragStart(event, 'dataSource')}
          draggable
        >
          Data source
        </div>
        <div
          className={`dndnode py-4 px-10 border-2 border-[#212121] rounded-3xl rounded-r-lg bg-[#fdfdfc] ${hasResultNode ? 'opacity-50' : ''}`}
          onDragStart={(event) => onDragStart(event, 'result')}
          draggable={!hasResultNode}
        >
          Result
        </div>
      </div>
    </div>
  );
};
