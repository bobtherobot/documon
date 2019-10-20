[
	{
		"text": "Toggles member parts inheritance, private/public and protected in the menu and on the pages.\n\nThis class serves dual purpose, as it is loaded on the main (index.html) page as well as \nindividual pages that are loaded into the main page.\n\nSince individual pages are loaded as iframes, we use a messaging system to\n communicate between the index and content pages.\n\n",
		"start": 6,
		"end": 17,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@class  AccessAccess",
				"flag": "class",
				"after": "Access",
				"afterType": "Access",
				"name": "Access",
				"single": true,
				"text": "Access"
			},
			{
				"source": "@package  documon",
				"flag": "package",
				"after": "documon",
				"afterType": "documon",
				"name": "documon",
				"single": true,
				"text": "documon"
			}
		],
		"source": "Toggles member parts inheritance, private/public and protected in the menu and on the pages.\n\nThis class serves dual purpose, as it is loaded on the main (index.html) page as well as \nindividual pages that are loaded into the main page.\n\nSince individual pages are loaded as iframes, we use a messaging system to\n communicate between the index and content pages.\n\n@class  Access\n@package  documon",
		"id": "documon.Access"
	},
	{
		"text": " Applies the access to the current page. When showQuery and hideQuery are\n provided, then these will be used to apply the access, when not provided, the\n previous values will be used.\n\n Generallly, the index page defines the showQuery and hideQuery values via the\n checkbox actions, and the content pages rely on sending the arguments to the\n function to apply the access to the page.\n\n",
		"start": 38,
		"end": 51,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method applyAccessapplyAccess",
				"flag": "method",
				"after": "applyAccess",
				"afterType": "applyAccess",
				"name": "applyAccess",
				"single": true,
				"text": "applyAccess"
			},
			{
				"source": "@public",
				"flag": "public",
				"after": ""
			},
			{
				"source": "@param  {string}    showQuery - The string to use as a selector for querySelectorAllThe string to use as a selector for querySelectorAll",
				"flag": "param",
				"after": "{string}    showQuery - The string to use as a selector for querySelectorAll",
				"type": "string",
				"afterType": "showQuery - The string to use as a selector for querySelectorAll",
				"name": "showQuery",
				"text": "The string to use as a selector for querySelectorAll"
			},
			{
				"source": "@param  {string}    hideQuery",
				"flag": "param",
				"after": "{string}    hideQuery",
				"type": "string",
				"afterType": "hideQuery",
				"name": "hideQuery",
				"single": true,
				"text": "hideQuery"
			}
		],
		"source": " Applies the access to the current page. When showQuery and hideQuery are\n provided, then these will be used to apply the access, when not provided, the\n previous values will be used.\n\n Generallly, the index page defines the showQuery and hideQuery values via the\n checkbox actions, and the content pages rely on sending the arguments to the\n function to apply the access to the page.\n\n @method applyAccess\n @public\n @param  {string}    showQuery - The string to use as a selector for querySelectorAll \n @param  {string}    hideQuery ",
		"id": "documon.Access.applyAccess"
	},
	{
		"text": "The checkbox action handler\n\n",
		"start": 114,
		"end": 121,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method clickAccessclickAccess",
				"flag": "method",
				"after": "clickAccess",
				"afterType": "clickAccess",
				"name": "clickAccess",
				"single": true,
				"text": "clickAccess"
			},
			{
				"source": "@protected\n",
				"flag": "protected",
				"after": "",
				"text": "\n"
			},
			{
				"source": "@param  {type} e - the window event",
				"flag": "param",
				"after": "{type} e - the window event",
				"type": "type",
				"afterType": "e - the window event",
				"name": "e",
				"text": "the window event"
			}
		],
		"source": "The checkbox action handler\n\n@method clickAccess\n@protected\n\n@param  {type} e - the window event",
		"id": "documon.Access.clickAccess"
	},
	{
		"text": "Generates the selector strings for showing and hiding members.\n\nThe query is based on HTML tags that have data- attributes that match the value (for non boolena\n type access values such as public/private/protected. And for boolean access, such as inherits,\n just checks to see if the data-inherits attribute exists\n",
		"start": 131,
		"end": 143,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method setAccesssetAccess",
				"flag": "method",
				"after": "setAccess",
				"afterType": "setAccess",
				"name": "setAccess",
				"single": true,
				"text": "setAccess"
			},
			{
				"source": "@public\n",
				"flag": "public",
				"after": "",
				"text": "\n"
			},
			{
				"source": "@param  {boolean}    inherits   true when you want to show memebers that are inheritedtrue when you want to show memebers that are inherited",
				"flag": "param",
				"after": "{boolean}    inherits   true when you want to show memebers that are inherited",
				"type": "boolean",
				"afterType": "inherits   true when you want to show memebers that are inherited",
				"name": "inherits",
				"text": "true when you want to show memebers that are inherited"
			},
			{
				"source": "@param  {boolean}    pprivate   true when you want to show memebers that are privatetrue when you want to show memebers that are private",
				"flag": "param",
				"after": "{boolean}    pprivate   true when you want to show memebers that are private",
				"type": "boolean",
				"afterType": "pprivate   true when you want to show memebers that are private",
				"name": "pprivate",
				"text": "true when you want to show memebers that are private"
			},
			{
				"source": "@param  {boolean}    pprotected true when you want to show memebers that are protected",
				"flag": "param",
				"after": "{boolean}    pprotected true when you want to show memebers that are protected",
				"type": "boolean",
				"afterType": "pprotected true when you want to show memebers that are protected",
				"name": "pprotected",
				"text": "true when you want to show memebers that are protected"
			}
		],
		"source": "Generates the selector strings for showing and hiding members.\n\nThe query is based on HTML tags that have data- attributes that match the value (for non boolena\n type access values such as public/private/protected. And for boolean access, such as inherits,\n just checks to see if the data-inherits attribute exists\n@method setAccess\n@public\n\n@param  {boolean}    inherits   true when you want to show memebers that are inherited\n@param  {boolean}    pprivate   true when you want to show memebers that are private\n@param  {boolean}    pprotected true when you want to show memebers that are protected",
		"id": "documon.Access.setAccess"
	},
	{
		"text": "Restores the checkboxes to the value used last visit\n\n",
		"start": 196,
		"end": 201,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method restoreCheckedrestoreChecked",
				"flag": "method",
				"after": "restoreChecked",
				"afterType": "restoreChecked",
				"name": "restoreChecked",
				"single": true,
				"text": "restoreChecked"
			},
			{
				"source": "@private",
				"flag": "private",
				"after": ""
			}
		],
		"source": "Restores the checkboxes to the value used last visit\n\n@method restoreChecked\n@private",
		"id": "documon.Access.restoreChecked"
	},
	{
		"text": "The startup initializer\n\n",
		"start": 222,
		"end": 228,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method initinit",
				"flag": "method",
				"after": "init",
				"afterType": "init",
				"name": "init",
				"single": true,
				"text": "init"
			},
			{
				"source": "@public",
				"flag": "public",
				"after": "",
				"text": "\n"
			}
		],
		"source": "The startup initializer\n\n@method init\n@public\n",
		"id": "documon.Access.init"
	},
	{
		"text": "THe handler pinged when a content page is loaded to check to see what the access whoudl be on\n the page.\n\n",
		"start": 278,
		"end": 286,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Access.js",
		"flags": [
			{
				"source": "@method receiveMessagereceiveMessage",
				"flag": "method",
				"after": "receiveMessage",
				"afterType": "receiveMessage",
				"name": "receiveMessage",
				"single": true,
				"text": "receiveMessage"
			},
			{
				"source": "@protected\n",
				"flag": "protected",
				"after": "",
				"text": "\n"
			},
			{
				"source": "@param  {type}         message - A message object.",
				"flag": "param",
				"after": "{type}         message - A message object.",
				"type": "type",
				"afterType": "message - A message object.",
				"name": "message",
				"text": "A message object."
			}
		],
		"source": "THe handler pinged when a content page is loaded to check to see what the access whoudl be on\n the page.\n\n@method receiveMessage\n@protected\n\n@param  {type}         message - A message object.",
		"id": "documon.Access.receiveMessage"
	}
]