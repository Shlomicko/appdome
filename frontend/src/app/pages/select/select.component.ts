import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TreeSelectComponent } from '../../components/tree-select/tree-select.component';
import { TreeDataService } from '../../services/tree-data.service';
import { UiTreeNode } from '../../models/ui-tree-node';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-select',
  imports: [TreeSelectComponent, AsyncPipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  private dataService: TreeDataService = inject(TreeDataService);

  treeData$ = this.dataService.data$.pipe(
    tap((data) => console.log('poop', data)),
  );

  protected onSelectionchange($event: UiTreeNode | UiTreeNode[]) {}

  ngOnInit(): void {
    this.dataService.getData();
  }
}
