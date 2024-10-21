import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  totalProductCount = new BehaviorSubject(0);
  $totalProductCount = this.totalProductCount.asObservable();
  cartItems:any = [];
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
    // New method to wait for userId
    waitForUserId(): Promise<string> {
      return new Promise((resolve) => {
        const unsubscribe = this.auth.onAuthStateChanged((user) => {
          if (user) {
            this.userId = user.uid;
            unsubscribe(); // Stop listening once we have the userId
            resolve(this.userId); // Resolve the promise with the userId
          }
        });
      });
    }

  async addToCartData(){
    if (!this.userId) {
      console.error('User ID is not available. Cannot fetch cart data.');
      return { cartItems: [], itemCount: 0 };
    }
    const collectionRef = collection(this.firestore, 'AddedCartItems');
    const q = query(collectionRef, where ('userId', '==',this.userId ))
    const snapshot = await getDocs(q);

    const cartItems = snapshot.docs.map((doc)=>({
      documentId: doc.id,
      ...doc.data()
    }));
    const itemCount = snapshot.size
    this.totalProductCount.next(itemCount)
    console.log(cartItems);
    return {cartItems, itemCount}
  }

  async updateCartItem(item: any) {
    try {
      const docRef = doc(this.firestore, 'AddedCartItems', item.documentId); // Reference to the document
      await updateDoc(docRef, {
        quantity: item.quantity, // Update the quantity in Firestore
        modifiedPrice: item.modifiedPrice // Optionally, update the price if it depends on quantity
      });
      console.log('Cart item updated successfully');
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  }

  async deleteCartItem(itemId: string): Promise<void> {
    try {
      const itemRef = doc(this.firestore, `AddedCartItems/${itemId}`);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting item from Firestore:', error);
      throw error;
    }
  }

}
