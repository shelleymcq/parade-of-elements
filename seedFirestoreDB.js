// seedFirestore.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the JSON file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const elementsPath = path.join(__dirname, "src/utils/elements.json");

// Load JSON file
const elementsData = JSON.parse(await readFile(elementsPath, "utf-8"));

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyD6wWmKeFEZykCVmsiIMbwvEXBUI9FzMH0",
  authDomain: "parade-of-elements.firebaseapp.com",
  projectId: "parade-of-elements",
  storageBucket: "parade-of-elements.firebasestorage.app",
  messagingSenderId: "731736383068",
  appId: "1:731736383068:web:10e92392ed1044dff59099",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed Firestore
async function seedElements() {
  try {
    for (const el of elementsData) {
      const elementRef = doc(db, "elements", String(el.Z));
      await setDoc(elementRef, {
        number: el.Z,
        symbol: el.symbol,
        name: el.name,
        family: el.family || "",
        status: "available",
        userEmail: "",
      });
      console.log(`Seeded: ${el.name}`);
    }
    console.log("✅ All elements seeded!");
  } catch (err) {
    console.error("❌ Error seeding elements:", err);
  }
}

seedElements();
