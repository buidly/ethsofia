import { addEdge, Background, Controls, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DataSourceNode, NavBar, ResultNode, StartNode } from "../../components";
import { DnDProvider, Sidebar, useDnD } from "./components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Oracle } from "../../utils/types";
import { API_URL } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faClose, faPencil, faSadTear, faSave } from "@fortawesome/free-solid-svg-icons";
import React from "react";

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

export const DnDFlow = React.forwardRef(({ oracle, isEditMode }: { oracle: Oracle, isEditMode: boolean }, ref) => {
  const reactFlowWrapper = useRef(null);

  const [title, setTitle] = useState(oracle.title);
  const [description, setDescription] = useState(oracle.description);
  const [nodes, setNodes, onNodesChange] = useNodesState(oracle.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(oracle.edges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  useImperativeHandle(ref, () => ({
    fetchData() {
      return fetchData()
    }
  }));

  function fetchData() {
    return { ...oracle, title, description, nodes, edges };
  }

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
      <div className="flex flex-row-reverse rows-6 gap-6 justify-between ">
        {isEditMode && (
          <div className="row-span-2 flex flex-col gap-6">
            <div className='p-6 flex flex-col gap-4 bg-[#cfdeca] rounded-3xl'>
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-normal">Title:</label>
                <input
                  name="title"
                  className="p-4 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-normal">Description:</label>
                <textarea
                  className="p-4 border-2 border-[#212121] rounded-3xl bg-[#fdfdfc]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditMode}
                  rows={4}
                >
                </textarea>
              </div>
            </div>
            <Sidebar />
          </div>
        )}
        <div className="dndflow flex-1">
          <div className="reactflow-wrapper w-full h-full min-h-[600px] bg-[#d8dfe9] border-[#d8dfe9] border-4 rounded-3xl" ref={reactFlowWrapper} >
            <ReactFlow
              className="w-full h-full"
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
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
});

export const OracleEditorPageContent = () => {
  const flowRef = useRef()

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [oracle, setOracle] = useState<Oracle>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState<string | null>(null);

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
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin h-10 w-10" />
        <p>Loading..</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <FontAwesomeIcon icon={faSadTear} className="h-10 w-10" />
        <p>An error occurred</p>
      </div>
    )
  }

  const onSave = async () => {
    try {
      setLoadingEdit(true);

      const childResult = (flowRef.current as any).fetchData();
      const { isNew, ...oracleData } = childResult;

      if (isNew) {
        const result = await axios.post(`${API_URL}/oracles`, oracleData);
        console.log('new oracle', result.data);
        navigate(`/oracles/${result.data.id}`);
        return;
      }

      const result = await axios.put(`${API_URL}/oracles/${oracleData.id}`, oracleData);
      console.log('update oracle', result.data);
      setOracle(result.data);
    } catch (error) {
      console.error("Error saving oracle", error);
      setErrorEdit('Error saving oracle');
    } finally {
      // setIsEditMode(false);
      setLoadingEdit(false);
    }
    return;
    // TODO move to server
    // const dataSourceNodes = data.nodes.filter((node: utils.MyNode) => node.type === 'dataSource') as utils.DataSourceNode[];
    // const resultNodes = data.nodes.filter((node: utils.MyNode) => node.type === 'result');
    // const resultNode = resultNodes[0] as utils.ResultNode;
    // // TODO add chesks

    // const jsonContent = {
    //   "dataFeedName": title,
    //   "source": dataSourceNodes.map((node) => ({
    //     url: node.data.url,
    //     path: node.data.path
    //   })),
    //   "aggType": resultNode.data.aggregate
    // }
    // const content = JSON.stringify(jsonContent, null, 2);
    // // const content = "A";

    // const basePublisherUrl = 'https://publisher.walrus-testnet.walrus.space';
    // const numEpochs = 1;
    // // const response = await axios.put(`${basePublisherUrl}/v1/store`, content, {
    // //   headers: {
    // //     // "Content-Type": "text/plain",
    // //     "Content-Type": "multipart/form-data",
    // //   }
    // // });

    // const response = fetch(`${basePublisherUrl}/v1/store?epochs=${numEpochs}`, {
    //   method: "PUT",
    //   body: content,
    // })

    // console.log('walrus response', response);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">{oracle.title}</h1>
          <p className="font-light max-w-xl">{oracle.description} lorem ibsum is a long text that we are going to use to test the layout of this component</p>
        </div>
        <div className="flex flex-row gap-2 items-start">
          {isEditMode && (
            <div>
              <button className="p-4 px-6 border-2 border-[#212121] bg-[#eff0a3] rounded-3xl flex items-center gap-3" onClick={onSave}>
                Save
                {loadingEdit ? <FontAwesomeIcon icon={faCircleNotch} className="animate-spin h-5 w-5" /> : <FontAwesomeIcon icon={faSave} className="h-5 w-5" />}
              </button>
              {errorEdit && (
                <p className="mt-2 text-red-400 font-normal text-sm text-center">{errorEdit}</p>
              )}
            </div>
          )}
          <button className="p-4 px-6 border-2 border-[#212121] bg-[#fdfdfc] rounded-3xl flex items-center gap-3" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? (
              <>
                Close
                <FontAwesomeIcon icon={faClose} className="h-5 w-5" />
              </>
            ) : (
              <>
                Edit
                <FontAwesomeIcon icon={faPencil} className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
      {!isEditMode && (
        <div className='p-3 flex flex-row gap-4 bg-[#eff0a3] rounded-full'>
          <div className="bg-[#121212] rounded-full h-14 w-14 flex items-center justify-center">
            <img src="/snapdata-mini.png" alt="Logo" className="h-12 w-12" />
          </div>
          <div className="flex items-center">
            walrus info TODO
          </div>
        </div>
      )}
      <div>
        <ReactFlowProvider>
          <DnDProvider>
            <DnDFlow oracle={oracle} isEditMode={isEditMode} ref={flowRef} />
          </DnDProvider>
        </ReactFlowProvider>
      </div>
    </>
  );
}

export const OracleEditorPage = () => {
  return (
    <div>
      <NavBar />
      <div className="container m-auto p-6 flex flex-col gap-6 mt-12">
        <OracleEditorPageContent />
      </div>
    </div>
  )
}