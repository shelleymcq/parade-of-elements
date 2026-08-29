import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service-account.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const snapshot = await db.collection("elements").get();

const emails = [...new Set(
  snapshot.docs
    .map((doc) => doc.data().userEmail)
    .filter(Boolean)
)];

fs.writeFileSync("emails.txt", emails.join(", "));

console.log(`✅ Exported ${emails.length} unique emails.`);