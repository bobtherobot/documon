/*
Part of Documon.
Copyright (c) Michael Gieson.
www.documon.net
 */

/**
 * A place to store text-heavy data for copyright and CLI usage information.
 *
 * @module  info
 * @package  documon
 */

var copyright = `
Documon - v${require("../package.json").version} - Copyright Mike Gieson. www.documon.net
`;

var usage = `
----------------
Documon -- CLI
----------------

Generates static, searchable documentation from source-code comments.
Documon infers nothing from your code: structure comes only from the tags you write.
Tag reference: TAGS.md (shipped with the package) or https://www.documon.net

USAGE
  documon [source] [output] [flags]
  documon --check [flags]

  First and second positional arguments are the input/output paths; flags trail.

PATHS
 -i, --src                 Input source file, or folder containing source files.
 -o, --out                 Output path. Created automatically if missing.
 -t, --template            Template folder path.
 -m, --more                "More docs" folder of additional markdown.
     --config              Path to a config file. When omitted, Documon looks for
                           documon.json, documon.config.json, .documonrc, or a
                           "documon" key in package.json, walking up from the cwd.

PROJECT
 -n, --name                Name of your project (shown on the home page).
 -v, --version             Version of your project (shown on the home page).
     --description         One-line project description (meta tags + llms.txt).
     --baseUrl             Public base URL, used to build absolute links in llms.txt.

PARSING
 -e, --sourceExt           Extension(s) to parse, space delimited (e.g. -e "js jsx php").
                           (default: js)
 -g, --ignore              Semicolon delimited list of files/folders to skip.
                           Substrings and simple globs both work.
 -a, --docBegin            Comment begin string. (default: /**)
 -z, --docEnd              Comment end string.   (default: */)

OUTPUT
 -l, --launch              Launch docs in the browser when done. (default: false)
 -p, --print               Print activity to the console. (default: false)
 -d, --dumpData            Dump intermediary data into the "docs/_data" folder.
 -x, --indexShortcutName   Index shortcut name. (default: __LAUNCH.html)
 -q, --moreQuirkDelimiter  Separator between "more" page numbering and the title.
 -y, --gati                Google Analytics Tracking ID.
     --no-emitLlms         Skip writing llms.txt / llms-full.txt.
     --no-emitModel        Skip writing model.json.

VALIDATE
     --check               Validate comments and exit. Writes nothing.
     --coverage            With --check, also report symbols that have no doc block.
     --strict              With --check, treat warnings as failures.
     --json                Emit machine-readable JSON instead of prose.
                           Works with --check and with a normal build.

OTHER
 -h, --help                This text.
     --version             Print the Documon version.

EXIT CODES
  0  success
  1  configuration error (nothing was built)
  2  --check found problems

EXAMPLES

  # Build a folder of sources into ./docs
  documon ./src ./

  # Name and version the project, and print progress
  documon -i ./src -o ./ -n "My Project" -v 1.0 -p

  # Parse something other than JavaScript
  documon ./src -e "h m cpp"

  # Validate before building, machine-readable
  documon --check --json -i ./src

  # Validate strictly, including undocumented symbols
  documon --check --strict --coverage -i ./src

`;


module.exports = {
	copyright : copyright,
	usage : usage
}
