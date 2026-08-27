/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/markdown.js`, the showdown wrapper used for every comment description and
 * every file in the "more" folder.
 *
 * Two things here are Documon's own rather than showdown's: the markdown-extra definition
 * list extension, and the rewriting of JSDoc's `{@link}` syntax into a markdown link.
 * Those get the most attention; the rest is a sanity check that the converter is wired up
 * with the options the templates assume.
 *
 * @module  suites/markdown
 * @package test
 */

exports.name = "markdown: rendering";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var markdown = t.src("markdown");

	// ------------------------------------------------------------------
	t.section("markdown: the basics");
	// ------------------------------------------------------------------
	t.ok(/<strong>b<\/strong>/.test(markdown("**b**")), "bold", markdown("**b**"));
	t.ok(/<em>i<\/em>/.test(markdown("*i*")), "italic", markdown("*i*"));
	t.ok(/<h1/.test(markdown("# Heading")), "headings", markdown("# Heading"));
	t.ok(/<ul>[\s\S]*<li>a<\/li>/.test(markdown("- a\n- b")), "unordered lists",
		markdown("- a\n- b"));
	t.ok(/<ol>/.test(markdown("1. a\n2. b")), "ordered lists", markdown("1. a\n2. b"));
	t.ok(/<code>code<\/code>/.test(markdown("`code`")), "inline code", markdown("`code`"));
	t.ok(/<a href="y">x<\/a>/.test(markdown("[x](y)")), "links", markdown("[x](y)"));
	t.ok(/<blockquote>/.test(markdown("> quoted")), "blockquotes", markdown("> quoted"));

	// ------------------------------------------------------------------
	t.section("markdown: tables");
	// ------------------------------------------------------------------
	// The options folder page and the tag reference are both markdown tables, so the
	// tables option has to stay on.
	var table = markdown("| a | b |\n|---|---|\n| 1 | 2 |");
	t.ok(/<table>/.test(table), "tables are enabled", table);
	t.ok(/<th/.test(table) && /<td>1<\/td>/.test(table), "with headers and cells");

	// ------------------------------------------------------------------
	t.section("markdown: code blocks");
	// ------------------------------------------------------------------
	var indented = markdown("    var x = 1;");
	t.ok(/<pre><code>/.test(indented), "an indented block becomes a code block", indented);
	t.ok(/var x = 1;/.test(indented), "keeping its contents");

	var fenced = markdown("```\nvar x = 1;\n```");
	t.ok(/<pre><code>/.test(fenced), "a fenced block becomes a code block too", fenced);

	// Markdown inside a code block must not be interpreted.
	t.ok(markdown("    **not bold**").indexOf("<strong>") === -1,
		"markdown inside a code block is left alone", markdown("    **not bold**"));

	// ------------------------------------------------------------------
	t.section("markdown: definition lists");
	// ------------------------------------------------------------------
	// This is the markdown-extra extension wired in by Documon itself; the tag reference
	// pages rely on it.
	var defList = markdown("Term\n: The definition.");
	t.ok(/<dl>/.test(defList), "a definition list is recognised", defList);
	t.ok(/<dt>Term<\/dt>/.test(defList), "with its term");
	t.ok(/<dd>/.test(defList) && /The definition\./.test(defList), "and its definition");

	var twoDefs = markdown("One\n: First.\n\nTwo\n: Second.");
	t.ok((twoDefs.match(/<dt>/g) || []).length === 2, "several terms are handled",
		twoDefs);

	t.ok(markdown("Not a term. Just a sentence: with a colon.").indexOf("<dl>") === -1,
		"an ordinary colon does not create a definition list",
		markdown("Not a term. Just a sentence: with a colon."));

	// ------------------------------------------------------------------
	t.section("markdown: inline links from other doc systems");
	// ------------------------------------------------------------------
	// {@link} is JSDoc syntax. Without the rewrite it renders as literal braces in the
	// middle of a sentence, which is what people actually saw before.
	t.ok(/<a href="a\.B">a\.B<\/a>/.test(markdown("See {@link a.B}.")),
		"{@link} becomes a real link", markdown("See {@link a.B}."));
	t.ok(/<a href="a\.B">bee<\/a>/.test(markdown("See {@link a.B|bee}.")),
		"with its label when one is given", markdown("See {@link a.B|bee}."));
	t.ok(markdown("See {@link a.B}.").indexOf("{@link") === -1,
		"and no literal braces are left behind");

	// ------------------------------------------------------------------
	t.section("markdown: edge cases");
	// ------------------------------------------------------------------
	t.ok(markdown("") === "", "an empty string renders to nothing",
		JSON.stringify(markdown("")));
	t.ok(typeof markdown("plain") === "string", "plain text still renders");
	t.ok(/<p>plain<\/p>/.test(markdown("plain")), "wrapped in a paragraph",
		markdown("plain"));

	// Two calls must not interfere -- the converter is built per call, and definition
	// list state leaking between calls would corrupt later pages.
	markdown("Term\n: Definition.");
	t.ok(/<p>after<\/p>/.test(markdown("after")),
		"a plain string after a definition list is unaffected", markdown("after"));
};
