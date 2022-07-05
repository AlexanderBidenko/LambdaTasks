
enum Role { ADMIN = 1, READ_ONLY = 2, AUTHOR = 3};

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
} = {
  name: 'Alex',
  age: 22,
  hobbies: ['Sport', 'Games'],
  role: Role.ADMIN
};

if (person.role === Role.ADMIN) {
  console.log('Admin')
}

