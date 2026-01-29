import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Fetch data from multiple endpoints
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:3000/products?limit=1'),
          axios.get('http://localhost:3000/users?limit=1'),
          axios.get('http://localhost:3000/orders?limit=10')
        ]);

        // Calculate stats
        const totalProducts = productsRes.data.pagination?.total || 0;
        const totalUsers = usersRes.data.pagination?.total || 0;
        const totalOrders = ordersRes.data.length || 0;
        const totalRevenue = ordersRes.data.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        setStats({
          totalProducts,
          totalUsers,
          totalOrders,
          totalRevenue,
          recentOrders: ordersRes.data.slice(0, 5)
        });
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-[calc(100vh-7rem)]'>
        <div className='text-2xl font-bold dark:text-gray-100'>Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className='w-full p-6 h-[calc(100vh-7rem)] overflow-y-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold dark:text-gray-100'>Dashboard</h1>
        <p className='dark:text-gray-200'>Welcome to EZShop Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* Total Products */}
        <div className='rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='dark:text-gray-100 text-sm font-semibold'>Total Products</p>
              <p className='text-3xl font-bold dark:text-gray-100 mt-2'>{stats.totalProducts}</p>
            </div>
            <div className='bg-blue-100 rounded-full p-3'>
              <svg className='w-6 h-6 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className='rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='dark:text-gray-100 text-sm font-semibold'>Total Users</p>
              <p className='text-3xl font-bold dark:text-gray-100 mt-2'>{stats.totalUsers}</p>
            </div>
            <div className='bg-green-100 rounded-full p-3'>
              <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0zM12 14a3 3 0 11-6 0 3 3 0 016 0zM15 7a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className='rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='dark:text-gray-100 text-sm font-semibold'>Total Orders</p>
              <p className='text-3xl font-bold dark:text-gray-100 mt-2'>{stats.totalOrders}</p>
            </div>
            <div className='bg-purple-100 rounded-full p-3'>
              <svg className='w-6 h-6 text-purple-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='dark:text-gray-100 text-sm font-semibold'>Total Revenue</p>
              <p className='text-3xl font-bold dark:text-gray-100 mt-2'>₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className='bg-yellow-100 rounded-full p-3'>
              <svg className='w-6 h-6 text-yellow-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M8.16 5.314l4.897 4.896a1 1 0 01-1.414 1.414l-4.897-4.896a1 1 0 011.414-1.414zM16.485 9.424l-1.414-1.414-.707.707 1.414 1.414.707-.707zM11 11a1 1 0 11-2 0 1 1 0 012 0z' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className='rounded-lg shadow-md overflow-hidden'>
        <div className='px-6 py-4 border-b'>
          <h2 className='text-xl font-bold dark:text-gray-100'>Recent Orders</h2>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-500 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-semibold dark:text-gray-100'>Order ID</th>
                <th className='px-6 py-3 text-left text-sm font-semibold dark:text-gray-100'>Date</th>
                <th className='px-6 py-3 text-left text-sm font-semibold dark:text-gray-100'>Amount</th>
                <th className='px-6 py-3 text-left text-sm font-semibold dark:text-gray-100'>Status</th>
                <th className='px-6 py-3 text-left text-sm font-semibold dark:text-gray-100'>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className='border-b hover:bg-gray-600'>
                    <td className='px-6 py-4 text-sm dark:text-gray-100 font-mono'>{order._id.slice(-8)}</td>
                    <td className='px-6 py-4 text-sm dark:text-gray-100'>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-sm font-semibold dark:text-gray-100'>
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-400 ${
                        order.status === 'delivered' ? 'bg-green-100 !text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 !text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 !text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 !text-red-800' :
                        'bg-gray-100 dark:text-gray-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='px-6 py-4 text-center dark:text-gray-100'>
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard