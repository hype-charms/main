export interface InventoryTable {
    name: string;
    product_id: string;
    current_stock: number | null;
    ordered_stock: number | null;
}