
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, AlertTriangle } from "lucide-react";
import { ProductDialog } from "./ProductDialog";

// Mock data for inventory
const initialProducts = [
    {
        id: 1,
        name: "Paracétamol 1000mg",
        category: "Médicaments",
        quantity: 500,
        minQuantity: 100,
        price: 3.50,
        status: "In Stock"
    },
    {
        id: 2,
        name: "Seringues 5ml",
        category: "Matériel Médical",
        quantity: 45,
        minQuantity: 50,
        price: 0.20,
        status: "Low Stock"
    },
    {
        id: 3,
        name: "Compresses Stériles",
        category: "Consommables",
        quantity: 0,
        minQuantity: 200,
        price: 5.00,
        status: "Out of Stock"
    },
    {
        id: 4,
        name: "Amoxicilline 500mg",
        category: "Médicaments",
        quantity: 120,
        minQuantity: 30,
        price: 8.90,
        status: "In Stock"
    },
    {
        id: 5,
        name: "Gants Latex (L)",
        category: "Consommables",
        quantity: 1200,
        minQuantity: 500,
        price: 12.00,
        status: "In Stock"
    }
];

export default function InventoryPage() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Stock": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Low Stock": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "Out of Stock": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const handleAddProduct = (newProduct: any) => {
        const product = {
            ...newProduct,
            id: products.length + 1,
            status: Number(newProduct.quantity) === 0 ? "Out of Stock" : Number(newProduct.quantity) < Number(newProduct.minQuantity) ? "Low Stock" : "In Stock"
        };
        setProducts([...products, product]);
        setIsDialogOpen(false);
    };

    const handleEditProduct = (updatedProduct: any) => {
        const updatedProducts = products.map(p =>
            p.id === updatedProduct.id ? {
                ...updatedProduct,
                status: Number(updatedProduct.quantity) === 0 ? "Out of Stock" : Number(updatedProduct.quantity) < Number(updatedProduct.minQuantity) ? "Low Stock" : "In Stock"
            } : p
        );
        setProducts(updatedProducts);
        setIsDialogOpen(false);
        setEditingProduct(null);
    };

    const openEditDialog = (product: any) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#1A1F2C] dark:text-white">Gestion de Stock</h2>
                    <p className="text-muted-foreground mt-2">Suivez vos médicaments et équipements médicaux.</p>
                </div>
                <Button onClick={() => { setEditingProduct(null); setIsDialogOpen(true); }} className="bg-medical-500 hover:bg-medical-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
                </Button>
            </div>

            <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Rechercher par nom ou catégorie..."
                        className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="border-gray-200">
                    <Filter className="mr-2 h-4 w-4" /> Filtrer
                </Button>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-gray-100">
                            <TableHead className="w-[300px]">Nom du Produit</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Quantité</TableHead>
                            <TableHead>Prix Unitaire</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} className="cursor-pointer hover:bg-gray-50/50" onClick={() => openEditDialog(product)}>
                                <TableCell className="font-medium text-[#1A1F2C]">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal text-gray-500 border-gray-200 bg-white">
                                        {product.category}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {product.quantity}
                                        {product.quantity < product.minQuantity && (
                                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{product.price.toFixed(2)} €</TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(product.status)} border-0`}>
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                                        Modifier
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ProductDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={editingProduct ? handleEditProduct : handleAddProduct}
                initialData={editingProduct}
            />
        </div>
    );
}
