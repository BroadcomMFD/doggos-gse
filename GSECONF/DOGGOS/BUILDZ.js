////////////////////////////////////////////////////////////////////////////////
// validate that the required version of bldz is installed
//require("./scripts/version").requires("1.24.3");

////////////////////////////////////////////////////////////////////////////////
// rule that groups everything under a single target "all"
genrule_usscmd({
    name: "all",
    exec: "",
    deps: [
        "//COBOL:all"
    ]
});

//Allocate VSAM for PROTSYM adsfa
genrule_script({
    name: "pPROTSYM_Alloc",
    script_file: "../../scripts/tb/protsym.js"
});

//initialize PROTSYM
genrule_script({
    name: "initPROTSYM",
    script_file: "../../scripts/tb/report.js"
})

// preprare PROTSYM
genrule_script({
    name: "in25cob2",
    script_file: "../../scripts/tb/in25cob2.js"
});