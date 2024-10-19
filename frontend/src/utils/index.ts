import { type Node } from '@xyflow/react';

export type DataSourceNode = Node<{ url: string, path: string }, 'dataSource'>;
export type StartNode = Node<{}, 'start'>;
export type ResultNode = Node<{ aggregate: string }, 'result'>;
export type MyNode = StartNode | DataSourceNode | ResultNode;

export const API_URL = 'https://ethsofia-api.buidly.com';
// export const API_URL = 'http://localhost:5001';
export const BASE_PUBLISHER_URL = 'https://walrus-testnet-publisher.nodeinfra.com';
