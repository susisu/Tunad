Tunad
===============

#Hello World

	print().$("Hello, World!").play({});

or

	bind(
		_return().$("Hello, World!"),
		print()
	).play({});

or

	bind(
		_return().$("Hello, World!"),
		lambda(function(arg){
			return print().$(arg);
		})
	).play({});

or

	mbind(
		_set("text").$("Hello, World!"),
		_get("text"),
		print()
	).play({});

or
	
	mbind(
		_let("text")(_return().$("Hello, World!")),
		_get("text"),
		print()
	).play({});

or

	_do(function(_){
		console.log("Hello, World!");
	}).play({});

or

	mbind(
		_let("text")(_return().$("Hello, World!")),
		_do(function(_)
		{
			console.log(this.text);
		})
	).play({});

or

	mbind(
		_return().$("Hello"),
		_do(function(arg){
			return arg + ", World!";
		}),
		print()
	).play({});

or ...