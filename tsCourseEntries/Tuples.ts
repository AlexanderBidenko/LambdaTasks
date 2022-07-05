const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Alex',
  age: 22,
  hobbies: ['Sport', 'Games'],
  role: [2, 'author']
};
person.role.push('admin');
person.role.push(11);
// person.role[2] = 10;
person.role[0] = 10;

console.log(person)
// console.log('Person`s age is:', person.age)
