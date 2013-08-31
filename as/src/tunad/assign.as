/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function assign(name:*):Action
	{
		var action:Action = new Action(function(arg:*):void
		{
			this[name] = arg;
			
			action.complete();
		});
		return action;
	}
	
}