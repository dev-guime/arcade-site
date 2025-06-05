
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
      console.log('Fetching PCs...');
      const { data, error } = await supabase
        .from('pcs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching PCs:', error);
        throw error;
      }
      
      const formattedPcs = data?.map(pc => ({
        ...pc,
        specs: Array.isArray(pc.specs) ? pc.specs.map(String) : [],
        spec_icons: Array.isArray(pc.spec_icons) ? pc.spec_icons.map(String) : [],
        secondary_images: Array.isArray(pc.secondary_images) ? pc.secondary_images.map(String) : [],
        description: pc.description || '',
        highlight_text: pc.highlight_text || '',
        highlight_color: pc.highlight_color || 'cyan',
        image: pc.image || '',
      })) || [];
      
      console.log('PCs fetched successfully:', formattedPcs.length);
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
      console.log('Fetching Periféricos...');
      const { data, error } = await supabase
        .from('perifericos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching Periféricos:', error);
        throw error;
      }
      
      const formattedPerifericos = data?.map(periferico => ({
        ...periferico,
        specs: Array.isArray(periferico.specs) ? periferico.specs.map(String) : [],
        secondary_images: Array.isArray(periferico.secondary_images) ? periferico.secondary_images.map(String) : [],
        description: periferico.description || '',
        highlight_text: periferico.highlight_text || '',
        highlight_color: periferico.highlight_color || 'cyan',
        image: periferico.image || '',
      })) || [];
      
      console.log('Periféricos fetched successfully:', formattedPerifericos.length);
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
      console.log('Fetching Delivered PCs...');
      const { data, error } = await supabase
        .from('delivered_pcs')
        .select('*')
        .order('delivery_date', { ascending: false });

      if (error) {
        console.error('Error fetching Delivered PCs:', error);
        throw error;
      }
      
      const formattedDeliveredPcs = data?.map(pc => ({
        ...pc,
        specs: Array.isArray(pc.specs) ? pc.specs.map(String) : [],
        image: pc.image || '',
      })) || [];
      
      console.log('Delivered PCs fetched successfully:', formattedDeliveredPcs.length);
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
    console.log('Refreshing all data...');
    setLoading(true);
    await Promise.all([fetchPcs(), fetchPerifericos(), fetchDeliveredPcs()]);
    setLoading(false);
    console.log('Data refresh completed');
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addPc = async (newPc: Omit<Pc, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding new PC:', newPc);
      
      const insertData = {
        name: newPc.name,
        price: newPc.price,
        category: newPc.category,
        description: newPc.description || '',
        specs: newPc.specs || [],
        spec_icons: newPc.spec_icons || [],
        secondary_images: newPc.secondary_images || [],
        highlight: newPc.highlight || false,
        highlight_text: newPc.highlight_text || null,
        highlight_color: newPc.highlight_color || null,
        image: newPc.image || null,
      };

      const { data, error } = await supabase
        .from('pcs')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding PC:', error);
        throw error;
      }
      
      console.log('PC added successfully:', data);
      await fetchPcs();
      
      toast({
        title: "Sucesso!",
        description: "PC adicionado com sucesso!",
      });
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
      console.log('Adding new Periférico:', newPeriferico);
      
      const insertData = {
        name: newPeriferico.name,
        price: newPeriferico.price,
        category: newPeriferico.category,
        description: newPeriferico.description || '',
        specs: newPeriferico.specs || [],
        secondary_images: newPeriferico.secondary_images || [],
        highlight: newPeriferico.highlight || false,
        highlight_text: newPeriferico.highlight_text || null,
        highlight_color: newPeriferico.highlight_color || null,
        image: newPeriferico.image || null,
      };

      const { data, error } = await supabase
        .from('perifericos')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding Periférico:', error);
        throw error;
      }
      
      console.log('Periférico added successfully:', data);
      await fetchPerifericos();
      
      toast({
        title: "Sucesso!",
        description: "Periférico adicionado com sucesso!",
      });
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
      console.log('Adding new Delivered PC:', newDeliveredPc);
      
      const insertData = {
        name: newDeliveredPc.name,
        customer: newDeliveredPc.customer,
        delivery_date: newDeliveredPc.delivery_date,
        location: newDeliveredPc.location,
        specs: newDeliveredPc.specs || [],
        image: newDeliveredPc.image || null,
      };

      const { data, error } = await supabase
        .from('delivered_pcs')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding Delivered PC:', error);
        throw error;
      }
      
      console.log('Delivered PC added successfully:', data);
      await fetchDeliveredPcs();
      
      toast({
        title: "Sucesso!",
        description: "Exemplo adicionado com sucesso!",
      });
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
      console.log('Updating PC', id, ':', updatedPc);
      
      const updateData: any = {};

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
      if (updatedPc.highlight_color !== undefined) updateData.highlight_color = updatedPc.highlight_color;
      if (updatedPc.image !== undefined) updateData.image = updatedPc.image;

      const { data, error } = await supabase
        .from('pcs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating PC:', error);
        throw error;
      }
      
      console.log('PC updated successfully:', data);
      await fetchPcs();
      
      toast({
        title: "Sucesso!",
        description: "PC atualizado com sucesso!",
      });
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
      console.log('Updating Periférico', id, ':', updatedPeriferico);
      
      const updateData: any = {};

      // Only include fields that exist in the database
      if (updatedPeriferico.name !== undefined) updateData.name = updatedPeriferico.name;
      if (updatedPeriferico.price !== undefined) updateData.price = updatedPeriferico.price;
      if (updatedPeriferico.category !== undefined) updateData.category = updatedPeriferico.category;
      if (updatedPeriferico.description !== undefined) updateData.description = updatedPeriferico.description;
      if (updatedPeriferico.specs !== undefined) updateData.specs = updatedPeriferico.specs;
      if (updatedPeriferico.secondary_images !== undefined) updateData.secondary_images = updatedPeriferico.secondary_images;
      if (updatedPeriferico.highlight !== undefined) updateData.highlight = updatedPeriferico.highlight;
      if (updatedPeriferico.highlight_text !== undefined) updateData.highlight_text = updatedPeriferico.highlight_text;
      if (updatedPeriferico.highlight_color !== undefined) updateData.highlight_color = updatedPeriferico.highlight_color;
      if (updatedPeriferico.image !== undefined) updateData.image = updatedPeriferico.image;

      const { data, error } = await supabase
        .from('perifericos')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating Periférico:', error);
        throw error;
      }
      
      console.log('Periférico updated successfully:', data);
      await fetchPerifericos();
      
      toast({
        title: "Sucesso!",
        description: "Periférico atualizado com sucesso!",
      });
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
      console.log('Updating Delivered PC', id, ':', updatedDeliveredPc);
      
      const updateData: any = {};

      if (updatedDeliveredPc.name !== undefined) updateData.name = updatedDeliveredPc.name;
      if (updatedDeliveredPc.customer !== undefined) updateData.customer = updatedDeliveredPc.customer;
      if (updatedDeliveredPc.delivery_date !== undefined) updateData.delivery_date = updatedDeliveredPc.delivery_date;
      if (updatedDeliveredPc.location !== undefined) updateData.location = updatedDeliveredPc.location;
      if (updatedDeliveredPc.specs !== undefined) updateData.specs = updatedDeliveredPc.specs;
      if (updatedDeliveredPc.image !== undefined) updateData.image = updatedDeliveredPc.image;

      const { data, error } = await supabase
        .from('delivered_pcs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating Delivered PC:', error);
        throw error;
      }
      
      console.log('Delivered PC updated successfully:', data);
      await fetchDeliveredPcs();
      
      toast({
        title: "Sucesso!",
        description: "Exemplo atualizado com sucesso!",
      });
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
      console.log('Deleting PC:', id);
      const { error } = await supabase
        .from('pcs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting PC:', error);
        throw error;
      }
      
      console.log('PC deleted successfully');
      await fetchPcs();
      
      toast({
        title: "Sucesso!",
        description: "PC removido com sucesso!",
      });
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
      console.log('Deleting Periférico:', id);
      const { error } = await supabase
        .from('perifericos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting Periférico:', error);
        throw error;
      }
      
      console.log('Periférico deleted successfully');
      await fetchPerifericos();
      
      toast({
        title: "Sucesso!",
        description: "Periférico removido com sucesso!",
      });
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
      console.log('Deleting Delivered PC:', id);
      const { error } = await supabase
        .from('delivered_pcs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting Delivered PC:', error);
        throw error;
      }
      
      console.log('Delivered PC deleted successfully');
      await fetchDeliveredPcs();
      
      toast({
        title: "Sucesso!",
        description: "Exemplo removido com sucesso!",
      });
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
