import { inject, Injectable } from '@angular/core';
import { UiTreeNode } from '../models/ui-tree-node';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { mockTreeData } from '../mocks/data';
import { TreeData, TreeNode } from '../models/tree-node';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TreeDataService {
  private dataSubject: BehaviorSubject<UiTreeNode[]> = new BehaviorSubject<
    UiTreeNode[]
  >([]);
  data$: Observable<UiTreeNode[]> = this.dataSubject.asObservable();

  private readonly http: HttpClient = inject(HttpClient);

  private readonly path = 'http://localhost:3000';

  constructor() {}

  getData(): void {
    this.http
      .get<TreeData>(`${this.path}/api/data`)
      .pipe(map((data) => this.createData(data.nodes)))
      .subscribe((uiData) => this.dataSubject.next(uiData));
  }

  setData(data: UiTreeNode[]): void {
    this.http
      .post<TreeData>(`${this.path}/api/process-data`, {
        data: { nodes: data },
      })
      .subscribe();
  }

  private createData(nodes: TreeNode[], parent?: UiTreeNode): UiTreeNode[] {
    return nodes.reduce((acc, node) => {
      const initializedNode: UiTreeNode = {
        category: node.category,
        id: node.id,
        label: node.label,
        selected: false,
        expanded: false,
        visible: true,
        parent,
      };

      if (node.children?.length) {
        initializedNode.children = [
          ...node.children,
        ] as unknown as UiTreeNode[];
        initializedNode.children.forEach((node) => {
          node.selected = false;
          node.expanded = false;
          node.visible = false;
          node.parent = initializedNode;
        });
        this.createData(node.children, initializedNode);
      }

      return [...acc, initializedNode];
    }, [] as UiTreeNode[]);
  }
}
