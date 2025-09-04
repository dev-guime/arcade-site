import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { SoldComputerForm } from "./SoldComputerForm";
import { useAdmin } from "@/contexts/AdminContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const SoldComputersManagement = () => {
  const { soldComputers, loading, deleteSoldComputer } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingSoldComputer, setEditingSoldComputer] = useState<any>(null);

  const handleEdit = (soldComputer: any) => {
    setEditingSoldComputer(soldComputer);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover "${name}" do portfólio?`)) {
      await deleteSoldComputer(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSoldComputer(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div className="text-center p-8">Carregando portfólio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Portfólio de Computadores Vendidos</h2>
        <Button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar ao Portfólio
        </Button>
      </div>

      {soldComputers.length === 0 ? (
        <div className="text-center p-8 text-gray-400">
          Nenhum computador vendido no portfólio ainda.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">Cliente</TableHead>
                <TableHead className="text-gray-300">Data da Venda</TableHead>
                <TableHead className="text-gray-300">Localização</TableHead>
                <TableHead className="text-gray-300">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {soldComputers.map((soldComputer) => (
                <TableRow key={soldComputer.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-3">
                      {soldComputer.image && (
                        <img
                          src={soldComputer.image}
                          alt={soldComputer.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      {soldComputer.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{soldComputer.customer}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(soldComputer.sold_date)}</TableCell>
                  <TableCell className="text-gray-300">{soldComputer.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(soldComputer)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(soldComputer.id, soldComputer.name)}
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingSoldComputer ? "Editar Computador Vendido" : "Adicionar Computador Vendido"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Adicione um computador vendido ao portfólio para exibir na página principal.
            </DialogDescription>
          </DialogHeader>
          <SoldComputerForm
            editingSoldComputer={editingSoldComputer}
            onClose={closeForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};