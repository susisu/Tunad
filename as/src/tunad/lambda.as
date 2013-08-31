/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function lambda(func:Function):Action
	{
		var action = new Action(function(arg:*):void
		{
			var sub:Action = func(arg);
			sub.onComplete = function(value:*):void
			{
				action.complete(value);
			};
			sub.play(this);
		});
		return action;
	}
	
}