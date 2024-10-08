import { notFound } from 'next/navigation';
import { mockFetchRestaurantInfo, mockFetchMenuItems } from '@/lib/api';
import { RestaurantInfo, MenuItem } from '@/types';

export default async function PublicMenuPage({ params }: { params: { restaurantId: string } }) {
  const restaurantInfo: RestaurantInfo | null = await mockFetchRestaurantInfo(params.restaurantId);
  const menuItems: MenuItem[] = await mockFetchMenuItems(params.restaurantId);

  if (!restaurantInfo) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{restaurantInfo.name} Menu</h1>
      <p className="mb-8">{restaurantInfo.description}</p>
      
      <div className="grid gap-8 md:grid-cols-2">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="font-bold">
              ${item.price.toFixed(2)}
              <span className="text-sm font-normal ml-2">
                (${(item.price * 1.1).toFixed(2)} with tax)
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}