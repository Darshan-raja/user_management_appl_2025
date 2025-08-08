import { useState } from 'react';
import { User } from '@/components/UserCard';

const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, userData: Omit<User, 'id'>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...userData, id } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };
};