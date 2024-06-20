export class UserAll {
    id?: any;
    username?: String;
    password?: String;
    firstname?: String;
    lastname?: String;
    email?: String;
    tal?: String;
    createdAt?: Date;
    published?: boolean;
}

export interface UserAlls {
    id: any;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    tal: string;
    createdAt: Date;
    published: boolean;
}
export interface User {
    username: string;
    firstName: string;
    lastName: string;
    password?: string;  // Optional because you might not want to send the password to the frontend
    email?: string;
    department: string;
    role: 'IT' | 'HR' | 'Board' | 'Head' | 'Employee';
    status: 'active' | 'pending' | 'disabled' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
  }