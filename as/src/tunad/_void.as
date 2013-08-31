/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function _void():Action
	{
		var action:Action = new Action(function(_:*):void
		{
			action.complete();
		});
		return action;
	}
	
}