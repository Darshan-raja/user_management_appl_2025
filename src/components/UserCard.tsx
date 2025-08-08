import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Pencil, Trash2 } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive';
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'moderator': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            <User className="h-6 w-6" />
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 ml-4">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={getRoleColor(user.role)}>{user.role}</Badge>
          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};