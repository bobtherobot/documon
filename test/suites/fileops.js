/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/dirutils.js` and `src/fileutils.js`.
 *
 * These are the only two modules that touch the filesystem destructively. `emptydir` is
 * what runs against the output folder on every build, so "does it delete exactly what it
 * says it deletes, and nothing above it" is worth pinning down.
 *
 * @module  suites/fileops
 * @package test
 */

var fs   = require('fs');
var path = require('path');

exports.name = "fileops: dirutils and fileutils";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var du = t.src("dirutils");
	var fu = t.src("fileutils");

	/**
	 * Builds a small tree to read and destroy.
	 *
	 * @method  tree
	 * @private
	 * @return  {string} - The root of the new tree.
	 */
	function tree(){
		var root = t.tmp();
		t.write(path.join(root, "a.js"), "// a");
		t.write(path.join(root, "b.txt"), "b");
		t.write(path.join(root, "c.md"), "c");
		t.write(path.join(root, "sub", "d.js"), "// d");
		t.write(path.join(root, "sub", "e.txt"), "e");
		t.write(path.join(root, "sub", "deep", "f.js"), "// f");
		return root;
	}

	// ------------------------------------------------------------------
	t.section("dirutils: read");
	// ------------------------------------------------------------------
	var root = tree();

	var shallow = du.read(root, null, false);
	t.ok(shallow.files.length === 3, "a shallow read finds only top-level files",
		JSON.stringify(shallow.files));
	t.ok(shallow.dirs.length === 1, "and reports the sub-folder", JSON.stringify(shallow.dirs));

	var deep = du.read(root, null, true);
	t.ok(deep.files.length === 6, "a recursive read finds every file",
		JSON.stringify(deep.files));
	t.ok(deep.dirs.length === 2, "and every folder", JSON.stringify(deep.dirs));

	var filtered = du.read(root, function(isFolder, file){
		return ! isFolder && /\.txt$/.test(file);
	}, true);
	t.ok(filtered.files.length === 2, "a filter function selects files",
		JSON.stringify(filtered.files));

	// ------------------------------------------------------------------
	t.section("dirutils: readExt");
	// ------------------------------------------------------------------
	// This is what the builder uses to decide which source files exist, driven by the
	// sourceExt config option. Extensions are given without the dot.
	var js = du.readExt(root, "js", true);
	t.ok(js.length === 3, "a single extension string matches", JSON.stringify(js));
	t.ok(js.every(function(f){ return /\.js$/.test(f); }), "and matches only that extension");

	var many = du.readExt(root, ["js", "md"], true);
	t.ok(many.length === 4, "an array of extensions matches all of them", JSON.stringify(many));

	t.ok(du.readExt(root, "nope", true).length === 0,
		"an extension nothing uses yields an empty list");

	t.ok(du.readExt(root, "js", false).length === 1,
		"readExt honours the recursive flag", JSON.stringify(du.readExt(root, "js", false)));

	// ------------------------------------------------------------------
	t.section("dirutils: exists and make");
	// ------------------------------------------------------------------
	t.ok(du.exists(root) === true, "exists is true for a folder");
	t.ok(du.exists(path.join(root, "a.js")) === false, "exists is false for a file");
	t.ok(du.exists(path.join(root, "nope")) === false, "exists is false for nothing at all");

	var made = path.join(root, "made", "deeply", "nested");
	du.make(made);
	t.ok(du.exists(made) === true, "make creates missing intermediate folders");
	du.make(made);
	t.ok(du.exists(made) === true, "make on an existing folder is harmless");

	// ------------------------------------------------------------------
	t.section("dirutils: copy");
	// ------------------------------------------------------------------
	var copyTo = path.join(t.tmp(), "copied");
	du.copy(root, copyTo);
	t.ok(fs.existsSync(path.join(copyTo, "a.js")), "copy brings top-level files");
	t.ok(fs.existsSync(path.join(copyTo, "sub", "deep", "f.js")),
		"copy recurses into sub-folders");
	t.ok(t.read(path.join(copyTo, "sub", "deep", "f.js")) === "// f",
		"copied contents match");

	// ------------------------------------------------------------------
	t.section("dirutils: empty and remove");
	// ------------------------------------------------------------------
	// A dry run must report without touching anything -- this is the safety valve on a
	// routine that runs against the user's output folder every single build.
	var dryRoot = tree();
	var wouldRemove = du.empty(dryRoot, true);
	t.ok(wouldRemove.length === 8, "a dry run reports every file and folder",
		wouldRemove.length + ": " + JSON.stringify(wouldRemove));
	t.ok(fs.existsSync(path.join(dryRoot, "a.js")), "a dry run deletes nothing");

	var emptyRoot = tree();
	du.empty(emptyRoot);
	t.ok(fs.existsSync(emptyRoot), "empty leaves the folder itself in place");
	t.ok(fs.readdirSync(emptyRoot).length === 0, "empty removes everything inside it",
		JSON.stringify(fs.readdirSync(emptyRoot)));

	var gone = tree();
	du.remove(gone);
	t.ok( ! fs.existsSync(gone), "remove takes the folder itself as well");

	// ------------------------------------------------------------------
	t.section("fileutils: read and write");
	// ------------------------------------------------------------------
	var fdir = t.tmp();
	var target = path.join(fdir, "written.txt");

	fu.write(target, "first");
	t.ok(fu.read(target) === "first", "write then read round-trips");

	fu.write(target, "second");
	t.ok(fu.read(target) === "second", "write overwrites rather than appending");

	fu.save(target, "third");
	t.ok(fu.open(target) === "third", "save and open are aliases for write and read");

	t.ok(fu.read(path.join(fdir, "missing.txt")) === false,
		"reading a missing file returns false rather than throwing");

	t.ok(fu.exists(target) === true, "exists is true for a file");
	t.ok(fu.exists(fdir) === true, "exists is also true for a folder, as documented");
	t.ok(fu.exists(path.join(fdir, "nope")) === false, "exists is false for nothing at all");

	// ------------------------------------------------------------------
	t.section("fileutils: copy and remove");
	// ------------------------------------------------------------------
	var dest = path.join(fdir, "copy.txt");
	fu.copy(target, dest);
	t.ok(fu.read(dest) === "third", "copy duplicates the contents");

	// Copying onto a folder puts the file inside it, keeping its name.
	var intoDir = path.join(fdir, "inside");
	du.make(intoDir);
	fu.copy(target, intoDir);
	t.ok(fs.existsSync(path.join(intoDir, "written.txt")),
		"copying to a folder keeps the original filename",
		JSON.stringify(fs.readdirSync(intoDir)));

	t.ok(fu.copy(path.join(fdir, "missing.txt"), dest) === false,
		"copying a missing source returns false rather than throwing");

	fu.remove(dest);
	t.ok( ! fs.existsSync(dest), "remove deletes the file");
};
