// 这是父类
// 直接把父类理解成原型对象.
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	say() {
		console.log('Hello');
	}
	static adress = '中国';
	static show() {
		console.log('show');
	}
}

// 这是子类 美国人
class American extends Person {
	constructor(name, age) {
		super(name, age);
	}
}

const a1 = new American('Jack', 20);
console.log(a1);
a1.say();

// 这是子类 中国人
class Chinese extends Person {
  // 在子类中, this只能放在super之后使用
	constructor(name, age, id) {
    super(name, age);
		this.id = id;
	}
}
const c1 = new Chinese('zs', 18, '420105199901010411');
console.log(c1);
