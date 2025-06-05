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
  highlight_color?: string;
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
  highlight_color?: string;
  image?: string;
  secondary_images?: string[];
  created_at?: string;
  updated_at?: string;
}

interface DeliveredPc {
  id: string;
  name: string;
  customer: string;
  delivery_date: string;
  location: string;
  specs: string[];
  image?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductsContextType {
  pcs: Pc[];
  perifericos: Periferico[];
  deliveredPcs: DeliveredPc[];
  loading: boolean;
  addPc: (pc: Omit<Pc, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addPeriferico: (periferico: Omit<Periferico, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addDeliveredPc: (deliveredPc: Omit<DeliveredPc, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePc: (id: string, pc: Partial<Pc>) => Promise<void>;
  updatePeriferico: (id: string, periferico: Partial<Periferico>) => Promise<void>;
  updateDeliveredPc: (id: string, deliveredPc: Partial<DeliveredPc>) => Promise<void>;
  deletePc: (id: string) => Promise<void>;
  deletePeriferico: (id: string) => Promise<void>;
  deleteDeliveredPc: (id: string) => Promise<void>;
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
  const [deliveredPcs, setDeliveredPcs] = useState<DeliveredPc[]>([]);
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
        highlight_color: 'cyan',
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
        highlight_color: 'cyan',
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

  const fetchDeliveredPcs = async () => {
    try {
      const { data, error } = await supabase
        .from('delivered_pcs')
        .select('*')
        .order('delivery_date', { ascending: false });

      if (error) throw error;
      
      const formattedDeliveredPcs = data?.map(pc => ({
        ...pc,
        specs: Array.isArray(pc.specs) ? pc.specs.map(String) : [],
        image: pc.image || '',
      })) || [];
      
      setDeliveredPcs(formattedDeliveredPcs);
    } catch (error) {
      console.error('Error fetching Delivered PCs:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar PCs entregues do banco de dados.",
        variant: "destructive",
      });
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchPcs(), fetchPerifericos(), fetchDeliveredPcs()]);
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

    const deliveredPcsChannel = supabase
      .channel('delivered-pcs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'delivered_pcs' }, () => {
        fetchDeliveredPcs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(pcsChannel);
      supabase.removeChannel(perifericosChannel);
      supabase.removeChannel(deliveredPcsChannel);
    };
  }, []);

  const addPc = async (newPc: Omit<Pc, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('pcs')
        .insert([{
          name: newPc.name,
          price: newPc.price,
          category: newPc.category,
          description: newPc.description,
          specs: newPc.specs || [],
          spec_icons: newPc.spec_icons || [],
          secondary_images: newPc.secondary_images || [],
          highlight: newPc.highlight,
          highlight_text: newPc.highlight_text,
          image: newPc.image,
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
          name: newPeriferico.name,
          price: newPeriferico.price,
          category: newPeriferico.category,
          description: newPeriferico.description,
          specs: newPeriferico.specs || [],
          secondary_images: newPeriferico.secondary_images || [],
          highlight: newPeriferico.highlight,
          highlight_text: newPeriferico.highlight_text,
          image: newPeriferico.image,
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

  const addDeliveredPc = async (newDeliveredPc: Omit<DeliveredPc, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('delivered_pcs')
        .insert([{
          name: newDeliveredPc.name,
          customer: newDeliveredPc.customer,
          delivery_date: newDeliveredPc.delivery_date,
          location: newDeliveredPc.location,
          specs: newDeliveredPc.specs || [],
          image: newDeliveredPc.image,
        }]);

      if (error) throw error;
      
      await fetchDeliveredPcs();
    } catch (error) {
      console.error('Error adding Delivered PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar PC entregue.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePc = async (id: string, updatedPc: Partial<Pc>) => {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      // Only include fields that exist in the database
      if (updatedPc.name !== undefined) updateData.name = updatedPc.name;
      if (updatedPc.price !== undefined) updateData.price = updatedPc.price;
      if (updatedPc.category !== undefined) updateData.category = updatedPc.category;
      if (updatedPc.description !== undefined) updateData.description = updatedPc.description;
      if (updatedPc.specs !== undefined) updateData.specs = updatedPc.specs;
      if (updatedPc.spec_icons !== undefined) updateData.spec_icons = updatedPc.spec_icons;
      if (updatedPc.secondary_images !== undefined) updateData.secondary_images = updatedPc.secondary_images;
      if (updatedPc.highlight !== undefined) updateData.highlight = updatedPc.highlight;
      if (updatedPc.highlight_text !== undefined) updateData.highlight_text = updatedPc.highlight_text;
      if (updatedPc.image !== undefined) updateData.image = updatedPc.image;

      const { error } = await supabase
        .from('pcs')
        .update(updateData)
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
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      // Only include fields that exist in the database
      if (updatedPeriferico.name !== undefined) updateData.name = updatedPeriferico.name;
      if (updatedPeriferico.price !== undefined) updateData.price = updatedPeriferico.price;
      if (updatedPeriferico.category !== undefined) updateData.category = updatedPeriferico.category;
      if (updatedPeriferico.description !== undefined) updateData.description = updatedPeriferico.description;
      if (updatedPeriferico.specs !== undefined) updateData.specs = updatedPeriferico.specs;
      if (updatedPeriferico.secondary_images !== undefined) updateData.secondary_images = updatedPeriferico.secondary_images;
      if (updatedPeriferico.highlight !== undefined) updateData.highlight = updatedPeriferico.highlight;
      if (updatedPeriferico.highlight_text !== undefined) updateData.highlight_text = updatedPeriferico.highlight_text;
      if (updatedPeriferico.image !== undefined) updateData.image = updatedPeriferico.image;

      const { error } = await supabase
        .from('perifericos')
        .update(updateData)
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

  const updateDeliveredPc = async (id: string, updatedDeliveredPc: Partial<DeliveredPc>) => {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (updatedDeliveredPc.name !== undefined) updateData.name = updatedDeliveredPc.name;
      if (updatedDeliveredPc.customer !== undefined) updateData.customer = updatedDeliveredPc.customer;
      if (updatedDeliveredPc.delivery_date !== undefined) updateData.delivery_date = updatedDeliveredPc.delivery_date;
      if (updatedDeliveredPc.location !== undefined) updateData.location = updatedDeliveredPc.location;
      if (updatedDeliveredPc.specs !== undefined) updateData.specs = updatedDeliveredPc.specs;
      if (updatedDeliveredPc.image !== undefined) updateData.image = updatedDeliveredPc.image;

      const { error } = await supabase
        .from('delivered_pcs')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchDeliveredPcs();
    } catch (error) {
      console.error('Error updating Delivered PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar PC entregue.",
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

  const deleteDeliveredPc = async (id: string) => {
    try {
      const { error } = await supabase
        .from('delivered_pcs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchDeliveredPcs();
    } catch (error) {
      console.error('Error deleting Delivered PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar PC entregue.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <ProductsContext.Provider value={{
      pcs,
      perifericos,
      deliveredPcs,
      loading,
      addPc,
      addPeriferico,
      addDeliveredPc,
      updatePc,
      updatePeriferico,
      updateDeliveredPc,
      deletePc,
      deletePeriferico,
      deleteDeliveredPc,
      refreshData
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
