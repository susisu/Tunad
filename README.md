Tunad
===============

#Hello World

	print().apply("Hello, World!").play({});

or

	bind(
		_return().apply("Hello, World!"),
		print()
	).play({});

or

	bind(
		_return().apply("Hello, World!"),
		lambda(function(arg){
			return print().apply(arg);
		})
	).play({});

or

	mbind(
		assign("text").apply("Hello, World!"),
		_get("text"),
		print()
	).play({});

or
	
	mbind(
		_set("text")(_return().apply("Hello, World!")),
		_get("text"),
		print()
	).play({});

or

	_do(function(_){
		console.log("Hello, World!");
	}).play({});

or

	mbind(
		_set("text")(_return().apply("Hello, World!")),
		_do(function(_)
		{
			console.log(this.text);
		})
	).play({});

or

	mbind(
		_return().apply("Hello"),
		_do(function(arg){
			return arg + ", World!";
		}),
		print()
	).play({});

or ...