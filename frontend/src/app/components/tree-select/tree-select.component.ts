import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UiTreeNode } from '../../models/ui-tree-node';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-tree-select',
  imports: [TreeNodeComponent, FormsModule],
  templateUrl: './tree-select.component.html',
  styleUrl: './tree-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectComponent implements AfterViewInit {
  @Input({
    transform: (value: UiTreeNode[] | null): UiTreeNode[] => value || [],
  })
  treeData!: UiTreeNode[];
  @Input() multiSelect = true;
  @Input() showSearch = true;
  @Output() selectionChange = new EventEmitter<UiTreeNode | UiTreeNode[]>();

  selectedNodes: UiTreeNode[] = [];

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  ngAfterViewInit(): void {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'input')
        .pipe(
          debounceTime(500),
          map((event) => {
            console.log('ngAfterViewInit', event);
            //const input: HTMLInputElement = event
            const evt = event as unknown as Event;
            return (evt.target as HTMLInputElement).value;
          }),
        )
        .subscribe((query) => {
          if (query) {
            console.log(query);
          }
        });
    }
  }

  toggleExpand(node: UiTreeNode): void {
    if (node.children?.length) {
      node.expanded = !node.expanded;
      node.children.forEach((node) => (node.visible = !node.visible));
    }
  }

  toggleSelection(node: UiTreeNode): void {
    if (node.disabled) {
      return;
    }

    if (this.multiSelect) {
      node.selected = !node.selected;

      if (node.children?.length) {
        this.setChildrenSelection(node.children, node.selected);
      }

      this.updateParentSelection(node.parent);

      this.selectedNodes = this.getAllSelectedNodes(this.treeData);
      this.selectionChange.emit(this.selectedNodes);
      this.treeData = structuredClone(this.treeData);
    } else {
      this.clearSelection(this.treeData);
      node.selected = true;
      this.selectionChange.emit(node);
    }
  }

  private setChildrenSelection(nodes: UiTreeNode[], selected: boolean): void {
    nodes.forEach((node) => {
      if (!node.disabled) {
        node.selected = selected;
        if (node.children?.length) {
          this.setChildrenSelection(node.children, selected);
        }
      }
    });
  }

  private updateParentSelection(parent?: UiTreeNode): void {
    if (!parent) return;

    const allChildren = parent.children || [];
    const selectedChildren = allChildren.filter((child) => child.selected);

    parent.selected = selectedChildren.length === allChildren.length;

    if (parent.parent) {
      this.updateParentSelection(parent.parent);
    }
  }

  private clearSelection(nodes: UiTreeNode[]): void {
    nodes.forEach((node) => {
      node.selected = false;
      if (node.children?.length) {
        this.clearSelection(node.children);
      }
    });
  }

  private getAllSelectedNodes(nodes: UiTreeNode[]): UiTreeNode[] {
    let selected: UiTreeNode[] = [];

    nodes.forEach((node) => {
      if (node.selected) {
        selected.push(node);
      }
      if (node.children?.length) {
        selected = selected.concat(this.getAllSelectedNodes(node.children));
      }
    });

    return selected;
  }
}
