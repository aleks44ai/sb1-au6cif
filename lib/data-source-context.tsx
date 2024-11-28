"use client";

import React, { createContext, useContext, useState } from 'react';

type DataSource = 'coingecko' | 'coinmarketcap';

interface DataSourceContextType {
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;
}

const DataSourceContext = createContext<DataSourceContextType>({
  dataSource: 'coingecko',
  setDataSource: () => {},
});

export function DataSourceProvider({ children }: { children: React.ReactNode }) {
  const [dataSource, setDataSource] = useState<DataSource>('coingecko');

  return (
    <DataSourceContext.Provider value={{ dataSource, setDataSource }}>
      {children}
    </DataSourceContext.Provider>
  );
}

export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
};