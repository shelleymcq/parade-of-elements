import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service-account.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

function escape(value) {
  if (value === null || value === undefined) return "";

  if (value?.toDate instanceof Function) {
    value = value.toDate().toISOString();
  }

  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  value = String(value);

  if (/[,"\n]/.test(value)) {
    value = `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

const snapshot = await db.collection("elements").get();

const rows = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

// Collect every field that exists
const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];

const csv = [
  columns.join(","),
  ...rows.map((row) =>
    columns.map((c) => escape(row[c])).join(",")
  ),
].join("\n");

fs.writeFileSync("elements-export.csv", csv);

console.log(`✅ Exported ${rows.length} elements.`);