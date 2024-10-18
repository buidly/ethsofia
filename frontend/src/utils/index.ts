import { type Node } from '@xyflow/react';

export type DataSourceNode = Node<{ url: string, path: string }, 'dataSource'>;
export type StartNode = Node<{}, 'start'>;
export type ResultNode = Node<{ aggregate: string }, 'result'>;
export type MyNode = StartNode | DataSourceNode | ResultNode;
