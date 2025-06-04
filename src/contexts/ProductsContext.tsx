
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Pc {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  specs: string[];
  spec_icons?: string[];
  highlight: boolean;
  highlight_text?: string;
  image?: string;
  secondary_images?: string[];
  created_at?: string;
  updated_at?: string;
}

interface Periferico {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  specs?: string[];
  highlight: boolean;
  highlight_text?: string;
  image?: string;
  secondary_images?: string[];
  created_at?: string;
  updated_at?: string;
}

interface ProductsContextType {
  pcs: Pc[];
  perifericos: Periferico[];
  loading: boolean;
  addPc: (pc: Omit<Pc, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addPeriferico: (periferico: Omit<Periferico, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePc: (id: string, pc: Partial<Pc>) => Promise<void>;
  updatePeriferico: (id: string, periferico: Partial<Periferico>) => Promise<void>;
  deletePc: (id: string) => Promise<void>;
  deletePeriferico: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPcs = async () => {
    try {
      const { data, error } = await supabase
        .from('pcs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedPcs = data?.map(pc => ({
        ...pc,
        specs: Array.isArray(pc.specs) ? pc.specs.map(String) : [],
        spec_icons: Array.isArray(pc.spec_icons) ? pc.spec_icons.map(String) : [],
        secondary_images: Array.isArray(pc.secondary_images) ? pc.secondary_images.map(String) : [],
        description: pc.description || '',
        highlight_text: pc.highlight_text || '',
        image: pc.image || '',
      })) || [];
      
      setPcs(formattedPcs);
    } catch (error) {
      console.error('Error fetching PCs:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar PCs do banco de dados.",
        variant: "destructive",
      });
    }
  };

  const fetchPerifericos = async () => {
    try {
      const { data, error } = await supabase
        .from('perifericos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedPerifericos = data?.map(periferico => ({
        ...periferico,
        specs: Array.isArray(periferico.specs) ? periferico.specs.map(String) : [],
        secondary_images: Array.isArray(periferico.secondary_images) ? periferico.secondary_images.map(String) : [],
        description: periferico.description || '',
        highlight_text: periferico.highlight_text || '',
        image: periferico.image || '',
      })) || [];
      
      setPerifericos(formattedPerifericos);
    } catch (error) {
      console.error('Error fetching Periféricos:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar periféricos do banco de dados.",
        variant: "destructive",
      });
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchPcs(), fetchPerifericos()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();

    // Subscribe to realtime changes
    const pcsChannel = supabase
      .channel('pcs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pcs' }, () => {
        fetchPcs();
      })
      .subscribe();

    const perifericosChannel = supabase
      .channel('perifericos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'perifericos' }, () => {
        fetchPerifericos();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(pcsChannel);
      supabase.removeChannel(perifericosChannel);
    };
  }, []);

  const addPc = async (newPc: Omit<Pc, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('pcs')
        .insert([{
          ...newPc,
          specs: newPc.specs || [],
          spec_icons: newPc.spec_icons || [],
          secondary_images: newPc.secondary_images || [],
        }]);

      if (error) throw error;
      
      await fetchPcs();
    } catch (error) {
      console.error('Error adding PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar PC.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const addPeriferico = async (newPeriferico: Omit<Periferico, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('perifericos')
        .insert([{
          ...newPeriferico,
          specs: newPeriferico.specs || [],
          secondary_images: newPeriferico.secondary_images || [],
        }]);

      if (error) throw error;
      
      await fetchPerifericos();
    } catch (error) {
      console.error('Error adding Periférico:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar periférico.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePc = async (id: string, updatedPc: Partial<Pc>) => {
    try {
      const { error } = await supabase
        .from('pcs')
        .update({
          ...updatedPc,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchPcs();
    } catch (error) {
      console.error('Error updating PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar PC.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePeriferico = async (id: string, updatedPeriferico: Partial<Periferico>) => {
    try {
      const { error } = await supabase
        .from('perifericos')
        .update({
          ...updatedPeriferico,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchPerifericos();
    } catch (error) {
      console.error('Error updating Periférico:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar periférico.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePc = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pcs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPcs();
    } catch (error) {
      console.error('Error deleting PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar PC.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePeriferico = async (id: string) => {
    try {
      const { error } = await supabase
        .from('perifericos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPerifericos();
    } catch (error) {
      console.error('Error deleting Periférico:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar periférico.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <ProductsContext.Provider value={{
      pcs,
      perifericos,
      loading,
      addPc,
      addPeriferico,
      updatePc,
      updatePeriferico,
      deletePc,
      deletePeriferico,
      refreshData
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
