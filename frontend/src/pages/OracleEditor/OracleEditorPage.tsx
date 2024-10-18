import { addEdge, Controls, Edge, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import { MyNode } from "../../utils";
import { DataSourceNode, ResultNode, StartNode } from "../../components";
import { DnDProvider, Sidebar, useDnD } from "./components";


const nodeTypes = {
  start: StartNode,
  dataSource: DataSourceNode,
  result: ResultNode,
};

const initNodes: MyNode[] = [
  {
    id: 'dndnode_0',
    type: 'start',
    data: {},
    position: { x: -100, y: -50 },
  },
];

const initEdges: Edge[] = [];

let id = 1;
const getId = () => `dndnode_${id++}`;

export const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);

  const [title, setTitle] = useState("workflow title");

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge({ ...connection, type: 'smoothstep', animated: true }, eds.map((edge) => ({ ...edge, type: 'smoothstep', animated: true })))),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const initialData: any = {
        'dataSource': { url: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m', path: 'current.temperature_2m' },
        'result': { aggregate: 'avg' },
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: 'right',
        targetPosition: 'left',
        data: initialData[type as any as string] ?? {},
      };
      console.log("newNode", newNode, type);
      setNodes((nds: any[]) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  return (
    <div>
      <div>
        project title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '800px', height: '600px', border: "2px solid pink" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}


export const OracleFlowEditor = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export const OracleEditorPage = () => {
  return (
    <>
      <header>
        <h1>Oracle Flow Editor</h1>
      </header>
      <main>
        <OracleFlowEditor />
      </main>
    </>
  );
}