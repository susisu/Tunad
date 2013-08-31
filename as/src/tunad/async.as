/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function async(...args):Action
	{
		var actions:Vector.<Action> = Vector.<Action>(args);
		var len:int = actions.length;
		if(len > 0)
		{
			var action:Action = new Action(function(arg:*):void
			{
				var n:int = 0;
				function handler(value:*):void
				{
					n++;
					if(n == len)
					{
						action.complete();
					}
				}
				for(var i:int = 0; i < len; i++)
				{
					var t:Action = actions[i];
					t.onComplete = handler;
					t.play(this, arg);
				}
			});
			return action;
		}
		else
		{
			return _void();
		}
	}
	
}