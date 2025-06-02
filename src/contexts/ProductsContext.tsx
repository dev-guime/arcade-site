
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pc, Periferico } from '@/types/database';

interface ProductsContextType {
  pcs: Pc[];
  perifericos: Periferico[];
  addPc: (pc: Omit<Pc, 'id'>) => void;
  addPeriferico: (periferico: Omit<Periferico, 'id'>) => void;
  updatePc: (id: number, pc: Partial<Pc>) => void;
  updatePeriferico: (id: number, periferico: Partial<Periferico>) => void;
  deletePc: (id: number) => void;
  deletePeriferico: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pcs, setPcs] = useState<Pc[]>([]);
  const [perifericos, setPerifericos] = useState<Periferico[]>([]);

  const addPc = (newPc: Omit<Pc, 'id'>) => {
    const id = Math.max(...pcs.map(p => p.id), 0) + 1;
    setPcs([...pcs, { ...newPc, id }]);
  };

  const addPeriferico = (newPeriferico: Omit<Periferico, 'id'>) => {
    const id = Math.max(...perifericos.map(p => p.id), 0) + 1;
    setPerifericos([...perifericos, { ...newPeriferico, id }]);
  };

  const updatePc = (id: number, updatedPc: Partial<Pc>) => {
    setPcs(pcs.map(pc => pc.id === id ? { ...pc, ...updatedPc } : pc));
  };

  const updatePeriferico = (id: number, updatedPeriferico: Partial<Periferico>) => {
    setPerifericos(perifericos.map(p => p.id === id ? { ...p, ...updatedPeriferico } : p));
  };

  const deletePc = (id: number) => {
    setPcs(pcs.filter(pc => pc.id !== id));
  };

  const deletePeriferico = (id: number) => {
    setPerifericos(perifericos.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{
      pcs,
      perifericos,
      addPc,
      addPeriferico,
      updatePc,
      updatePeriferico,
      deletePc,
      deletePeriferico
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
