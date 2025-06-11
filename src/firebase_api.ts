import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import type { ProductType, UserType } from "./types/types";

const firebaseConfig = {
  apiKey: "AIzaSyAC8cuu3UqjWSObsjOuojtd4w52eqlKMBk",
  authDomain: "grocery-app-da86f.firebaseapp.com",
  projectId: "grocery-app-da86f",
  storageBucket: "grocery-app-da86f.firebasestorage.app",
  messagingSenderId: "412513265122",
  appId: "1:412513265122:web:b5b01401cdc8f20d6605bb"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


export async function fetchProducts_fb() {
    const querySnapshot = await getDocs(collection(database, "products"));
    const products: ProductType[] = querySnapshot.docs.map(item => ({
        ...(item.data() as ProductType)
    }));
    return products;
}

export async function fetchUsers_fb() {
    const querySnapshot = await getDocs(collection(database, "users"));
    const users: UserType[] = querySnapshot.docs.map(item => ({
        ...(item.data() as UserType)
    }));
    return users;
}