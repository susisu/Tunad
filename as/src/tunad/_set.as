/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public function _set(name:*):Function
	{
		return function(value:*):Action
		{
			return bind(value, assign(name));
		};
	}
	
}