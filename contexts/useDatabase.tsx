
import type UserModel from '../models/UserModel'

import React, { useContext, createContext, Component } from 'react';
import SupabaseDatabaseImpl from '../services/prod/supabase_database_impl';

// TODO - Abstract this out a bit more?
const database = new SupabaseDatabaseImpl()

const DatabaseContext = createContext(database);

export const DatabaseProvider = ({ children }: { 
    children: any 
}) => {

    // use a provider to pass down the value
    return (
        <DatabaseContext.Provider value={database}>
           { children }
        </DatabaseContext.Provider>
    );
};

// export the useDepencies hook
export const useDatabase = () => {
    return useContext(DatabaseContext);
};