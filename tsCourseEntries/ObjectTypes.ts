// let person: {
//   name: string;
//   age: number
// } 
const person = {
  name: 'Alex',
  age: 22,
  hobbies: ['Sports', 'Cooking']
};


let favoriteActivities: string[];
favoriteActivities = ['Sports']

console.log(person.name)
console.log('Person`s age is:', person.age)

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
}