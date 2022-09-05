import React from 'react';
import { StorageContext, useStorage } from '../useStorage';

export const StorageProvider = ({ children }: { children: any }) => {
    const { storage } = useStorage();

    const value = { storage };

    // use a provider to pass down the value
    return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

export default StorageProvider;
