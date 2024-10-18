import { Edge } from "@xyflow/react";
import { MyNode } from ".";

export interface Oracle {
  id: string;
  title: string;
  description: string;
  nodes: MyNode[];
  edges: Edge[];
  isNew?: boolean;
}