import primary from './primary';

class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    if (typeof this.name === 'string') return `Hello, I am ${this.name}!`;
    return 'Hello!';
  }
}

const bas = new Person('Bas de Greeuw');
console.log(bas.hello());
console.log(primary());
