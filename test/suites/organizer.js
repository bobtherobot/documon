/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/organizer.js`, which collects every tagged page into one tree and then
 * cross-fills inheritance.
 *
 * The organizer is the only module that sees the whole project at once, so it is where
 * "a class in one file extends a class in another" is resolved -- and where a member can
 * quietly disappear if two files contribute to the same package.
 *
 * Its `organ`, `flatClassList` and `didApplyInheritance` all live at module scope and
 * `init()` resets only the first, so every scenario here takes a fresh copy of the module.
 *
 * @module  suites/organizer
 * @package test
 */

exports.name = "organizer: the project tree";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	/**
	 * Builds a comment block.
	 *
	 * @method  b
	 * @private
	 * @param   {array} lines - The lines inside the comment.
	 * @return  {string}      - A comment block.
	 */
	function b(lines){
		return [OPEN].concat(lines.map(function(l){ return " * " + l; })).concat([" " + CLOSE]).join("\n");
	}

	/**
	 * Starts a new organizer with a clean module state.
	 *
	 * @method  freshOrganizer
	 * @private
	 * @return  {object} - The organizer module.
	 */
	function freshOrganizer(){
		var org = t.fresh("organizer");
		org.init({
			templateFolder : t.TEMPLATE,
			docsDirName    : "docs",
			outputFolder   : "/tmp/does-not-matter"
		});
		return org;
	}

	/**
	 * Tags one file's worth of blocks and adds every page to the organizer.
	 *
	 * @method  addFile
	 * @private
	 * @param   {object} org    - The organizer.
	 * @param   {string} file   - The source filename.
	 * @param   {array}  blocks - Comment blocks.
	 */
	function addFile(org, file, blocks){
		var pages = t.tagSource(blocks.join("\n\n"), { file : "/proj/src/" + file });
		for(var i=0; i<pages.length; i++){
			org.add(pages[i]);
		}
	}

	/**
	 * Finds a package node in a built menu.
	 *
	 * @method  pkg
	 * @private
	 * @param   {object} menu - The menu tree.
	 * @param   {string} id   - The package id.
	 * @return  {object}      - The package node, or undefined.
	 */
	function pkg(menu, id){
		return (menu.packages || []).filter(function(p){ return p.id === id; })[0];
	}

	/**
	 * Finds a class inside a package node.
	 *
	 * @method  klass
	 * @private
	 * @param   {object} node - A package node.
	 * @param   {string} id   - The class id.
	 * @return  {object}      - The class node, or undefined.
	 */
	function klass(node, id){
		return ((node && node.classes) || []).filter(function(c){ return c.id === id; })[0];
	}

	/**
	 * Member names of a section.
	 *
	 * @method  namesOf
	 * @private
	 * @param   {array} list - A section.
	 * @return  {array}      - Names.
	 */
	function namesOf(list){
		return (list || []).map(function(m){ return m.name; }).sort();
	}

	// ------------------------------------------------------------------
	t.section("organizer: the shape of the tree");
	// ------------------------------------------------------------------
	var org = freshOrganizer();
	addFile(org, "widget.js", [
		b(["A widget.", "@class Widget", "@package app"]),
		b(["Does it.", "@method doIt"])
	]);
	var menu = org.buildMenu();

	t.ok(menu.id === "root", "there is always a root node", menu.id);
	t.ok(Array.isArray(menu.packages), "root carries a package list");
	t.ok(pkg(menu, "app") !== undefined, "a declared package becomes a node",
		JSON.stringify((menu.packages || []).map(function(p){ return p.id; })));
	t.ok(klass(pkg(menu, "app"), "app.Widget") !== undefined,
		"and the class hangs off it",
		JSON.stringify((pkg(menu, "app").classes || []).map(function(c){ return c.id; })));
	t.ok(namesOf(klass(pkg(menu, "app"), "app.Widget").methods).join(",") === "doIt",
		"with its members attached",
		JSON.stringify(namesOf(klass(pkg(menu, "app"), "app.Widget").methods)));

	// buildMenu hands back a clone, so a caller cannot mutate the live tree.
	var again = org.buildMenu();
	t.ok(again !== menu, "buildMenu returns a fresh copy each time");
	t.ok(again.packages !== menu.packages, "including its nested arrays");

	// ------------------------------------------------------------------
	t.section("organizer: several files, several packages");
	// ------------------------------------------------------------------
	var multi = freshOrganizer();
	addFile(multi, "a.js", [ b(["A.", "@class Alpha", "@package one"]), b(["m.", "@method aa"]) ]);
	addFile(multi, "b.js", [ b(["B.", "@class Bravo", "@package two"]), b(["m.", "@method bb"]) ]);
	addFile(multi, "c.js", [ b(["C.", "@class Charlie", "@package one"]), b(["m.", "@method cc"]) ]);
	var multiMenu = multi.buildMenu();

	t.ok((multiMenu.packages || []).length === 2, "one node per distinct package",
		JSON.stringify((multiMenu.packages || []).map(function(p){ return p.id; })));
	t.ok((pkg(multiMenu, "one").classes || []).length === 2,
		"classes from different files share their package",
		JSON.stringify((pkg(multiMenu, "one").classes || []).map(function(c){ return c.id; })));

	// Adding the same class id twice replaces it rather than duplicating it.
	var dupe = freshOrganizer();
	addFile(dupe, "a.js", [ b(["First.", "@class Same", "@package app"]), b(["m.", "@method one"]) ]);
	addFile(dupe, "b.js", [ b(["Second.", "@class Same", "@package app"]), b(["m.", "@method two"]) ]);
	var dupeMenu = dupe.buildMenu();
	t.ok((pkg(dupeMenu, "app").classes || []).length === 1,
		"a repeated class id does not produce two entries",
		JSON.stringify((pkg(dupeMenu, "app").classes || []).map(function(c){ return c.id; })));

	// ------------------------------------------------------------------
	t.section("organizer: loose members that hang off a package");
	// ------------------------------------------------------------------
	// Members documented without an enclosing class belong to the package itself. When
	// two files both contribute them, both sets have to survive.
	var loose = freshOrganizer();
	addFile(loose, "one.js", [ b(["Loose one.", "@method alpha", "@package app"]) ]);
	addFile(loose, "two.js", [ b(["Loose two.", "@method bravo", "@package app"]) ]);
	var looseMenu = loose.buildMenu();

	t.ok(namesOf(pkg(looseMenu, "app").methods).join(",") === "alpha,bravo",
		"loose members from every file survive",
		JSON.stringify(namesOf(pkg(looseMenu, "app").methods)));

	// The same question for properties and events.
	var looseMixed = freshOrganizer();
	addFile(looseMixed, "one.js", [ b(["P one.", "@property {number} pa", "@package app"]) ]);
	addFile(looseMixed, "two.js", [ b(["P two.", "@property {number} pb", "@package app"]) ]);
	t.ok(namesOf(pkg(looseMixed.buildMenu(), "app").properties).join(",") === "pa,pb",
		"loose properties from every file survive",
		JSON.stringify(namesOf(pkg(looseMixed.buildMenu(), "app").properties)));

	// The root package is the same story for members with no package at all.
	var rootLoose = freshOrganizer();
	addFile(rootLoose, "one.js", [ b(["Root one.", "@method ra"]) ]);
	addFile(rootLoose, "two.js", [ b(["Root two.", "@method rb"]) ]);
	t.ok(namesOf(rootLoose.buildMenu().methods).join(",") === "ra,rb",
		"loose members on root survive too",
		JSON.stringify(namesOf(rootLoose.buildMenu().methods)));

	// ------------------------------------------------------------------
	t.section("organizer: inheritance");
	// ------------------------------------------------------------------
	var inh = freshOrganizer();
	addFile(inh, "base.js", [
		b(["The parent.", "@class Base", "@package app"]),
		b(["Inherited.", "@method shared"]),
		b(["Also inherited.", "@property {number} count"])
	]);
	addFile(inh, "child.js", [
		b(["The child.", "@class Child", "@package app", "@extends app.Base"]),
		b(["Its own.", "@method extra"])
	]);
	inh.processInheritance();
	var inhMenu = inh.buildMenu();
	var child = klass(pkg(inhMenu, "app"), "app.Child");

	t.ok(namesOf(child.methods).join(",") === "extra,shared",
		"a child gains the parent's methods", JSON.stringify(namesOf(child.methods)));
	t.ok(namesOf(child.properties).join(",") === "count",
		"and the parent's properties", JSON.stringify(namesOf(child.properties)));

	var inheritedMethod = (child.methods || []).filter(function(m){ return m.name === "shared"; })[0];
	t.ok(inheritedMethod.inherits === "app.Base", "an inherited member records where it came from",
		inheritedMethod.inherits);
	t.ok(inheritedMethod.id === "app.Child.shared",
		"and is re-homed onto the child's id", inheritedMethod.id);

	var ownMethod = (child.methods || []).filter(function(m){ return m.name === "extra"; })[0];
	t.ok(ownMethod.inherits === undefined, "a member the child declared is not marked inherited");

	// An unqualified @extends means "in my own package".
	var shortExt = freshOrganizer();
	addFile(shortExt, "base.js", [
		b(["The parent.", "@class Base", "@package app"]),
		b(["Inherited.", "@method shared"])
	]);
	addFile(shortExt, "child.js", [
		b(["The child.", "@class Child", "@package app", "@extends Base"]),
		b(["Its own.", "@method extra"])
	]);
	shortExt.processInheritance();
	t.ok(namesOf(klass(pkg(shortExt.buildMenu(), "app"), "app.Child").methods).join(",") === "extra,shared",
		"an unqualified @extends resolves within the package",
		JSON.stringify(namesOf(klass(pkg(shortExt.buildMenu(), "app"), "app.Child").methods)));

	// ------------------------------------------------------------------
	t.section("organizer: overriding");
	// ------------------------------------------------------------------
	var over = freshOrganizer();
	addFile(over, "base.js", [
		b(["The parent.", "@class Base", "@package app"]),
		b(["Parent version.", "@method shared"])
	]);
	addFile(over, "child.js", [
		b(["The child.", "@class Child", "@package app", "@extends app.Base"]),
		b(["Child version.", "@method shared"])
	]);
	over.processInheritance();
	var overChild = klass(pkg(over.buildMenu(), "app"), "app.Child");

	t.ok((overChild.methods || []).length === 1,
		"a redeclared member is not duplicated",
		JSON.stringify(namesOf(overChild.methods)));
	t.ok(overChild.methods[0].overrides === "app.Base.shared",
		"and is marked as overriding the parent's", overChild.methods[0].overrides);
	t.ok(/Child version\./.test(overChild.methods[0].text),
		"keeping the child's own description", JSON.stringify(overChild.methods[0].text));

	// ------------------------------------------------------------------
	t.section("organizer: inheritance chains");
	// ------------------------------------------------------------------
	// A grandchild must receive the grandparent's members, which means the parent has to
	// be resolved before the child is.
	var chain = freshOrganizer();
	addFile(chain, "a.js", [
		b(["Grandparent.", "@class A", "@package app"]),
		b(["From A.", "@method fromA"])
	]);
	addFile(chain, "b.js", [
		b(["Parent.", "@class B", "@package app", "@extends app.A"]),
		b(["From B.", "@method fromB"])
	]);
	addFile(chain, "c.js", [
		b(["Child.", "@class C", "@package app", "@extends app.B"]),
		b(["From C.", "@method fromC"])
	]);
	chain.processInheritance();
	var grandchild = klass(pkg(chain.buildMenu(), "app"), "app.C");

	t.ok(namesOf(grandchild.methods).join(",") === "fromA,fromB,fromC",
		"members cross-fill down the whole chain",
		JSON.stringify(namesOf(grandchild.methods)));

	// An @extends pointing at nothing must not throw or lose the class.
	var dangling = freshOrganizer();
	addFile(dangling, "c.js", [
		b(["Child.", "@class Orphan", "@package app", "@extends app.NoSuchThing"]),
		b(["Its own.", "@method mine"])
	]);
	dangling.processInheritance();
	var orphan = klass(pkg(dangling.buildMenu(), "app"), "app.Orphan");
	t.ok(orphan !== undefined, "an unresolved @extends does not lose the class");
	t.ok(namesOf(orphan.methods).join(",") === "mine", "which keeps its own members",
		JSON.stringify(namesOf(orphan.methods)));

	// ------------------------------------------------------------------
	t.section("organizer: buildPages");
	// ------------------------------------------------------------------
	var pagesOrg = freshOrganizer();
	addFile(pagesOrg, "widget.js", [
		b(["A widget.", "@class Widget", "@package app"]),
		b(["Does it.", "@method doIt"])
	]);
	pagesOrg.buildMenu();
	var pages = pagesOrg.buildPages();

	t.ok(Array.isArray(pages) && pages.length > 0, "buildPages returns a list",
		JSON.stringify(pages.length));

	var widgetPage = pages.filter(function(p){ return p.id === "app.Widget"; })[0];
	t.ok(widgetPage !== undefined, "the class has a page",
		JSON.stringify(pages.map(function(p){ return p.id; })));
	t.ok(widgetPage.docfile === "app.Widget.html", "with the docfile it will be written to",
		widgetPage.docfile);
	t.ok(typeof widgetPage.html === "string" && widgetPage.html.length > 0,
		"and rendered HTML");
	t.ok(widgetPage.ctx && widgetPage.ctx.id === "app.Widget",
		"carrying the entity itself for anything downstream");
	t.ok(/doIt/.test(widgetPage.html), "the member appears in the rendered HTML");

	t.ok(pages.filter(function(p){ return p.id === "app"; }).length === 1,
		"the package gets a page of its own",
		JSON.stringify(pages.map(function(p){ return p.id; })));
	t.ok(pages.filter(function(p){ return p.id === "root"; }).length === 1,
		"and so does root");
};
