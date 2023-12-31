import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, error: null, success: false };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case "error":
      return {
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    case "deleteDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

// 데이터를 저장할 컬렉션
export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // colRef : 컬렉션의 참조 요구
  const colRef = collection(appFireStore, transaction);

  // 컬렉션에 문서를 추가
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });

    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
