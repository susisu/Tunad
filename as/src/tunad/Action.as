/*
	Tunad.as
	Copyright(C) 2013 Susisu
*/
package tunad
{
	
	public class Action extends Object
	{
		
		private var _func:Function;
		
		public var onComplete:Function;
		
		public function Action(func:Function)
		{
			this._func = func;
			
			this.onComplete = null;
		}
		
		public function play(env:*, arg:* = undefined):void
		{
			this._func.call(env, arg);
		}
		
		public function complete(value:* = undefined):void
		{
			if(this.onComplete != null)
			{
				this.onComplete(value);
				this.onComplete = null;
			}
		}
		
		public function apply(arg:*):Action
		{
			var action:Action = this;
			var wrapper:Action = new Action(function(_:*):void
			{
				action.onComplete = function(value:*):void
				{
					wrapper.complete(value);
				};
				action.play(this, arg);
			});
			return wrapper;
		}
		
	}
	
}