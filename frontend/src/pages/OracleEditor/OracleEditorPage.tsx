import { addEdge, Controls, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { DataSourceNode, ResultNode, StartNode } from "../../components";
import { DnDProvider, Sidebar, useDnD } from "./components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Oracle } from "../../utils/types";
import { API_URL } from "../../utils";

const nodeTypes = {
  start: StartNode,
  dataSource: DataSourceNode,
  result: ResultNode,
};

const initialData: any = {
  'dataSource': {
    url: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m',
    path: 'current.temperature_2m'
  },
  'result': {
    aggregate: 'avg'
  },
}

export const DnDFlow = ({ oracle, onSave }: { oracle: Oracle, onSave: any }) => {
  const reactFlowWrapper = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const [title, setTitle] = useState(oracle.title);
  const [description, setDescription] = useState(oracle.description);
  const [nodes, setNodes, onNodesChange] = useNodesState(oracle.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(oracle.edges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge({
      ...connection,
      type: 'smoothstep',
      animated: true
    },
      eds.map((edge) => ({ ...edge, type: 'smoothstep', animated: true })))),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        sourcePosition: 'right',
        targetPosition: 'left',
        data: initialData[type as any as string] ?? {},
      };
      setNodes((nds: any[]) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  return (
    <div>
      <button onClick={() => setIsEditMode(!isEditMode)}>edit mode: {isEditMode ? 'active' : 'disabled'}</button>
      <div>
        project title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isEditMode} />
      </div>
      <div>
        project description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!isEditMode} />
      </div>
      <div>
        <button onClick={() => onSave({ ...oracle, title, description, nodes, edges }, oracle.isNew)}>Save</button>
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
            edgesFocusable={isEditMode}
            nodesDraggable={isEditMode}
            nodesConnectable={isEditMode}
            nodesFocusable={isEditMode}
            draggable={isEditMode}
            panOnDrag={isEditMode}
            elementsSelectable={isEditMode}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export const OracleEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [oracle, setOracle] = useState<Oracle>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOracle = async () => {
      if (id === 'new') {
        setOracle({
          id: uuidv4(),
          isNew: true,
          title: 'Untitled Oracle',
          description: 'New Oracle Description',
          nodes: [
            {
              id: uuidv4(),
              type: 'start',
              data: {},
              position: { x: -100, y: -50 },
            },
          ],
          edges: [],
        });
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/oracles/${id}`);
        setOracle(response.data);
      } catch (error) {
        console.error("Error fetching oracle", error);
        setError('Error fetching oracle');
      } finally {
        setLoading(false);
      }
    }
    fetchOracle();
  }, []);

  if (loading || !oracle) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const onSave = async (data: Oracle, isNew?: boolean) => {
    if (isNew) {
      try {
        const { isNew, ...oracleData } = data;
        const result = await axios.post(`${API_URL}/oracles`, oracleData);
        console.log('new oracle', result.data);
        navigate(`/oracles/${result.data.id}`);
      } catch (error) {
        console.error("Error creating oracle", error);
        // TODO show error
      } finally {
        return;
      }
    }
    try {
      const result = await axios.put(`${API_URL}/oracles/${data.id}`, data);
      console.log('update oracle', result.data);

      // navigate(`/oracles/${result.data.id}`);
    } catch (error) {
      console.error("Error updating oracle", error);
      // TODO show error
    } finally {
      return;
    }

    return;
    // TODO move to server
    const dataSourceNodes = data.nodes.filter((node: utils.MyNode) => node.type === 'dataSource') as utils.DataSourceNode[];
    const resultNodes = data.nodes.filter((node: utils.MyNode) => node.type === 'result');
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
    <>
      <header>
        <h1>Oracle Flow Editor {id}</h1>
      </header>
      <main>
        <ReactFlowProvider>
          <DnDProvider>
            <DnDFlow oracle={oracle} onSave={onSave} />
          </DnDProvider>
        </ReactFlowProvider>
      </main>
    </>
  );
}