function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.info = 'aaa';
const p1 = new Person('zs', 18);
console.log(p1);

// 实例方法
Person.prototype.say = function() {
	console.log(`这是 Person 的实例方法`);
};

// 静态方法
Person.show = function (){
  console.log(`这是 Person 的静态方法`);
}

// -------------------------------
console.log('-----------------------');

// 创建了一个动物类
class Animal {
	// 这是类中的构造器
	// 每一个类中,都有一个构造器,若未指定构造器,那么可以认为每个类内部有个隐形的、看不见的空构造器,类似于: constructor() {}
	// 构造器的作用就是, 每当new 这个类的时候, 必然会优先执行构造器中的代码
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	static info = 'eee';

	// 动物的实例方法
	jiao() {
		console.log('动物的实例方法');
  }

  static show (){
    console.log(`动物的静态方法`);
  }
}

// 实现面向对象:  用的功能是一样的, 实现的过程是不同的
const a1 = new Animal('大黄', 3);
console.log(a1);
