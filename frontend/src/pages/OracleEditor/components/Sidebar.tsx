import { useDnD } from './DnDContext';

export const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    // @ts-ignore
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='p-6 flex flex-col gap-4'>
      <p className='font-light'>You can drag these nodes to the pane on the left.</p>
      <div
        className="dndnode py-4 px-10 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
        onDragStart={(event) => onDragStart({ event }, 'start')}
        draggable
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
        className="dndnode py-4 px-10 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
        onDragStart={(event) => onDragStart(event, 'result')}
        draggable
      >
        Result
      </div>
    </div>
  );
};
