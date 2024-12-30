import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter, inject,
  Input,
  Output,
} from '@angular/core';
import { UiTreeNode } from '../../models/ui-tree-node';

@Component({
  selector: 'app-tree-node',
  imports: [],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent {
  @Input({
    transform: (value: UiTreeNode) => {
      console.log('value', value);
      return value;
    },
  })
  node!: UiTreeNode;
  @Input() multiSelect = false;
  @Output() expandToggle = new EventEmitter<UiTreeNode>();
  @Output() selectionChange = new EventEmitter<UiTreeNode>();

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  onExpandToggle(event: Event): void {
    event.stopPropagation();
    this.expandToggle.emit(this.node);
  }

  onSelectionChange(event: Event): void {
    event.stopPropagation();
    this.selectionChange.emit(this.node);
  }
}
