import { Edge } from "@xyflow/react";
import { MyNode } from ".";

export interface Oracle {
  _id: string;
  title: string;
  description: string;
  nodes: MyNode[];
  edges: Edge[];
  isNew?: boolean;
  blobId?: string;
  walrusData?: any;
}