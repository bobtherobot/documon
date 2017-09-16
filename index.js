/*

# run
cd /Volumes/Drives/projects/documon
node .

cd /Volumes/Drives/projects/documon
node . /Volumes/Drives/projects/documon/test_src/jbeeb2 -q -l

cd /Volumes/Drives/projects/documon
node . /Volumes/Drives/projects/documon/documon/src -q -l -s="h m cpp"

cd /Volumes/Drives/projects/documon
node . /Volumes/Drives/projects/documon/documon/src -d

cd /Volumes/Drives/projects/documon
node . /Volumes/Drives/projects/documon/test_src/jbeeb2 -d -l

cd /Volumes/Drives/projects/documon
node . /Volumes/Drives/projects/documon/test_src/hmm -s "boob"

 */

// TOOD:
// - template css has a nowrap in a properties list
// - windows ie check


var fs = require("fs");
var path = require("./src/npath");
var log = require('./src/log');
var documon = require('./src/documon');
var info = require('./src/info');
//var mist = require('./src/minimist');

var errors = [];

function cli(){
    var argv = mist(process.argv.slice(2));

    var help = argv.h ? true : false;

    if (help) {

        log(info.usage);

        return null;

    } else {

        // Build array from semicolon delimted list of ignore files
        var ig = argv.g;
        if(ig){
            ig = ig.split(";");
            for(var i=0; i<ig.length; i++){
                ig[i] = ig[i].trim();
            }
        }

        run({
            src         : argv.i || argv._[0],
            out         : argv.o || argv._[1],
            template    : argv.t,
            print       : argv.p,
            name        : argv.n,
            ignore      : ig,
            version     : argv.v,
            launch      : argv.l,
            dumpData    : argv.d,
            sourceExt   : argv.e,
            more        : argv.m,
            docBegin    : argv.a,
            docEnd      : argv.z,
            indexShortcutName  : argv.x,
            moreQuirkDelimiter : argv.q,

        });
    }
}


function exists(fpath, kind) {
    var result = false;
    if (fpath) {
        fpath = path.resolve(fpath);
        if (!fs.existsSync(fpath)) {
            errors.push(kind + " doesn't exists: " + fpath);
        } else {
            result = true;
        }
    }
    errors.push(kind + " not specified.")
    return result;
}


function run(opts) {

    if( ! opts ){
    
        errors.push("No source defined.")
        log(errors, "Errors");
    
    } else {

        if(typeof opts === 'string'){
            opts = {
                src : opts
            }
        }

        var quiet = opts.print ? false : true;

        var src = opts.src;
        var out = opts.out;
        var template = opts.template;

        var inputOK;
        if( ! src ){
            inputOK = false;
        } else {
            if(typeof src == 'object'){
                for(var i=0; i<src.length; i++){
                    inputOK = exists(src[i], "Input folder");
                    if( ! inputOK ){
                        break;
                    }
                }
            } else {
                inputOK = exists(src, "Input folder");
            }
        }
            

        // Can be empty, but if set, ensure it exists.
        var outputOK = true;
        if (out) {
            outputOK = exists(out, "Output folder");
        }

        // Can be empty, but if set, ensure it exists.
        var templateOK = true;
        if (template) {
            templateOK = exists(template, "Template folder");
        }


        log(info.copyright, null, quiet);

        if (inputOK && outputOK && templateOK) {

            var conf = {
                src             : src,
                out             : out,
                template        : template,
                name            : opts.name,
                version         : opts.version,
                launch          : opts.launch,
                ignore          : opts.ignore,
                print           : opts.print,
                dumpData        : opts.dumpData,
                sourceExt       : opts.sourceExt,
                more            : opts.more,
                docBegin        : opts.docBegin,
                docEnd          : opts.docEnd,
                indexShortcutName   : opts.indexShortcutName,
                moreQuirkDelimiter  : opts.moreQuirkDelimiter
            };

            log(conf, "Config", quiet);

            documon.run(conf);


        } else {

            log(info.usage, null, quiet);
            log(opts, "Specified Options", quiet);
            log(errors, "Errors", quiet);

        }

    }

  
}

// -------------------------
// If running as CLI (direct access via shell):
// Note this is the same as in documon.js parallel to this file.
if (require.main === module) {
    cli();
}

// Expose "run" for running locally (as a require)
module.exports = run;
