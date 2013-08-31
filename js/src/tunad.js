/*
	Tunad.js
	Copyright(C) 2013 Susisu
*/

function useTunad()
{
	function Action(func)
	{
		this.func = func;
		this.onComplete = undefined;
	}
	Action.prototype.play = function(env, arg)
	{
		this.func.call(env, arg);
	}
	Action.prototype.complete = function(value)
	{
		if(this.onComplete)
		{
			this.onComplete(value);
			this.onComplete = null;
		}
	}
	Action.prototype.apply = function(arg)
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
	}
	
	function _void()
	{
		var action = new Action(function(_)
		{
			action.complete();
		});
		return action;
	}
	
	function _return()
	{
		var action = new Action(function(arg)
		{
			action.complete(arg);
		});
		return action;
	}
	
	function bind(a, b)
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
	}
	
	function mbind()
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
	}
	
	function async()
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
	}
	
	function assign(name)
	{
		var action = new Action(function(arg)
		{
			this[name] = arg;
			
			action.complete();
		});
		return action;
	}
	
	function _set(name)
	{
		return function(value)
		{
			return bind(value, assign(name));
		};
	}
	
	function _get(name)
	{
		var action = new Action(function(_)
		{
			action.complete(this[name]);
		});
		return action;
	}
	
	function lambda(func)
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
	}
	
	function _do(func)
	{
		var action = new Action(function(arg)
		{
			action.complete(func.call(this, arg));
		});
		return action;
	}
	
	function print()
	{
		var action = new Action(function(arg)
		{
			console.log(String(arg));
			
			action.complete();
		});
		return action;
	}
	
	this.Action = Action;
	this._void = _void;
	this._return = _return;
	this.bind = bind;
	this.mbind = mbind;
	this.async = async;
	this.assign = assign;
	this._set = _set;
	this._get = _get;
	this.lambda = lambda;
	this._do = _do;
	this.print = print;
}