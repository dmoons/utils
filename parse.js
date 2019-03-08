var moment = require('moment');
var fs = require('fs');

// var day = moment("2019-12-25 12:13:14").unix();
// console.log(day);


function check_log(fileName)
{
	var content = fs.readFileSync(fileName, 'ascii').trim();
	var lines = content.split('\n');
	var cnt = 0;
	var previous = 0;
	for (var i = 0; i < lines.length; i++) {
	    var line = lines[i];
	    var seg = line.split(',');

	    if (seg[0].match(/2019-03-([0~3][7-9])\s+/)) {
	        //console.log(i, " - ts", seg[0]);
	        if (cnt++ > 0) {
	        	var ts = moment(seg[0]).unix();
	        	if (ts - previous > 10 * 60 + 30) {
	        		console.log("Warn: ts gap too big! at line", i + 1)
	        		console.log("pre: ", i-1, lines[i-1]);
	        		console.log("cur: ", i, lines[i]);
	        	}
	      		previous = ts;

	        } else {
	      		previous = moment(seg[0]).unix();
	        }
	    }
	}
}

const items = fs.readdirSync('.');
const files = items.filter(item => {
  //return fs.statSync(item).isDirectory()
  return fs.statSync(item).isFile()
})


for (var j = 0; j < files.length; j++) {
	if (files[j].match(/^0100.*log/)) {
		console.log("========Process ", files[j],  "============")
		check_log(files[j])
	}
}

/*

function usage() {
    console.log("\r\nUsage:\n");
    console.log("\t <fileName>\n");
}

var arg = process.argv.splice(2);
if (arg.length < 1) {
    usage();
    return;
}

check_log(arg[0]);
*/