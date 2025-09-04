import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, CheckCircle } from "lucide-react";
import { ComputerForm } from "./ComputerForm";
import { useAdmin } from "@/contexts/AdminContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const ComputerManagement = () => {
  const { computers, loading, deleteComputer, markAsSold } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingComputer, setEditingComputer] = useState<any>(null);

  const handleEdit = (computer: any) => {
    setEditingComputer(computer);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o computador "${name}"?`)) {
      await deleteComputer(id);
    }
  };

  const handleMarkAsSold = async (id: string, name: string) => {
    if (window.confirm(`Marcar "${name}" como vendido?`)) {
      await markAsSold(id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingComputer(null);
  };

  if (loading) {
    return <div className="text-center p-8">Carregando computadores...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Lista de Computadores</h2>
        <Button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Computador
        </Button>
      </div>

      {computers.length === 0 ? (
        <div className="text-center p-8 text-gray-400">
          Nenhum computador cadastrado ainda.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">Preço</TableHead>
                <TableHead className="text-gray-300">Especificações</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {computers.map((computer) => (
                <TableRow key={computer.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-3">
                      {computer.main_image && (
                        <img
                          src={computer.main_image}
                          alt={computer.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      {computer.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{formatPrice(computer.price)}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="space-y-1 text-sm">
                      {computer.gpu && <div>GPU: {computer.gpu}</div>}
                      {computer.cpu && <div>CPU: {computer.cpu}</div>}
                      {computer.ram && <div>RAM: {computer.ram}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={computer.is_sold ? "destructive" : "default"}>
                      {computer.is_sold ? "Vendido" : "Disponível"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(computer)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {!computer.is_sold && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsSold(computer.id, computer.name)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(computer.id, computer.name)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingComputer ? "Editar Computador" : "Adicionar Novo Computador"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha os dados do computador. Todos os campos de especificações são opcionais.
            </DialogDescription>
          </DialogHeader>
          <ComputerForm
            editingComputer={editingComputer}
            onClose={closeForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};