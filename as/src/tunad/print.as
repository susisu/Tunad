/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function print():Action
	{
		var action:Action = new Action(function(arg:*):void
		{
			trace(String(arg));
			
			action.complete();
		});
		return action;
	}
	
}