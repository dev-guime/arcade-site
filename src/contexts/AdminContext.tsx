import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Computer {
  id: string;
  name: string;
  price: number;
  main_image?: string;
  secondary_images?: string[];
  gpu?: string;
  cpu?: string;
  ram?: string;
  storage?: string;
  motherboard?: string;
  cooler?: string;
  watercooler?: string;
  is_sold: boolean;
  border_color?: string;
  created_at?: string;
  updated_at?: string;
}

interface SoldComputer {
  id: string;
  name: string;
  customer: string;
  sold_date: string;
  location: string;
  image?: string;
  specs: string[];
  border_color?: string;
  created_at?: string;
  updated_at?: string;
}

interface MonthlyExpense {
  id: string;
  month: number;
  year: number;
  paid_traffic: number;
  bank_insurance: number;
  other_expenses: { name: string; amount: number }[];
  total: number;
  created_at?: string;
  updated_at?: string;
}

interface AdminContextType {
  computers: Computer[];
  soldComputers: SoldComputer[];
  monthlyExpenses: MonthlyExpense[];
  loading: boolean;
  
  // Computer operations
  addComputer: (computer: Omit<Computer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateComputer: (id: string, computer: Partial<Computer>) => Promise<void>;
  deleteComputer: (id: string) => Promise<void>;
  markAsSold: (id: string) => Promise<void>;
  
  // Sold computer operations
  addSoldComputer: (soldComputer: Omit<SoldComputer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSoldComputer: (id: string, soldComputer: Partial<SoldComputer>) => Promise<void>;
  deleteSoldComputer: (id: string) => Promise<void>;
  
  // Monthly expense operations
  addMonthlyExpense: (expense: Omit<MonthlyExpense, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateMonthlyExpense: (id: string, expense: Partial<MonthlyExpense>) => Promise<void>;
  deleteMonthlyExpense: (id: string) => Promise<void>;
  
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [soldComputers, setSoldComputers] = useState<SoldComputer[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchComputers = async () => {
    try {
      const { data, error } = await supabase
        .from('computers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedComputers = data?.map(computer => ({
        ...computer,
        secondary_images: Array.isArray(computer.secondary_images) ? computer.secondary_images.map(String) : [],
        gpu: computer.gpu || "",
        cpu: computer.cpu || "",
        ram: computer.ram || "",
        storage: computer.storage || "",
        motherboard: computer.motherboard || "",
        cooler: computer.cooler || "",
        watercooler: computer.watercooler || "",
        main_image: computer.main_image || "",
        is_sold: computer.is_sold || false,
        border_color: computer.border_color || "#3b82f6",
      })) || [];
      
      setComputers(formattedComputers);
    } catch (error) {
      console.error('Error fetching computers:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar computadores.",
        variant: "destructive",
      });
    }
  };

  const fetchSoldComputers = async () => {
    try {
      const { data, error } = await supabase
        .from('sold_computers')
        .select('*')
        .order('sold_date', { ascending: false });

      if (error) throw error;
      
      const formattedSoldComputers = data?.map(soldComputer => ({
        ...soldComputer,
        specs: Array.isArray(soldComputer.specs) ? soldComputer.specs.map(String) : [],
        image: soldComputer.image || "",
        border_color: soldComputer.border_color || "#3b82f6",
      })) || [];
      
      setSoldComputers(formattedSoldComputers);
    } catch (error) {
      console.error('Error fetching sold computers:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar computadores vendidos.",
        variant: "destructive",
      });
    }
  };

