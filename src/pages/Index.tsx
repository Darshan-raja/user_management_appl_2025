import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCard, User } from "@/components/UserCard";
import { UserForm } from "@/components/UserForm";
import { useUsers } from "@/hooks/useUsers";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    addUser(userData);
    setShowForm(false);
    toast({
      title: "Success",
      description: "User added successfully!",
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
      setEditingUser(null);
      setShowForm(false);
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
    }
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
    toast({
      title: "Success",
      description: "User deleted successfully!",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage your application users</p>
            </div>
          </div>
          
          {!showForm && (
            <Button onClick={() => setShowForm(true)} size="lg">
              <Plus className="h-5 w-5" />
              Add User
            </Button>
          )}
        </div>

        {showForm ? (
          <div className="mb-8">
            <UserForm 
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}

        {!showForm && users.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first user</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-5 w-5" />
              Add User
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
