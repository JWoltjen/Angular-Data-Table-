import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular FIN POC';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'date', 'comment', 'action'];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService) {

  }
  ngOnInit(): void {
    this.getAllProducts(); 
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
      //after closed will re-call getAllProducts() so that the DOM is populated with the newly updated fields
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllProducts(); 
      }
    });
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
     next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
     },
     error:()=>{
      alert('Error while fetching products records')
     }
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllProducts(); 
      }
    });
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully")
      },
      error:()=>{
        alert("Error while deleting the product")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}