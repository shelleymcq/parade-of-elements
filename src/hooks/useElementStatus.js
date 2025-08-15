// src/hooks/useElementStatus.js
import { useEffect, useState } from "react";
import { db } from "../firebaseClient";
import { collection, onSnapshot } from "firebase/firestore";

export default function useElementStatus() {
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "elements");
    const unsubscribe = onSnapshot(
      colRef,
      (snap) => {
        const next = {};
        snap.forEach((doc) => {
          const data = doc.data();
          next[doc.id] =
            data?.status === "unavailable" ? "unavailable" : "available";
        });
        setStatusMap(next);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore subscribe error:", err);
        setLoading(false);
      }
    );

    // ✅ return a cleanup function, not a Promise
    return () => unsubscribe();
  }, []);

  return { statusMap, loading };
}
