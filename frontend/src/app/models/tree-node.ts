export interface TreeNode {
  id: string;
  label: string;
  category: string;
  children?: TreeNode[];
}

export interface TreeData {
  nodes: TreeNode[];
}
