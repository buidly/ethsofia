import { useDnD } from './DnDContext';

export const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    // @ts-ignore
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart({ event }, 'start')} draggable>
        Start
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'dataSource')} draggable>
        Data source
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'result')} draggable>
        Result
      </div>
    </aside>
  );
};
