/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * Covers `src/extract.js`, the first stage of the pipeline.
 *
 * Everything downstream sees only what extract hands over, so a block that extract
 * misses is an entity that never existed. The cases that matter most are the ones where
 * something *looks* like a comment opener but is not -- a missed close swallows every
 * comment in the rest of the file.
 *
 * @module  suites/extract
 * @package test
 */

exports.name = "extract: comment blocks";

/**
 * @method  run
 * @param   {object} t - The harness.
 */
exports.run = function(t){

	var extract = t.src("extract");

	var OPEN  = t.OPEN;
	var CLOSE = t.CLOSE;

	/**
	 * @method  blocks
	 * @private
	 * @param   {array} lines - Source lines.
	 * @return  {array}       - The extracted comment blocks.
	 */
	function blocks(lines){
		return extract(lines.join("\n"));
	}

	// ------------------------------------------------------------------
	t.section("extract: the basics");
	// ------------------------------------------------------------------
	var one = blocks([
		"var x = 1;",
		OPEN,
		" * A description.",
		" * @method thing",
		" " + CLOSE,
		"function thing(){}"
	]);

	t.ok(one.length === 1, "finds a single block", JSON.stringify(one));
	t.ok(/A description\./.test(one[0].data), "keeps the description", one[0].data);
	t.ok(/@method thing/.test(one[0].data), "keeps the tags");
	t.ok(one[0].data.indexOf(OPEN) === -1, "strips the opening delimiter");
	t.ok(one[0].data.indexOf(CLOSE) === -1, "strips the closing delimiter");
	t.ok(one[0].data.indexOf("*") === -1, "strips the leading star of each line", one[0].data);

	// Line numbers are what the model.json "line" field and the source links are built
	// from, so they must be the real zero-based lines.
	t.ok(one[0].start === 1, "records the opening line", "got " + one[0].start);
	t.ok(one[0].end === 4, "records the closing line", "got " + one[0].end);

	var many = blocks([
		OPEN, " * @method a", " " + CLOSE,
		"function a(){}",
		OPEN, " * @method b", " " + CLOSE,
		"function b(){}",
		OPEN, " * @method c", " " + CLOSE
	]);
	t.ok(many.length === 3, "finds every block in a file", JSON.stringify(many.length));

	t.ok(blocks(["var x = 1;", "function y(){}"]).length === 0,
		"a file with no comments yields nothing");
	t.ok(extract("").length === 0, "an empty file yields nothing");

	// A plain /* block comment is not a /** doc comment.
	t.ok(blocks(["/" + "* not a doc comment *" + "/", "var x;"]).length === 0,
		"an ordinary block comment is not extracted");

	// ------------------------------------------------------------------
	t.section("extract: indentation and prefixes");
	// ------------------------------------------------------------------
	var indented = blocks([
		"\t" + OPEN,
		"\t * @method nested",
		"\t * Description.",
		"\t " + CLOSE
	]);
	t.ok(indented.length === 1, "an indented block is found");
	t.ok(/@method nested/.test(indented[0].data), "and its contents are readable",
		JSON.stringify(indented[0].data));

	// Code samples inside a comment must keep their relative indentation, or every
	// @example renders flat.
	var sample = blocks([
		OPEN,
		" * @example",
		" *",
		" * 		var x = 1;",
		" * 		if(x){ x++; }",
		" " + CLOSE
	]);
	t.ok(/\t\tvar x = 1;/.test(sample[0].data),
		"indentation inside a block is preserved", JSON.stringify(sample[0].data));

	// A line with no star prefix at all is still part of the block.
	var noStars = blocks([
		OPEN,
		"@method bare",
		"Some text.",
		CLOSE
	]);
	t.ok(noStars.length === 1 && /@method bare/.test(noStars[0].data),
		"lines without a star prefix are kept", JSON.stringify(noStars));

	// ------------------------------------------------------------------
	t.section("extract: openers that are not openers");
	// ------------------------------------------------------------------
	// An opener inside a string literal is code. Treating it as a comment leaves the
	// block "open" and swallows everything that follows.
	var inString = blocks([
		'var s = "' + OPEN + '";',
		OPEN,
		' * @method afterString',
		' ' + CLOSE
	]);
	t.ok(inString.length === 1, "an opener inside a string literal is not a comment",
		JSON.stringify(inString));
	t.ok(/@method afterString/.test(inString[0] ? inString[0].data : ""),
		"the comment after a string-literal opener still parses");

	var inLineComment = blocks([
		"// " + OPEN,
		OPEN,
		" * @method afterLineComment",
		" " + CLOSE
	]);
	t.ok(inLineComment.length === 1, "an opener inside a // line comment is not a comment",
		JSON.stringify(inLineComment));
	t.ok(/@method afterLineComment/.test(inLineComment[0] ? inLineComment[0].data : ""),
		"the comment after a commented-out opener still parses");

	// A "//" inside a string is not a line comment, so it must not hide a later opener.
	var slashInString = blocks([
		'var url = "http://example.com"; ' + OPEN + ' @method inline ' + CLOSE
	]);
	t.ok(slashInString.length === 1, "a // inside a string does not hide a later opener",
		JSON.stringify(slashInString));

	// Single quotes, backticks and escapes all count as string state.
	var quoteForms = blocks([
		"var a = '" + OPEN + "';",
		"var b = `" + OPEN + "`;",
		'var c = "\\"' + OPEN + '";',
		OPEN,
		" * @method survived",
		" " + CLOSE
	]);
	t.ok(quoteForms.length === 1, "single quotes, backticks and escapes all shield an opener",
		JSON.stringify(quoteForms));
	t.ok(/@method survived/.test(quoteForms[0] ? quoteForms[0].data : ""),
		"and the real comment is the one that is found");

	// ------------------------------------------------------------------
	t.section("extract: single-line blocks");
	// ------------------------------------------------------------------
	// Opened and closed on the same line: the block used to stay open and eat code.
	var oneLine = blocks([
		OPEN + ' @method oneLiner ' + CLOSE,
		'function oneLiner(){}',
		OPEN,
		' * @method second',
		' ' + CLOSE
	]);
	t.ok(oneLine.length === 2, "a single-line block closes on its own line",
		JSON.stringify(oneLine));
	t.ok(oneLine[0] && oneLine[0].data === "@method oneLiner",
		"a single-line block keeps only its own contents",
		oneLine[0] ? oneLine[0].data : "");
	t.ok(/@method second/.test(oneLine[1] ? oneLine[1].data : ""),
		"the block after a single-line block still parses");

	t.ok(oneLine[0].start === 0 && oneLine[0].end === 0,
		"a single-line block starts and ends on the same line");

	// ------------------------------------------------------------------
	t.section("extract: unterminated blocks");
	// ------------------------------------------------------------------
	// A block that is never closed cannot be emitted -- there is no end line. What
	// matters is that it does not throw and does not corrupt earlier results.
	var unterminated = blocks([
		OPEN, " * @method closed", " " + CLOSE,
		OPEN, " * @method neverClosed"
	]);
	t.ok(unterminated.length === 1, "an unterminated block is dropped, not guessed at",
		JSON.stringify(unterminated));
	t.ok(/@method closed/.test(unterminated[0].data), "and earlier blocks are unaffected");

	// ------------------------------------------------------------------
	t.section("extract: custom delimiters");
	// ------------------------------------------------------------------
	// The -a and -z flags are what make Documon work on languages that are not C-like.
	var lua = extract([
		"--[[",
		"A description.",
		"@method thing",
		"--]]",
		"function thing() end"
	].join("\n"), "--[[", "--]]");

	t.ok(lua.length === 1, "distinct custom delimiters are honoured", JSON.stringify(lua));
	t.ok(/@method thing/.test(lua[0].data), "and the contents come through", lua[0].data);
	t.ok(/A description\./.test(lua[0].data), "including the description");

	// Python-style, where the opening and closing delimiter are the same string.
	var py = extract([
		"def thing():",
		'    """',
		"    A description.",
		"    @method thing",
		'    """',
		"    pass"
	].join("\n"), '"""', '"""');

	t.ok(py.length === 1, "an identical begin and end delimiter still pairs up",
		JSON.stringify(py));
	t.ok(/@method thing/.test(py[0].data), "and the contents come through", py[0].data);
	t.ok(py[0].start === 1 && py[0].end === 4, "with the right line numbers",
		py[0].start + "-" + py[0].end);

	// When begin and end are the same string there is no way to tell an opener from a
	// closer, so content on the opening line is inherently ambiguous. Documon treats the
	// second occurrence as the close, which yields an empty block rather than a
	// runaway one -- the safe reading.
	var ambiguous = extract(["### @method inline", "###"].join("\n"), "###", "###");
	t.ok(ambiguous.length === 1 && ambiguous[0].data === "",
		"same-line content with identical delimiters closes empty rather than running away",
		JSON.stringify(ambiguous));

	// With a non-C opener, "//" carries no special meaning and must not end the scan.
	var hashAfterSlashes = extract([
		"x = '// not a comment'",
		"###",
		"@method stillFound",
		"###"
	].join("\n"), "###", "###");
	t.ok(hashAfterSlashes.length === 1 && /@method stillFound/.test(hashAfterSlashes[0].data),
		"// is not treated as a line comment for non-C delimiters",
		JSON.stringify(hashAfterSlashes));
};
