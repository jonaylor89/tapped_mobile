import { useContext, createContext } from "react";
import SupabaseStorageImpl from "../data/prod/supabase_storage_impl";
import StorageRepository from "../data/storage_repository";

// TODO - Abstract this out a bit more?
const storage = new SupabaseStorageImpl();

export const StorageContext = createContext<{
  storage: StorageRepository;
}>({ storage });

// export the useStorage hook
export const useStorage = () => {
  return useContext(StorageContext);
};
