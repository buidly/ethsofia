import { addEdge, Controls, Edge, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import * as utils from "../../utils";
import { DataSourceNode, ResultNode, StartNode } from "../../components";
import { DnDProvider, Sidebar, useDnD } from "./components";
import axios from "axios";


const nodeTypes = {
  start: StartNode,
  dataSource: DataSourceNode,
  result: ResultNode,
};

const initNodes: utils.MyNode[] = [
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

  const onExport = async () => {
    console.log("exporting", title, nodes, edges);


    const dataSourceNodes = nodes.filter((node: utils.MyNode) => node.type === 'dataSource') as utils.DataSourceNode[];
    const resultNodes = nodes.filter((node: utils.MyNode) => node.type === 'result');
    const resultNode = resultNodes[0] as utils.ResultNode;
    // TODO add chesks

    const jsonContent = {
      "dataFeedName": title,
      "source": dataSourceNodes.map((node) => ({
        url: node.data.url,
        path: node.data.path
      })),
      "aggType": resultNode.data.aggregate
    }
    const content = JSON.stringify(jsonContent, null, 2);
    // const content = "A";

    const basePublisherUrl = 'https://publisher.walrus-testnet.walrus.space';
    const numEpochs = 1;
    // const response = await axios.put(`${basePublisherUrl}/v1/store`, content, {
    //   headers: {
    //     // "Content-Type": "text/plain",
    //     "Content-Type": "multipart/form-data",
    //   }
    // });

    const response = fetch(`${basePublisherUrl}/v1/store?epochs=${numEpochs}`, {
      method: "PUT",
      body: content,
    })

    console.log('walrus response', response);
  }

  return (
    <div>
      <div>
        project title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <button onClick={onExport}>Export</button>
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