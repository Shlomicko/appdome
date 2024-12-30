
export interface UiTreeNode {
  id: string;
  label: string;
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  category: string
  parent?: UiTreeNode;
  children?: UiTreeNode[];
}
