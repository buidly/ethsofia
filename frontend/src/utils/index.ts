import { type Node } from '@xyflow/react';

export type TextNode = Node<{ text: string }, 'text'>;
export type DataSourceNode = Node<{ url: string, path: string }, 'dataSource'>;
export type StartNode = Node<{}, 'start'>;
export type ResultNode = Node<{}, 'result'>;
export type UppercaseNode = Node<{ text: string }, 'uppercase'>;
export type MyNode = TextNode | ResultNode | UppercaseNode | StartNode | DataSourceNode;
