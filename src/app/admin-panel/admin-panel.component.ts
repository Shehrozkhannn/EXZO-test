import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Products } from '../interfaces/products';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsAdminComponent } from '../products-admin/products-admin.component';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }



@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'price', 'description', 'ratings','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dataService:  DataService, public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.dataService.getAllProductsList().then((products:any)=>{
      console.log('PRODUCTS--->',products)
      this.dataSource = new MatTableDataSource(products);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    this.dialog.open(ProductsAdminComponent,{
      width: '500px'
    });
  }


}