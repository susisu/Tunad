/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function mbind(...args):Action
	{
		var actions:Vector.<Action> = Vector.<Action>(args);
		var len:int = actions.length;
		if(len > 0)
		{
			var t:Action = actions[0];
			for(var i:int = 1; i < len; i++)
			{
				t = bind(t, actions[i]);
			}
			return t;
		}
		else
		{
			return _void();
		}
	}
	
}