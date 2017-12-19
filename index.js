const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');
var recursive = require("recursive-readdir");

const dirName =  process.argv[2];

function ignoreFunc(file, stats) {
  return stats.isDirectory() && path.basename(file) == "node_modules" || stats.isDirectory() && path.basename(file) == ".git";
}
 
const ignore = [
	'*.dll',
	'*.pak',
	'.eslintrc',
	'.gitignore',
	'.npmignore',
	'.npmrc',
	'karma.conf.js',
	'LICENSE',
	'*.md',
	'*.ico',
	'*.sin',
	'*.xml',
	'*.config',
	'yarn.lock',
	'*.svg',
	'*.less',
	'*.json',
	'*.css',
	'*.crx',
	'*.pem',
	'*.png',
	'*.txt',
	'*.rar',
	'*.zip',
	'*.exe',
	'*.jpg',
	'*.gif',
	'*.woff',
	'*.ttf',
	'*.eot',
	'*.hbs',
	'*.cs',
	'*.sql',
	'*.resx',
	'*.csproj',
	'*.log',
	'*.sln',
	'.gitmodules',
	'.yarnrc',
	'*.pdf',
	'*.xls',
	'*.doc',
	'*.asax',
	'*.lic',
	'*.woff2',
	'*.nuspec',
	'*.xlsx',
	'*.targets',
	'*.tmp',
	ignoreFunc
]

recursive(dirName, ignore, function (err, files) {
	files.map(i => {
		execSync(`type ${i} | findstr /i /v "react" > ${i}.tmp`, {stdio:[0,1,2]});
		// execSync(`D:\\projects\\0.1.1\\gsar.exe -s"import React from '';" -r"import React from 'react';" -f ${i} ${i}.tmp`, {stdio:[0,1,2]});
		if (fs.existsSync(`${i}.tmp`)) {
   			execSync(`del ${i}`);
			execSync(`rename ${i}.tmp ${i.split('\\')[i.split('\\').length - 1]}`);
		}
  	})
});
