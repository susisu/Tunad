/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function _return():Action
	{
		var action:Action = new Action(function(arg:*):void
		{
			action.complete(arg);
		});
		return action;
	}
	
}