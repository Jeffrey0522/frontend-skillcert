// Define the User entity type
export interface User {
    id: number;
    email: string;
    name: string;
    wallet?: string;
  }
  
  // Define the DTO (Data Transfer Object) for creating a user
  export interface CreateUserDto {
    email: string;
    name: string;
    wallet?: string;
  }
  
  // Define the DTO for updating a user
  export interface UpdateUserDto {
    email?: string;
    name?: string;
    wallet?: string;
  }