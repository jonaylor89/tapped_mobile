import { useContext, createContext } from "react";
import DatabaseRepository from "../data/database_repository";
import SupabaseDatabaseImpl from "../data/prod/supabase_database_impl";

// TODO - Abstract this out a bit more?
const database = new SupabaseDatabaseImpl();

export const DatabaseContext = createContext<{
  database: DatabaseRepository;
}>({ database });

// export the useDepencies hook
export const useDatabase = () => {
  return useContext(DatabaseContext);
};
