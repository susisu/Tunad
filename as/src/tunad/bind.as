/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function bind(a:Action, b:Action):Action
	{
		var action:Action = new Action(function(arg:*):void
		{
			var env:* = this;
			a.onComplete = function(avalue:*):void
			{
				b.onComplete = function(bvalue:*):void
				{
					action.complete(bvalue);
				};
				b.play(env, avalue);
			};
			a.play(env, arg);
		});
		return action;
	}
	
}