  const fetchMonthlyExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('monthly_expenses')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false });

      if (error) throw error;
      
      const formattedExpenses = data?.map(expense => ({
        ...expense,
        other_expenses: Array.isArray(expense.other_expenses) ? 
          expense.other_expenses.map((exp: any) => ({
            name: String(exp.name || ""),
            amount: Number(exp.amount || 0)
          })) : [],
        paid_traffic: expense.paid_traffic || 0,
        bank_insurance: expense.bank_insurance || 0,
        total: expense.total || 0,
      })) || [];
      
      setMonthlyExpenses(formattedExpenses);
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar gastos mensais.",
        variant: "destructive",
      });
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchComputers(), fetchSoldComputers(), fetchMonthlyExpenses()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Computer operations
  const addComputer = async (newComputer: Omit<Computer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('computers')
        .insert([{
          ...newComputer,
          secondary_images: newComputer.secondary_images || [],
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchComputers();
      toast({
        title: "Sucesso!",
        description: "Computador adicionado com sucesso!",
      });
    } catch (error) {
      console.error('Error adding computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar computador.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateComputer = async (id: string, updatedComputer: Partial<Computer>) => {
    try {
      const { data, error } = await supabase
        .from('computers')
        .update(updatedComputer)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchComputers();
      toast({
        title: "Sucesso!",
        description: "Computador atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar computador.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteComputer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('computers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchComputers();
      toast({
        title: "Sucesso!",
        description: "Computador removido com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar computador.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const markAsSold = async (id: string) => {
    try {
      const { error } = await supabase
        .from('computers')
        .update({ is_sold: true })
        .eq('id', id);

      if (error) throw error;
      
      await fetchComputers();
      toast({
        title: "Sucesso!",
        description: "Computador marcado como vendido!",
      });
    } catch (error) {
      console.error('Error marking computer as sold:', error);
      toast({
        title: "Erro",
        description: "Erro ao marcar computador como vendido.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Sold computer operations
  const addSoldComputer = async (newSoldComputer: Omit<SoldComputer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('sold_computers')
        .insert([{
          ...newSoldComputer,
          specs: newSoldComputer.specs || [],
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchSoldComputers();
      toast({
        title: "Sucesso!",
        description: "Computador vendido adicionado ao portfólio!",
      });
    } catch (error) {
      console.error('Error adding sold computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar computador vendido.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSoldComputer = async (id: string, updatedSoldComputer: Partial<SoldComputer>) => {
    try {
      const { data, error } = await supabase
        .from('sold_computers')
        .update(updatedSoldComputer)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchSoldComputers();
      toast({
        title: "Sucesso!",
        description: "Computador vendido atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating sold computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar computador vendido.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSoldComputer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sold_computers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchSoldComputers();
      toast({
        title: "Sucesso!",
        description: "Computador vendido removido do portfólio!",
      });
    } catch (error) {
      console.error('Error deleting sold computer:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar computador vendido.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Monthly expense operations
  const addMonthlyExpense = async (newExpense: Omit<MonthlyExpense, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const total = newExpense.paid_traffic + newExpense.bank_insurance + 
        (newExpense.other_expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0);

      const { data, error } = await supabase
        .from('monthly_expenses')
        .insert([{
          ...newExpense,
          other_expenses: newExpense.other_expenses || [],
          total,
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchMonthlyExpenses();
      toast({
        title: "Sucesso!",
        description: "Gasto mensal adicionado com sucesso!",
      });
    } catch (error) {
      console.error('Error adding monthly expense:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar gasto mensal.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateMonthlyExpense = async (id: string, updatedExpense: Partial<MonthlyExpense>) => {
    try {
      const total = (updatedExpense.paid_traffic || 0) + (updatedExpense.bank_insurance || 0) + 
        (updatedExpense.other_expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0);

      const { data, error } = await supabase
        .from('monthly_expenses')
        .update({
          ...updatedExpense,
          total,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchMonthlyExpenses();
      toast({
        title: "Sucesso!",
        description: "Gasto mensal atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating monthly expense:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar gasto mensal.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteMonthlyExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('monthly_expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchMonthlyExpenses();
      toast({
        title: "Sucesso!",
        description: "Gasto mensal removido com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting monthly expense:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar gasto mensal.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        computers,
        soldComputers,
        monthlyExpenses,
        loading,
        addComputer,
        updateComputer,
        deleteComputer,
        markAsSold,
        addSoldComputer,
        updateSoldComputer,
        deleteSoldComputer,
        addMonthlyExpense,
        updateMonthlyExpense,
        deleteMonthlyExpense,
        refreshData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};