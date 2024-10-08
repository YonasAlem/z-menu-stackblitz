"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFetchRestaurantInfo, mockFetchMenuItems } from '@/lib/api';
import { RestaurantInfo, MenuItem } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const info = await mockFetchRestaurantInfo();
      const items = await mockFetchMenuItems();
      setRestaurantInfo(info);
      setMenuItems(items);
    };
    fetchData();
  }, []);

  if (!restaurantInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {restaurantInfo.name}</p>
            <p>Address: {restaurantInfo.address}</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/edit-restaurant">Edit Info</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Items: {menuItems.length}</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/menu-items">Manage Menu</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Public Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your public menu URL:</p>
            <p className="text-sm text-muted-foreground break-all">
              {`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${restaurantInfo.id}`}
            </p>
            <Button asChild className="mt-4">
              <Link href={`/menu/${restaurantInfo.id}`} target="_blank">View Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}