import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchForm: FormGroup;

  input: string;
  data: string[];
  chunk: string[];
  totalItem = 0;
  perPage = 25;
  page = 1;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      input: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  // method that calls service method to fetch possible combinations by subscribing to it
  fetchPossibleCombinations() {
    if (this.searchForm.valid && (this.input.length === 7 || this.input.length === 10)) {
      this.data = [];
      this.chunk = [];
      this.dataService.fetchData(this.input).subscribe(res => {
        this.data = res.body.data;
        this.chunk = this.data.slice(0, this.perPage);
        this.totalItem = res.body.count;
      });
    }
  }

  // makes next 25 items visible i.e. it shows the next page
  next() {
    if (this.page <= this.totalItem / this.perPage) {
      this.page++;
      const offset = (this.page - 1) * this.perPage;
      this.chunk = this.data.slice(offset, offset + this.perPage);
    }
  }

  // makes previous 25 items visible i.e. it shows the previous page
  previous() {
    if (this.page > 1) {
      this.page--;
      const offset = (this.page - 1) * this.perPage;
      this.chunk = this.data.slice(offset, offset + this.perPage);
    }
  }

  // updates number of items in table to be displayed on single page 
  updateList() {
    const offset = (this.page - 1) * this.perPage;
    this.chunk = this.data.slice(offset, offset + this.perPage);
  }

  // sets number of items to display on a single page
  onPerPageChange(value: number) {
    this.perPage = value;
    this.updateList();
  }

  // method called on each keydown event to reset data in table and total count
  onKey(event: any) {
    if (event.target.value.length != 7 || event.target.value.length != 10) {
      this.chunk = [];
    }
    this.totalItem = 0;
    this.data = ['click search'];
  }
}
