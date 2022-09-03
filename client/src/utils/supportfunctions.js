import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Pop", value: "pop" },
  { id: 3, name: "Rock", value: "rock" },
  { id: 4, name: "Hip-Hop", value: "hip-hop" },
  { id: 5, name: "Club", value: "club" },
];

export const filterByLanguage = [
  { id: 1, name: "Espaniol", value: "espaniol" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Russian", value: "russian" },
  { id: 4, name: "France", value: "french" },
  { id: 5, name: "Germany", value: "deuchland" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
