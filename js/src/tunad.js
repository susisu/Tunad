/*
	Tunad.js
	Copyright(C) 2013 Susisu
*/

var Tunad = new Object();

Tunad.Action = function(func)
{
	this.func = func;
	this.onComplete = undefined;
}
Tunad.Action.prototype.play = function(env, arg)
{
	this.func.call(env, arg);
};
Tunad.Action.prototype.complete = function(value)
{
	if(this.onComplete)
	{
		this.onComplete(value);
		this.onComplete = undefined;
	}
};
Tunad.Action.prototype.apply = function(arg)
{
	var action = this;
	var wrapper = new Action(function(_)
	{
		action.onComplete = function(value)
		{
			wrapper.complete(value);
		};
		action.play(this, arg);
	});
	return wrapper;
};
Tunad.Action.prototype.$ = function(arg)
{
	return this.apply(arg);
};

Tunad._void = function()
{
	var action = new Action(function(_)
	{
		action.complete();
	});
	return action;
};

Tunad._return = function()
{
	var action = new Action(function(arg)
	{
		action.complete(arg);
	});
	return action;
};

Tunad.bind = function(a, b)
{
	var action = new Action(function(arg)
	{
		var env = this;
		a.onComplete = function(avalue)
		{
			b.onComplete = function(bvalue)
			{
				action.complete(bvalue);
			};
			b.play(env, avalue);
		};
		a.play(env, arg);
	});
	return action;
};

Tunad.mbind = function()
{
	if(arguments.length > 0)
	{
		var t = arguments[0];
		for(var i = 1; i < arguments.length; i++)
		{
			t = bind(t, arguments[i])
		}
		return t;
	}
	else
	{
		return _void();
	}
};

Tunad.all = function()
{
	if(arguments.length > 0)
	{
		var actions = arguments;
		var action = new Action(function(arg)
		{
			var n = 0;
			function handler(value)
			{
				n++;
				if(n == actions.length)
				{
					action.complete();
				}
			}
			for(var i = 0; i < actions.length; i++)
			{
				actions[i].onComplete = handler;
				actions[i].play(this, arg);
			}
		});
		return action;
	}
	else
	{
		return _void();
	}
};

Tunad.some = function()
{
	if(arguments.length > 0)
	{
		var actions = arguments;
		var action = new Action(function(arg)
		{
			function handler(value)
			{
				for(var i = 0; i < actions.length; i++)
				{
					if(actions[i] !== this)
					{
						actions[i].onComplete = undefined;
					}
				}
				action.complete(value);
			}
			for(var i = 0; i < actions.length; i++)
			{
				actions[i].onComplete = handler;
				actions[i].play(this, arg);
			}
		});
		return action;
	}
	else
	{
		return _void();
	}
};

Tunad._set = function(name)
{
	var action = new Action(function(arg)
	{
		this[name] = arg;
		
		action.complete();
	});
	return action;
};

Tunad._get = function(name)
{
	var action = new Action(function(_)
	{
		action.complete(this[name]);
	});
	return action;
};

Tunad._let = function(name)
{
	return function(value)
	{
		return bind(value, _set(name));
	};
};

Tunad.lambda = function(func)
{
	var action = new Action(function(arg)
	{
		var sub = func(arg);
		sub.onComplete = function(value)
		{
			action.complete(value);
		};
		sub.play(this);
	});
	return action;
};

Tunad._do = function(func)
{
	var action = new Action(function(arg)
	{
		action.complete(func.call(this, arg));
	});
	return action;
};

Tunad._if = function(condition, a, b)
{
	var action = new Action(function(_)
	{
		var env = this;
		condition.onComplete = function(cond)
		{
			if(cond)
			{
				a.onComplete = function(value)
				{
					action.complete(value);
				}
				a.play(env);
			}
			else
			{
				b.onComplete = function(value)
				{
					action.complete(value);
				}
				b.play(env);
			}
		};
		condition.play(env);
	});
	return action;
};

Tunad._while = function(condition, statement)
{
	var action = new Action(function(_)
	{
		var env = this;
		var lastValue;
		function evalCondition()
		{
			condition.onComplete = function(cond)
			{
				if(cond)
				{
					evalStatement();
				}
				else
				{
					action.complete(lastValue);
				}
			};
			condition.play(env);
		}
		function evalStatement()
		{
			statement.onComplete = function(value)
			{
				lastValue = value;
				evalCondition();
			}
			statement.play(env);
		}
		evalCondition();
	});
	return action;
};

Tunad.print = function()
{
	var action = new Action(function(arg)
	{
		console.log(String(arg));
		
		action.complete();
	});
	return action;
};

function useTunad()
{
	this.Action = Tunad.Action;
	this._void = Tunad._void;
	this._return = Tunad._return;
	this.bind = Tunad.bind;
	this.mbind = Tunad.mbind;
	this.all = Tunad.all;
	this.some = Tunad.some;
	this._set = Tunad._set;
	this._get = Tunad._get;
	this._let = Tunad._let;
	this.lambda = Tunad.lambda;
	this._do = Tunad._do;
	this._if = Tunad._if;
	this._while = Tunad._while;
	this.print = Tunad.print;
}
