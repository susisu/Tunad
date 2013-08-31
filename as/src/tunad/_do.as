/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function _do(func:Function):Action
	{
		var action:Action = new Action(function(arg:*):void
		{
			action.complete(func.call(this, arg));
		});
		return action;
	}
	
}