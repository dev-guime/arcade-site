import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { X, Plus } from "lucide-react";

const expenseSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2020).max(2030),
  paid_traffic: z.number().min(0),
  bank_insurance: z.number().min(0),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  editingExpense?: any;
  onClose: () => void;
}

export const ExpenseForm = ({ editingExpense, onClose }: ExpenseFormProps) => {
  const { addMonthlyExpense, updateMonthlyExpense } = useAdmin();
  const [otherExpenses, setOtherExpenses] = useState<{ name: string; amount: number }[]>(
    editingExpense?.other_expenses || []
  );
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      month: editingExpense?.month || currentMonth,
      year: editingExpense?.year || currentYear,
      paid_traffic: editingExpense?.paid_traffic || 0,
      bank_insurance: editingExpense?.bank_insurance || 0,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setLoading(true);
      
      const expenseData = {
        month: data.month,
        year: data.year,
        paid_traffic: data.paid_traffic,
        bank_insurance: data.bank_insurance,
        other_expenses: otherExpenses,
        total: calculateTotal(),
      };

      if (editingExpense) {
        await updateMonthlyExpense(editingExpense.id, expenseData);
      } else {
        await addMonthlyExpense(expenseData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOtherExpense = () => {
    if (newExpenseName.trim() && newExpenseAmount) {
      setOtherExpenses([
        ...otherExpenses,
        { name: newExpenseName.trim(), amount: parseFloat(newExpenseAmount) }
      ]);
      setNewExpenseName("");
      setNewExpenseAmount("");
    }
  };

  const removeOtherExpense = (index: number) => {
    setOtherExpenses(otherExpenses.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const paidTraffic = watchedValues.paid_traffic || 0;
    const bankInsurance = watchedValues.bank_insurance || 0;
    const othersTotal = otherExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return paidTraffic + bankInsurance + othersTotal;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mês */}
        <div className="space-y-2">
          <Label className="text-white">Mês *</Label>
          <Select 
            defaultValue={String(editingExpense?.month || currentMonth)}
            onValueChange={(value) => setValue("month", parseInt(value))}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)} className="text-white hover:bg-gray-600">
                  {new Date(2024, i).toLocaleDateString('pt-BR', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.month && (
            <p className="text-red-400 text-sm">{errors.month.message}</p>
          )}
        </div>

        {/* Ano */}
        <div className="space-y-2">
          <Label className="text-white">Ano *</Label>
          <Select 
            defaultValue={String(editingExpense?.year || currentYear)}
            onValueChange={(value) => setValue("year", parseInt(value))}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map((year) => (
                <SelectItem key={year} value={String(year)} className="text-white hover:bg-gray-600">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && (
            <p className="text-red-400 text-sm">{errors.year.message}</p>
          )}
        </div>

        {/* Tráfego Pago */}
        <div className="space-y-2">
          <Label htmlFor="paid_traffic" className="text-white">Tráfego Pago (R$)</Label>
          <Input
            id="paid_traffic"
            type="number"
            step="0.01"
            {...register("paid_traffic", { valueAsNumber: true })}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="0.00"
          />
          {errors.paid_traffic && (
            <p className="text-red-400 text-sm">{errors.paid_traffic.message}</p>
          )}
        </div>

        {/* Seguro do Banco */}
        <div className="space-y-2">
          <Label htmlFor="bank_insurance" className="text-white">Seguro do Banco (R$)</Label>
          <Input
            id="bank_insurance"
            type="number"
            step="0.01"
            {...register("bank_insurance", { valueAsNumber: true })}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="0.00"
          />
          {errors.bank_insurance && (
            <p className="text-red-400 text-sm">{errors.bank_insurance.message}</p>
          )}
        </div>
      </div>

      {/* Outros Gastos */}
      <div className="space-y-2">
        <Label className="text-white">Outros Gastos</Label>
        <div className="space-y-3">
          {otherExpenses.map((expense, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="text-gray-300 flex-1">
                {expense.name}: {formatCurrency(expense.amount)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOtherExpense(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              placeholder="Nome do gasto"
              className="bg-gray-700 border-gray-600 text-white flex-1"
            />
            <Input
              type="number"
              step="0.01"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              placeholder="Valor"
              className="bg-gray-700 border-gray-600 text-white w-32"
            />
            <Button
              type="button"
              onClick={addOtherExpense}
              className="bg-gray-600 hover:bg-gray-500"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Total Calculado */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-lg">Total do Mês:</span>
          <span className="text-white text-xl font-bold">
            {formatCurrency(calculateTotal())}
          </span>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 flex-1"
        >
          {loading ? "Salvando..." : editingExpense ? "Atualizar" : "Adicionar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};