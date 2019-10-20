[
	{
		"text": "Set/Get convienence methods for localStorage.\n\n",
		"start": 10,
		"end": 15,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Storage.js",
		"flags": [
			{
				"source": "@class StorageStorage",
				"flag": "class",
				"after": "Storage",
				"afterType": "Storage",
				"name": "Storage",
				"single": true,
				"text": "Storage"
			},
			{
				"source": "@namespace gieson",
				"flag": "namespace",
				"after": "gieson",
				"afterType": "gieson",
				"name": "gieson",
				"single": true,
				"text": "gieson"
			}
		],
		"source": "Set/Get convienence methods for localStorage.\n\n@class Storage\n@namespace gieson",
		"id": "gieson.Storage"
	},
	{
		"text": "Stores data. Can store string, number, boolean and objects.\n\n",
		"start": 18,
		"end": 25,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Storage.js",
		"flags": [
			{
				"source": "@method  setStoresetStore\n",
				"flag": "method",
				"after": "setStore",
				"afterType": "setStore",
				"name": "setStore",
				"single": true,
				"text": "setStore\n"
			},
			{
				"source": "@param   {string}\tname \t- The name of the \"thing\" to store. (We use this to get it out later)The name of the \"thing\" to store. (We use this to get it out later)",
				"flag": "param",
				"after": "{string}\tname \t- The name of the \"thing\" to store. (We use this to get it out later)",
				"type": "string",
				"afterType": "name \t- The name of the \"thing\" to store. (We use this to get it out later)",
				"name": "name",
				"text": "The name of the \"thing\" to store. (We use this to get it out later)"
			},
			{
				"source": "@param   {any}\t\tval   \t- The actual thing to store.",
				"flag": "param",
				"after": "{any}\t\tval   \t- The actual thing to store.",
				"type": "any",
				"afterType": "val   \t- The actual thing to store.",
				"name": "val",
				"text": "The actual thing to store."
			}
		],
		"source": "Stores data. Can store string, number, boolean and objects.\n\n@method  setStore\n\n@param   {string}\tname \t- The name of the \"thing\" to store. (We use this to get it out later)\n@param   {any}\t\tval   \t- The actual thing to store.",
		"id": "gieson.Storage.setStore"
	},
	{
		"text": "Retrieves an item from browser's local storage.\n\n",
		"start": 37,
		"end": 43,
		"file": "/Volumes/Drives/projects/documon/documon/template/assets/js/documon/Storage.js",
		"flags": [
			{
				"source": "@method  getStoregetStore",
				"flag": "method",
				"after": "getStore",
				"afterType": "getStore",
				"name": "getStore",
				"single": true,
				"text": "getStore"
			},
			{
				"source": "@param   {string}    name  - The name of the \"thing\" you want to get.The name of the \"thing\" you want to get.",
				"flag": "param",
				"after": "{string}    name  - The name of the \"thing\" you want to get.",
				"type": "string",
				"afterType": "name  - The name of the \"thing\" you want to get.",
				"name": "name",
				"text": "The name of the \"thing\" you want to get."
			},
			{
				"source": "@return  {any} - The stored data",
				"flag": "return",
				"after": "{any} - The stored data",
				"type": "any",
				"afterType": "The stored data",
				"text": "The stored data"
			}
		],
		"source": "Retrieves an item from browser's local storage.\n\n@method  getStore\n@param   {string}    name  - The name of the \"thing\" you want to get.\n@return  {any} - The stored data",
		"id": "gieson.Storage.getStore"
	}
]