{
	"line": 18,
	"name": "Access",
	"shortText": "Toggles member parts inheritance, private/public and protected in the menu and on the pages.",
	"shortHtml": "<p>Toggles member parts inheritance, private/public and protected in the menu and on the pages.</p>",
	"text": "Toggles member parts inheritance, private/public and protected in the menu and on the pages.\n\nThis class serves dual purpose, as it is loaded on the main (index.html) page as well as \nindividual pages that are loaded into the main page.\n\nSince individual pages are loaded as iframes, we use a messaging system to\n communicate between the index and content pages.\n\n",
	"html": "<p>Toggles member parts inheritance, private/public and protected in the menu and on the pages.</p>\n<p>This class serves dual purpose, as it is loaded on the main (index.html) page as well as <br />\nindividual pages that are loaded into the main page.</p>\n<p>Since individual pages are loaded as iframes, we use a messaging system to<br />\n communicate between the index and content pages.</p>",
	"entity": "class",
	"flagSearchText": " Access documon",
	"package": "documon",
	"file": "documon/template/assets/js/documon/Access.js",
	"filename": "Access.js",
	"klass": "Access",
	"docfile": "documon.Access.html",
	"id": "documon.Access",
	"methods": [
		{
			"line": 52,
			"name": "applyAccess",
			"shortText": "Applies the access to the current page. When showQuery and hideQuery are",
			"shortHtml": "<p>Applies the access to the current page. When showQuery and hideQuery are</p>",
			"text": " Applies the access to the current page. When showQuery and hideQuery are\n provided, then these will be used to apply the access, when not provided, the\n previous values will be used.\n\n Generallly, the index page defines the showQuery and hideQuery values via the\n checkbox actions, and the content pages rely on sending the arguments to the\n function to apply the access to the page.\n\n",
			"html": "<p>Applies the access to the current page. When showQuery and hideQuery are<br />\n provided, then these will be used to apply the access, when not provided, the<br />\n previous values will be used.</p>\n<p>Generallly, the index page defines the showQuery and hideQuery values via the<br />\n checkbox actions, and the content pages rely on sending the arguments to the<br />\n function to apply the access to the page.</p>",
			"entity": "method",
			"flagSearchText": " applyAccess The string to use as a selector for querySelectorAll hideQuery",
			"access": "public",
			"params": [
				{
					"name": "showQuery",
					"shortText": "The string to use as a selector for querySelectorAll",
					"shortHtml": "<p>The string to use as a selector for querySelectorAll</p>",
					"text": "The string to use as a selector for querySelectorAll",
					"html": "<p>The string to use as a selector for querySelectorAll</p>",
					"type": "string"
				},
				{
					"name": "hideQuery",
					"shortText": "hideQuery",
					"shortHtml": "<p>hideQuery</p>",
					"text": "hideQuery",
					"html": "<p>hideQuery</p>",
					"type": "string"
				}
			],
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.applyAccess"
		},
		{
			"line": 122,
			"name": "clickAccess",
			"shortText": "The checkbox action handler",
			"shortHtml": "<p>The checkbox action handler</p>",
			"text": "The checkbox action handler\n\n",
			"html": "<p>The checkbox action handler</p>",
			"entity": "method",
			"flagSearchText": " clickAccess \n the window event",
			"access": "protected",
			"params": [
				{
					"name": "e",
					"shortText": "the window event",
					"shortHtml": "<p>the window event</p>",
					"text": "the window event",
					"html": "<p>the window event</p>",
					"type": "type"
				}
			],
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.clickAccess"
		},
		{
			"line": 229,
			"name": "init",
			"shortText": "The startup initializer",
			"shortHtml": "<p>The startup initializer</p>",
			"text": "The startup initializer\n\n",
			"html": "<p>The startup initializer</p>",
			"entity": "method",
			"flagSearchText": " init \n",
			"access": "public",
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.init"
		},
		{
			"line": 287,
			"name": "receiveMessage",
			"shortText": "THe handler pinged when a content page is loaded to check to see what the access whoudl be on",
			"shortHtml": "<p>THe handler pinged when a content page is loaded to check to see what the access whoudl be on</p>",
			"text": "THe handler pinged when a content page is loaded to check to see what the access whoudl be on\n the page.\n\n",
			"html": "<p>THe handler pinged when a content page is loaded to check to see what the access whoudl be on<br />\n the page.</p>",
			"entity": "method",
			"flagSearchText": " receiveMessage \n A message object.",
			"access": "protected",
			"params": [
				{
					"name": "message",
					"shortText": "A message object.",
					"shortHtml": "<p>A message object.</p>",
					"text": "A message object.",
					"html": "<p>A message object.</p>",
					"type": "type"
				}
			],
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.receiveMessage"
		},
		{
			"line": 202,
			"name": "restoreChecked",
			"shortText": "Restores the checkboxes to the value used last visit",
			"shortHtml": "<p>Restores the checkboxes to the value used last visit</p>",
			"text": "Restores the checkboxes to the value used last visit\n\n",
			"html": "<p>Restores the checkboxes to the value used last visit</p>",
			"entity": "method",
			"flagSearchText": " restoreChecked",
			"access": "private",
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.restoreChecked"
		},
		{
			"line": 144,
			"name": "setAccess",
			"shortText": "Generates the selector strings for showing and hiding members.",
			"shortHtml": "<p>Generates the selector strings for showing and hiding members.</p>",
			"text": "Generates the selector strings for showing and hiding members.\n\nThe query is based on HTML tags that have data- attributes that match the value (for non boolena\n type access values such as public/private/protected. And for boolean access, such as inherits,\n just checks to see if the data-inherits attribute exists\n",
			"html": "<p>Generates the selector strings for showing and hiding members.</p>\n<p>The query is based on HTML tags that have data- attributes that match the value (for non boolena<br />\n type access values such as public/private/protected. And for boolean access, such as inherits,<br />\n just checks to see if the data-inherits attribute exists</p>",
			"entity": "method",
			"flagSearchText": " setAccess \n true when you want to show memebers that are inherited true when you want to show memebers that are private true when you want to show memebers that are protected",
			"access": "public",
			"params": [
				{
					"name": "inherits",
					"shortText": "true when you want to show memebers that are inherited",
					"shortHtml": "<p>true when you want to show memebers that are inherited</p>",
					"text": "true when you want to show memebers that are inherited",
					"html": "<p>true when you want to show memebers that are inherited</p>",
					"type": "boolean"
				},
				{
					"name": "pprivate",
					"shortText": "true when you want to show memebers that are private",
					"shortHtml": "<p>true when you want to show memebers that are private</p>",
					"text": "true when you want to show memebers that are private",
					"html": "<p>true when you want to show memebers that are private</p>",
					"type": "boolean"
				},
				{
					"name": "pprotected",
					"shortText": "true when you want to show memebers that are protected",
					"shortHtml": "<p>true when you want to show memebers that are protected</p>",
					"text": "true when you want to show memebers that are protected",
					"html": "<p>true when you want to show memebers that are protected</p>",
					"type": "boolean"
				}
			],
			"file": "documon/template/assets/js/documon/Access.js",
			"filename": "Access.js",
			"klass": "Access",
			"package": "documon",
			"docfile": "documon.Access.html",
			"id": "documon.Access.setAccess"
		}
	],
	"prettyLangs": [],
	"projectName": "Documon",
	"projectVersion": "2.5.0",
	"search": {
		"documon.Access": "Access : Toggles member parts inheritance private public protected menu pages This class serves dual purpose loaded main index html page well individual pages that loaded into main page Since individual pages loaded iframes messaging system communicate between index content pagesAccess documon",
		"documon.Access.applyAccess": "applyAccess : Applies access current page When showQuery hideQuery provided then these will used apply access when provided previous values will used Generallly index page defines showQuery hideQuery values checkbox actions content pages rely sending arguments function apply access pageapplyAccess string selector querySelectorAll hideQuery",
		"documon.Access.clickAccess": "clickAccess : checkbox action handlerclickAccess window event",
		"documon.Access.setAccess": "setAccess : Generates selector strings showing hiding members query based HTML tags that have data attributes that match value boolena type access values such public private protected boolean access such inherits just checks data inherits attribute existssetAccess true when want show memebers that inherited true when want show memebers that private true when want show memebers that protected",
		"documon.Access.restoreChecked": "restoreChecked : Restores checkboxes value used last visit",
		"documon.Access.init": "init : startup initializer",
		"documon.Access.receiveMessage": "receiveMessage : handler pinged when content page loaded check what access whoudl pagereceiveMessage message object"
	}
}