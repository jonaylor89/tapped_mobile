import React from 'react';
import { DatabaseContext, useDatabase } from '../useDatabase';

export function DatabaseProvider({ children }: { children: any }) {
  const { database } = useDatabase();

  const value = { database };

  // use a provider to pass down the value
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export default DatabaseProvider;
