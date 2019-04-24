var csv = require('fast-csv');
var fs = require('fs');
var fileHelper = require('./FileHelper');
var csvPath = "data/fileslist";
process.argv.forEach(function (val, index, array) {
    if (val.split('=')[1] !== undefined) {
        val = val.split('=')[1];
    }
    if (fileHelper.isFilePathCSV(val)) {
        try {
            var stats = fs.statSync(val);
            csvPath = val;
        }
        catch (err) {
            console.log("Arquivo " + val + " n\u00E3o existe.");
            process.exit();
        }
    }
});
var hasSamePath = function (path, pathCollection) {
    for (var index in pathCollection) {
        if (pathCollection[index] == path) {
            return true;
        }
    }
};
var retorno = [];
var csvStream = csv.fromPath(csvPath, { headers: true, objectMode: true })
    .on("data", function (data) {
    var dataItensPath = data.PATH.split('/');
    // dataItensPath.splice(-1,1)
    // let mkdirPath: string;
    // dataItensPath.forEach(element => {
    //     if(mkdirPath){
    //         mkdirPath = `${mkdirPath}/${element}`
    //     }else{
    //         mkdirPath = element
    //     }
    //     if(!hasSamePath(mkdirPath, retorno)){
    //         retorno.push(mkdirPath);
    //     }            
    // });
    retorno.push(data.PATH);
})
    .on("end", function () {
    var newCollection = [];
    for (var index in retorno) {
        newCollection.push("mv /f/TargetIT/aplicacao/netuno/" + retorno[index] + " /f/temp/entrega-240/" + retorno[index]);
        //newCollection.push(`mkdir ${retorno[index]}`)
    }
    var retornoString = newCollection.join("\n");
    console.log(retornoString);
});
