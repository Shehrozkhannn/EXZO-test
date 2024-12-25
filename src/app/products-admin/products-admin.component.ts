import { Component, input, OnInit } from '@angular/core';
import {
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

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule,MatIconModule,CommonModule,ReactiveFormsModule],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.scss'
})
export class ProductsAdminComponent implements OnInit{
  uploadedFileName: string | null = null;
  selectedFile: File | null = null
  productsForm!: FormGroup

  constructor(private fb: FormBuilder, private dataService: DataService){
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      ratings: ['', Validators.required],
    });
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
      this.selectedFile = input.files[0];
      const file = input.files[0];
      this.uploadedFileName = file.name;
      console.log('Selected file:', file);
    }
  }

  async saveForm() {
    if (this.productsForm.valid && this.selectedFile) {
      const productsData = { ...this.productsForm.value, stars: [] };
      try {
        await this.dataService.addProduct(productsData, this.selectedFile);
        alert('Product added successfully!');
        this.productsForm.reset();
        this.selectedFile = null; // Clear selected file
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      }
    } else {
      alert('Please fill out all fields and select an image.');
    }
  }
}
