import { type Node } from '@xyflow/react';

export type DataSourceNode = Node<{ url: string, path: string }, 'dataSource'>;
export type StartNode = Node<{}, 'start'>;
export type ResultNode = Node<{ aggregate: string }, 'result'>;
export type MyNode = StartNode | DataSourceNode | ResultNode;

// export const API_URL = 'http://34.147.108.248:5000';
export const API_URL = 'http://localhost:5001';
