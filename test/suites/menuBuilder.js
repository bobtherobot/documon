/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/menuBuilder.js`, which turns the organizer's tree into the structure
 * written to `_menuData.js` and read by the menu on every page.
 *
 * Every entry carries the url the menu will navigate to, so a wrong id here is a dead
 * link in the shipped site.
 *
 * @module  suites/menuBuilder
 * @package test
 */

exports.name = "menuBuilder: the navigation tree";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var render = t.src("menuBuilder");

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	/**
	 * @method  b
	 * @private
	 * @param   {array} lines - The lines inside the comment.
	 * @return  {string}      - A comment block.
	 */
	function b(lines){
		return [OPEN].concat(lines.map(function(l){ return " * " + l; })).concat([" " + CLOSE]).join("\n");
	}

	/**
	 * Builds a menu from a set of files.
	 *
	 * @method  menuFor
	 * @private
	 * @param   {object} files - Map of filename to an array of comment blocks.
	 * @return  {array}        - The rendered menu.
	 */
	function menuFor(files){

		var org = t.fresh("organizer");
		org.init({ templateFolder : t.TEMPLATE, docsDirName : "docs" });

		for(var name in files){
			var pages = t.tagSource(files[name].join("\n\n"), { file : "/proj/src/" + name });
			for(var i=0; i<pages.length; i++){
				org.add(pages[i]);
			}
		}

		return render( org.buildMenu() );
	}

	/**
	 * Finds a node anywhere in the tree.
	 *
	 * @method  find
	 * @private
	 * @param   {array}  nodes - The tree.
	 * @param   {string} id    - The id to look for.
	 * @return  {object}       - The node, or null.
	 */
	function find(nodes, id){
		for(var i=0; i<(nodes || []).length; i++){
			if(nodes[i].id === id){
				return nodes[i];
			}
			var deeper = find(nodes[i].children, id);
			if(deeper){
				return deeper;
			}
		}
		return null;
	}

	/**
	 * Every node in the tree, flattened.
	 *
	 * @method  flatten
	 * @private
	 * @param   {array} nodes - The tree.
	 * @param   {array} [out] - Accumulator.
	 * @return  {array}       - Every node.
	 */
	function flatten(nodes, out){
		out = out || [];
		for(var i=0; i<(nodes || []).length; i++){
			out.push(nodes[i]);
			flatten(nodes[i].children, out);
		}
		return out;
	}

	// ------------------------------------------------------------------
	t.section("menuBuilder: the shape of the tree");
	// ------------------------------------------------------------------
	var menu = menuFor({
		"widget.js" : [
			b(["A widget.", "@class Widget", "@package app"]),
			b(["Does it.", "@method doIt"]),
			b(["The total.", "@property {number} total"]),
			b(["Fired on change.", "@event change"])
		],
		"loose.js" : [
			b(["Loose at the top level.", "@method rootLoose"])
		]
	});

	t.ok(Array.isArray(menu), "a menu is an array of sections");
	t.ok(menu.length > 0, "with at least one section", JSON.stringify(menu.length));

	var packages = find(menu, "root-packages");
	t.ok(packages !== null, "there is a packages section",
		JSON.stringify(menu.map(function(n){ return n.id; })));
	t.ok(packages.kind === "packages", "labelled by its kind", packages.kind);
	t.ok(packages.label === "packages", "with a readable label", packages.label);

	var app = find(menu, "app");
	t.ok(app !== null, "the package is in it");
	t.ok(app.kind === "packages-item", "as a package item", app.kind);
	t.ok(app.url === "app.html#app", "linking to its own page", app.url);

	var widget = find(menu, "app.Widget");
	t.ok(widget !== null, "the class is nested under the package");
	t.ok(widget.label === "Widget", "with its short name as the label", widget.label);
	t.ok(widget.url === "app.Widget.html#app.Widget", "and its page as the url", widget.url);

	// ------------------------------------------------------------------
	t.section("menuBuilder: members and their urls");
	// ------------------------------------------------------------------
	var doIt = find(menu, "app.Widget.doIt");
	t.ok(doIt !== null, "a method appears in the tree");
	t.ok(doIt.kind === "methods-item", "marked as a method", doIt.kind);
	t.ok(doIt.url === "app.Widget.html#app.Widget.doIt",
		"linking to its anchor on the class page", doIt.url);
	t.ok(doIt.label === "doIt", "labelled with its bare name", doIt.label);

	t.ok(find(menu, "app.Widget.total") !== null, "a property appears in the tree");
	t.ok(find(menu, "app.Widget.change") !== null, "an event appears in the tree");
	t.ok(find(menu, "app.Widget.total").kind === "properties-item",
		"a property is marked as one", find(menu, "app.Widget.total").kind);
	t.ok(find(menu, "app.Widget.change").kind === "events-item",
		"an event is marked as one", find(menu, "app.Widget.change").kind);

	// Loose members hang off root rather than under a package.
	var loose = find(menu, "root.rootLoose");
	t.ok(loose !== null, "a loose member is in the tree",
		JSON.stringify(flatten(menu).map(function(n){ return n.id; })));
	t.ok(loose.url === "root.html#root.rootLoose", "pointing at the root page", loose.url);

	// ------------------------------------------------------------------
	t.section("menuBuilder: every node is navigable");
	// ------------------------------------------------------------------
	var all = flatten(menu);
	t.ok(all.length > 5, "the tree has depth", JSON.stringify(all.length));

	var missingUrl = all.filter(function(n){ return ! n.url; });
	t.ok(missingUrl.length === 0, "every node has a url",
		JSON.stringify(missingUrl.map(function(n){ return n.id; })));

	var missingLabel = all.filter(function(n){ return ! n.label; });
	t.ok(missingLabel.length === 0, "every node has a label",
		JSON.stringify(missingLabel.map(function(n){ return n.id; })));

	var missingId = all.filter(function(n){ return ! n.id; });
	t.ok(missingId.length === 0, "every node has an id");

	// Duplicate ids would make the menu select the wrong entry.
	var ids = all.map(function(n){ return n.id; });
	var dupes = ids.filter(function(id, i){ return ids.indexOf(id) !== i; });
	t.ok(dupes.length === 0, "no id appears twice", JSON.stringify(dupes));

	// Every url points at a page, with an anchor.
	var badUrl = all.filter(function(n){ return ! /^[^#]+\.html#.+$/.test(n.url); });
	t.ok(badUrl.length === 0, "every url is a page plus an anchor",
		JSON.stringify(badUrl.map(function(n){ return n.id + " -> " + n.url; })));

	// ------------------------------------------------------------------
	t.section("menuBuilder: empty sections are not rendered");
	// ------------------------------------------------------------------
	// A class with only methods must not grow empty "properties" and "events" headings.
	var methodsOnly = menuFor({
		"only.js" : [
			b(["A class.", "@class Only", "@package app"]),
			b(["Does it.", "@method doIt"])
		]
	});

	t.ok(find(methodsOnly, "app.Only-methods") !== null, "the section that has members is built");
	t.ok(find(methodsOnly, "app.Only-properties") === null,
		"an empty properties section is not built");
	t.ok(find(methodsOnly, "app.Only-events") === null,
		"an empty events section is not built");

	// ------------------------------------------------------------------
	t.section("menuBuilder: inheritance and access are carried");
	// ------------------------------------------------------------------
	var org = t.fresh("organizer");
	org.init({ templateFolder : t.TEMPLATE, docsDirName : "docs" });

	var basePages = t.tagSource([
		b(["The parent.", "@class Base", "@package app"]),
		b(["Inherited.", "@method shared"])
	].join("\n\n"), { file : "/proj/src/base.js" });
	var childPages = t.tagSource([
		b(["The child.", "@class Child", "@package app", "@extends app.Base"]),
		b(["Private one.", "@method secret", "@private"])
	].join("\n\n"), { file : "/proj/src/child.js" });

	basePages.concat(childPages).forEach(function(p){ org.add(p); });
	org.processInheritance();

	var inhMenu = render( org.buildMenu() );
	var inherited = find(inhMenu, "app.Child.shared");

	t.ok(inherited !== null, "an inherited member reaches the menu",
		JSON.stringify(flatten(inhMenu).map(function(n){ return n.id; })));
	t.ok(inherited.inherits !== 0 && inherited.inherits !== undefined,
		"and is marked as inherited", JSON.stringify(inherited.inherits));

	var own = find(inhMenu, "app.Child.secret");
	t.ok(own !== null, "the child's own member is there too");
	t.ok(own.inherits === 0, "and is not marked inherited", JSON.stringify(own.inherits));
	t.ok(own.access === "private", "its visibility is carried through", own.access);

	// ------------------------------------------------------------------
	t.section("menuBuilder: nothing to render");
	// ------------------------------------------------------------------
	t.ok(Array.isArray(render({})) && render({}).length === 0,
		"an empty context yields an empty menu", JSON.stringify(render({})));
	t.ok(render({ classes : [], methods : [] }).length === 0,
		"empty sections yield an empty menu");
};
