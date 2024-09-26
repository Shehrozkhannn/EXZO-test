import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  totalProductCount = new BehaviorSubject(0);
  cartItems:any = [];
  $totalProductCount = this.totalProductCount.asObservable();
  firestore: Firestore = inject(Firestore);
  viewProducts: any=[];
  userId:any = '';
  constructor(private auth: Auth) { 
    this.auth.onAuthStateChanged((user)=> {
      console.log('BEST--->',user)
      this.userId = user?.uid;
    })
  }

  updateProductCount(productCount: number){
    this.totalProductCount.next(productCount);
  }

   async getAllProductsList(){
    try {
      const collectionRef = collection(this.firestore, 'Products');
      const snapshot = await getDocs(collectionRef);
      this.viewProducts= snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
      });
      return this.viewProducts;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  async addToCartData(){
    const collectionRef = collection(this.firestore, 'AddedCartItems');
    const q = query(collectionRef, where ('userId', '==',this.userId ))
    const snapshot = await getDocs(q);

    const cartItems = snapshot.docs.map((doc)=>({
      id: doc.id,
      ...doc.data()
    }));
    console.log(cartItems);
    return cartItems
  }
}
