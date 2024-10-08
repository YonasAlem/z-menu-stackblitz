"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockFetchMenuItems, mockAddMenuItem, mockUpdateMenuItem, mockDeleteMenuItem } from '@/lib/api';
import { MenuItem } from '@/types';

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await mockFetchMenuItems();
      setMenuItems(items);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      const addedItem = await mockAddMenuItem(newItem as MenuItem);
      setMenuItems([...menuItems, addedItem]);
      setNewItem({});
    }
  };

  const handleUpdateItem = async () => {
    if (editingItem) {
      const updatedItem = await mockUpdateMenuItem(editingItem);
      setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = async (id: string) => {
    await mockDeleteMenuItem(id);
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Menu Items</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="newItemName">Name</Label>
            <Input
              id="newItemName"
              value={newItem.name || ''}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="newItemPrice">Price</Label>
            <Input
              id="newItemPrice"
              type="number"
              value={newItem.price || ''}
              onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="newItemDescription">Description</Label>
            <Textarea
              id="newItemDescription"
              value={newItem.description || ''}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            />
          </div>
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Menu Items</h2>
        {menuItems.map(item => (
          <div key={item.id} className="mb-4 p-4 border rounded">
            {editingItem && editingItem.id === item.id ? (
              <div className="space-y-4">
                <Input
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                />
                <Textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                />
                <Button onClick={handleUpdateItem}>Save</Button>
                <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>{item.description}</p>
                <div className="mt-2">
                  <Button onClick={() => setEditingItem(item)}>Edit</Button>
                  <Button variant="destructive" className="ml-2" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}