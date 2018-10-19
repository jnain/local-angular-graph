import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface Source {
  source: string; 
  somme: number; 
}

const ELEMENT_DATA: Source[] = [
  {source: "France", somme: 58}, 
  {source: "Pays-Bas", somme: 74}, 
  {source: "Italie", somme: 56}, 
  {source: "Danemark", somme: 32}, 
  {source: "Espagne", somme: 48}, 
  {source: "Angleterre", somme: 21}, 
  {source: "Argentine", somme: 16}, 
  {source: "Autriche", somme: 98}, 
];

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  dataSource = new MatTableDataSource<Source>();

  @Input() 
  set tableData(data: Source[]) {
    this.dataSource.data = data;
  }
 
  get tableData(): Source[] { return this.dataSource.data; }

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource.data = ELEMENT_DATA;
  }

  ngOnInit(): void {
    if (this.tableData) {
      this.dataSource.data = this.tableData;    
    }
  }

  

  displayedColumns: string[] = ['source', 'somme'];
}
