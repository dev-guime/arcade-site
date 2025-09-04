import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ExpenseForm } from "./ExpenseForm";
import { useAdmin } from "@/contexts/AdminContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const ExpensesManagement = () => {
  const { monthlyExpenses, loading, deleteMonthlyExpense } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id: string, month: number, year: number) => {
    if (window.confirm(`Tem certeza que deseja deletar os gastos de ${monthNames[month - 1]} ${year}?`)) {
      await deleteMonthlyExpense(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalExpenses = () => {
    return monthlyExpenses.reduce((sum, expense) => sum + expense.total, 0);
  };

  if (loading) {
    return <div className="text-center p-8">Carregando gastos mensais...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Gastos Mensais</h2>
        <Button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Gastos do Mês
        </Button>
      </div>

      {/* Total Geral */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Total Geral de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">
            {formatCurrency(getTotalExpenses())}
          </div>
        </CardContent>
      </Card>

      {monthlyExpenses.length === 0 ? (
        <div className="text-center p-8 text-gray-400">
          Nenhum gasto mensal registrado ainda.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Mês/Ano</TableHead>
                <TableHead className="text-gray-300">Tráfego Pago</TableHead>
                <TableHead className="text-gray-300">Seguro do Banco</TableHead>
                <TableHead className="text-gray-300">Outros Gastos</TableHead>
                <TableHead className="text-gray-300">Total</TableHead>
                <TableHead className="text-gray-300">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyExpenses.map((expense) => (
                <TableRow key={expense.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {monthNames[expense.month - 1]} {expense.year}
                  </TableCell>
                  <TableCell className="text-green-400">{formatCurrency(expense.paid_traffic)}</TableCell>
                  <TableCell className="text-blue-400">{formatCurrency(expense.bank_insurance)}</TableCell>
                  <TableCell className="text-yellow-400">
                    {expense.other_expenses.length > 0 ? (
                      <div className="space-y-1">
                        {expense.other_expenses.map((other, index) => (
                          <div key={index} className="text-sm">
                            {other.name}: {formatCurrency(other.amount)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">Nenhum</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    {formatCurrency(expense.total)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(expense.id, expense.month, expense.year)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={closeForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingExpense ? "Editar Gastos Mensais" : "Adicionar Gastos Mensais"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Registre os gastos mensais da empresa. O total será calculado automaticamente.
            </DialogDescription>
          </DialogHeader>
          <ExpenseForm
            editingExpense={editingExpense}
            onClose={closeForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};