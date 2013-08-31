/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function _get(name:*):Action
	{
		var action:Action = new Action(function(_:*):void
		{
			action.complete(this[name]);
		});
		return action;
	}
	
}