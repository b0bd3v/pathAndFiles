const csv = require('fast-csv')
const fs = require('fs')
const fileHelper = require('./FileHelper')

let csvPath = "data/fileslist"

process.argv.forEach(function(val, index, array) {
	
	if( val.split('=')[1]  !== undefined ){
		val = val.split('=')[1]
	}
	
	if(fileHelper.isFilePathCSV(val)){
		try {
			var stats = fs.statSync(val)
			csvPath = val
		}
		catch(err) {
			console.log(`Arquivo ${val} não existe.`)
			process.exit()
		}
	}

});

const hasSamePath = (path, pathCollection) => {

    for ( const index in pathCollection ){
        if(pathCollection[index] == path){
           return true
        }
    }
}

let retorno = []

let csvStream = csv.fromPath(csvPath, { headers: true, objectMode: true })
    .on("data", function(data: any) {
        let dataItensPath = data.PATH.split('/')
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
    .on("end", function() {
        let newCollection =  [] 

        for ( const index in retorno) {
            newCollection.push(`mv /f/TargetIT/aplicacao/netuno/${retorno[index]} /f/temp/entrega-240/${retorno[index]}`)
            //newCollection.push(`mkdir ${retorno[index]}`)
        }

        let retornoString = newCollection.join("\n")

        console.log(retornoString);
    });