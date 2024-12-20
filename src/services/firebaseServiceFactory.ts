import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { app, db } from "../config/firebaseConfig";

// Abstract Factory Interface
interface FirebaseService {
  signUp(email: string, password: string): Promise<any>;
  signIn(email: string, password: string): Promise<any>;
  saveUserData(userId: string, data: any): Promise<void>;
  getUserData(userId: string): Promise<any>;
}

// Firebase Auth Service (Concrete Service)
class FirebaseAuthService implements FirebaseService {
  private auth = getAuth(app);

  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {}
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {}
  }

  async saveUserData(userId: string, data: any): Promise<void> {
    const userRef = ref(db, "users/" + userId);
    await set(userRef, data);
  }

  async getUserData(userId: string): Promise<any> {
    const userRef = ref(db, "users/" + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No user data found");
    }
  }
}

// FirebaseServiceFactory (Factory)
class FirebaseServiceFactory {
  static getService(serviceType: "auth" | "database"): FirebaseService {
    switch (serviceType) {
      case "auth":
        return new FirebaseAuthService();
      case "database":
        return new FirebaseAuthService();
      default:
        throw new Error("Invalid service type");
    }
  }
}

export { FirebaseServiceFactory };
