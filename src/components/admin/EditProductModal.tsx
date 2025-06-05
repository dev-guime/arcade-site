
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminPcForm } from "./AdminPcForm";
import { AdminPerifericosForm } from "./AdminPerifericosForm";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  type: "pcs" | "perifericos";
  onUpdate: (data: any) => void;
}

export const EditProductModal = ({ isOpen, onClose, product, type, onUpdate }: EditProductModalProps) => {
  const handleSubmit = (data: any) => {
    console.log(`Atualizando ${type} ${product?.id}:`, data);
    onUpdate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-4xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-lg lg:text-xl">
            Editar {type === "pcs" ? "PC" : "Periférico"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm lg:text-base">
            Edite as informações do produto selecionado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {type === "pcs" ? (
            <AdminPcForm 
              editingPc={product} 
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          ) : (
            <AdminPerifericosForm 
              editingProduct={product} 
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
