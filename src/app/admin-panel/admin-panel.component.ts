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
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }



@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatProgressSpinner],
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
  productsLoader: boolean = false;

  constructor(private dataService:  DataService, public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    try {
      this.productsLoader = true
      await this.dataService.getAllProductsList().then((products:any)=>{
        console.log('PRODUCTS--->',products)
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productsLoader = false;
      });
    } catch (error) {
      this.productsLoader = true;
      console.error('Error fetching products:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row : any | null = null){
    this.dialog.open(ProductsAdminComponent,{
      width: '500px',
      data: row ? {...row} : null
    });
  }

  deleteProduct(product:Products){
   this.dataSource.data = this.dataSource.data.filter((val)=> val.id !== product.id);
  }
}