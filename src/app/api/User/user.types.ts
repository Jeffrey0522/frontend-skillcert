// Define the User entity type
export interface User {
    Id: number;
    Email: string;
    Name: string;
    Wallet?: string;
  }
  
  // Define the DTO (Data Transfer Object) for creating a user
  export interface CreateUserDto {
    Email: string;
    Name: string;
    Wallet?: string;
  }
  
  // Define the DTO for updating a user
  export interface UpdateUserDto {
    Email?: string;
    Name?: string;
    Wallet?: string;
  }