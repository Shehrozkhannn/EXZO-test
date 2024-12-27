import { Component, Inject, input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule,MatIconModule,CommonModule,ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.scss'
})
export class ProductsAdminComponent implements OnInit{
  uploadedFileName: string | null = null;
  productsForm!: FormGroup;
  productsLoader: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any){
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      ratings: ['', Validators.required],
    });
    if(this.data){
      const {productName , description ,  price , ratings, id} = this.data;
      this.productsForm.setValue({
        productName: productName,
        description: description,
        price: price,
        ratings: ratings,
      });
      this.productsForm.addControl('id', this.fb.control(id || null));
    }
  }

  triggerFileInput(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const fileInput = document.getElementById('productImage') as HTMLInputElement;
    fileInput.click();
  }
  
  preventDialogClose(event: Event): void {
    event.stopPropagation();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedFileName = file.name;
    }
  }

  async saveForm() {
    this.productsLoader = true
    if (this.productsForm.valid) {
      const productsData = { ...this.productsForm.value, stars: [],  imageUrl: '../../assets/user.png'};
      const { id } = productsData;
      try {
        if(id){
          await this.dataService.updateProduct(id, productsData);
          alert('Product updated successfully!');
        }else {
          const newDocId = await this.dataService.addProduct(productsData);
          alert('Product added successfully!');
          this.productsForm.reset();
          this.productsLoader = false;
        }
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
        this.productsLoader = false;
      }
    } else {
      alert('Please fill out all required fields.');
      this.productsLoader = false;
    }
  }
}
