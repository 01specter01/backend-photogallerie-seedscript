console.log(process.argv);
console.log(process.argv.includes("doNotDelete"));
console.log(
    "Count",
    process.argv[2] === "doNotDelete" ? undefined : +process.argv[2]
);
// process.argv is an property which returns an array containing command-line argument when Node.js was launched.
// array position [0] shows absolute pathname: /usr/local/bin/node.
// array position [1] shows path of JS: /Users/mjr/work/node/process-args.js
// array position [2] shows: !!first real output of property!! that is why we use it in the above code
