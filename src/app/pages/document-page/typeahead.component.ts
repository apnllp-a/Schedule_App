import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Item } from './types';
import { UserAll } from 'src/app/models/user/user-all.model';

@Component({
  selector: 'app-typeahead',
  templateUrl: 'typeahead.component.html',
  styleUrls: ['typeahead.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TypeaheadComponent implements OnInit {
  @Input() user_all: UserAll[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredItems: UserAll[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.user_all];
    this.workingSelectedValues = [...this.selectedItems];
  }

//   trackItems(index: number, item: Item) {
//     return item.firstname;
//   }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(ev:any) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.user_all];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.user_all.filter((item) => {
        return item.id.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((item) => item === value);
  }

  checkboxChange(ev:any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((item) => item !== value);
    }
  }
}
