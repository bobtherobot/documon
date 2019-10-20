[
	{
		"start": 6,
		"end": 17,
		"data": "Toggles member parts inheritance, private/public and protected in the menu and on the pages.\n\nThis class serves dual purpose, as it is loaded on the main (index.html) page as well as \nindividual pages that are loaded into the main page.\n\nSince individual pages are loaded as iframes, we use a messaging system to\n communicate between the index and content pages.\n\n@class  Access\n@package  documon"
	},
	{
		"start": 38,
		"end": 51,
		"data": " Applies the access to the current page. When showQuery and hideQuery are\n provided, then these will be used to apply the access, when not provided, the\n previous values will be used.\n\n Generallly, the index page defines the showQuery and hideQuery values via the\n checkbox actions, and the content pages rely on sending the arguments to the\n function to apply the access to the page.\n\n @method applyAccess\n @public\n @param  {string}    showQuery - The string to use as a selector for querySelectorAll \n @param  {string}    hideQuery "
	},
	{
		"start": 114,
		"end": 121,
		"data": "The checkbox action handler\n\n@method clickAccess\n@protected\n\n@param  {type} e - the window event"
	},
	{
		"start": 131,
		"end": 143,
		"data": "Generates the selector strings for showing and hiding members.\n\nThe query is based on HTML tags that have data- attributes that match the value (for non boolena\n type access values such as public/private/protected. And for boolean access, such as inherits,\n just checks to see if the data-inherits attribute exists\n@method setAccess\n@public\n\n@param  {boolean}    inherits   true when you want to show memebers that are inherited\n@param  {boolean}    pprivate   true when you want to show memebers that are private\n@param  {boolean}    pprotected true when you want to show memebers that are protected"
	},
	{
		"start": 196,
		"end": 201,
		"data": "Restores the checkboxes to the value used last visit\n\n@method restoreChecked\n@private"
	},
	{
		"start": 222,
		"end": 228,
		"data": "The startup initializer\n\n@method init\n@public\n"
	},
	{
		"start": 278,
		"end": 286,
		"data": "THe handler pinged when a content page is loaded to check to see what the access whoudl be on\n the page.\n\n@method receiveMessage\n@protected\n\n@param  {type}         message - A message object."
	}
]