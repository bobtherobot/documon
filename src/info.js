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
Documon - version 0.1 - Copyright 2017 Mike Gieson. www.documon.net
`;

var usage = `
----------------
CLI Arguments
----------------

First and second arguments are reserved for input/output paths, flags trail.
index.js [source] [output] [flags]

Example:
index.js /path/to/source /path/to/output/folder -v 1.0

Explicitely set input/output paths
 -i Input source file, or folder containing source files.
 -o Output path.

Optional arguments
 -n Name of your project / docs 
        (displayed on the home page)
 -v Version of your project / docs
        (displayed on the home page)
 -t Template folder path
 -g A comma seperated list of files to ignore.
 -l Launch docs in browser when done 
        (default: false)
 -q Quit - don't print activity to the console (non-verbose). 
        (default: true)
 -e Extension(s) to parse. Space delimit multiple extensions,  
        (e.g. -s "js jsx php")
        (default: js)
 -d Dumps intermediary data into the "docs/_data" folder. 
        (default: false)
 -m More docs folder containing additional documentation.
 -a Comment begin string
 -z Comment end string
 -x Index shortcut name 
 		(default: __LAUNCH.html)
 -q More quirk delimiter. The character(s) use to seperate the "more" page numbering system from page titles.
 -y Google Analytics Tracking ID. If present pages will include tracking code.

----------------
Examples
----------------

# Build a single file. Builds docs into the "path" folder 
# at /path/docs <-- one level above the JS source location.
node ./documon.js "/path/to/foo.js"

# Builds docs from a folder. Builds docs into the "src" 
# folder at src/docs
node ./documon.js "/src/path"

# Specify output folder. Builds into docs folder at /output/path/docs
node ./documon.js "/src/path" "/output/path"

# Specify template folder and version
node ./documon.js "/src/path" "/output/path" -t "/template/path" -v 1.0

# Explicitly set input/output, template folder and version
node ./documon.js -i "/src/path" -o "/output/path" -t "/template/path" -v 1.0

# Set the type of source files to parse
node ./documon.js "/src/path" -e "h m cpp"

`;


module.exports = {
	copyright : copyright,
	usage : usage
}
