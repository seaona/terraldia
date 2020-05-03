//MODULE DEPENDENCIES
const express = require("express");
const router = express.Router();
const request = require("request");


//API INTERACTION: Registre de test de COVID-19 realitzats a Catalunya
const TerrassaA = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa A';
const TerrassaB = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa B';
const TerrassaC = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa C';
const TerrassaD = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa D';
const TerrassaE = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa E';
const TerrassaF = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?absdescripcio=Terrassa F';

const districtsUrls = [TerrassaA, TerrassaB, TerrassaC, TerrassaD, TerrassaE, TerrassaF];

//ROUTES
router.get("/", function(req,res){

  //TOTALS: Variables Totals Terrassa
  var totalPositiusDones = 0;
  var totalSospitososDones = 0;
  var totalPositiusHomes = 0;
  var totalSospitososHomes = 0;
  
  //QUERY PARAMS: si no tenim paràmetres, mostrarem les últimes dades disponibles (2 dies anteriors)
  if(!req.query.data){
  
    //Data 
    var data = new Date();
    data.setDate(data.getDate()-2);
    var dd = String(data.getDate()).padStart(2, '0');
    var mm = String(data.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = data.getFullYear();
    data = dd + '-' + mm + '-' + yyyy;
    dataAPI = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';
    
    getApiData();
    emplenarGrafic();
    
    async function getApiData(){

      totalPositiusDones = await getTotalPositiusDones();
      totalSospitososDones = await getTotalSospitososDones();
      totalPositiusHomes = await getTotalPositiusHomes();
      totalSospitososHomes = await getTotalSospitososHomes();
      res.render("landing", {data: data, totalPositiusDones: totalPositiusDones, totalSospitososDones: totalSospitososDones, totalPositiusHomes: totalPositiusHomes, totalSospitososHomes: totalSospitososHomes});
    }
  

    async function emplenarGrafic(){
      const inici = new Date("March 03, 2020 03:24:00") //YY MM DD 
      const avui = new Date();
      avui.setDate(avui.getDate()-2);
      var data = avui;
      const diferencia = parseInt((avui - inici) / (1000 * 60 * 60 * 24), 10);
      const datasetPositius = {"data": "", positius: ""};
      const datasetSospitosos = {data: "", sospitosos: ""};

      for(var i=0; i<diferencia; i++){
        data = avui.setDate(avui.getDate()-2-i);
        totalPositius = await getTotalPositiusDones(data) + await getTotalPositiusHomes(data);
        totalSospitosos = await getTotalSospitososDones(data) + await getTotalSospitososHomes(data);
        
        datasetPositius.append({data:data, positius:totalPositius});

      }
      
    }
 
    

    //TOTALS: Positius Dones
    function getTotalPositiusDones(){

      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === dataAPI){
                
                //Positius Dones
                if(json[i].sexedescripcio==="Dona" & json[i].resultatcoviddescripcio=="Positiu"){
                  totalPositiusDones = totalPositiusDones + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalPositiusDones);
        }, 1600);
      });  
    };  


    //TOTALS: Sospitosos Dones
    function getTotalSospitososDones(){
      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === dataAPI){
                //Sospitosos Dones
                if(json[i].sexedescripcio==="Dona" & json[i].resultatcoviddescripcio=="Sospitós"){
                  totalSospitososDones = totalSospitososDones + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalSospitososDones);
        }, 1600);
      });  
    }; 

    //TOTALS: Positius Homes
    function getTotalPositiusHomes(){
      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === dataAPI){
                
                //Positius Homes
                if(json[i].sexedescripcio==="Home" & json[i].resultatcoviddescripcio=="Positiu"){
                  totalPositiusHomes = totalPositiusHomes + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalPositiusHomes);
        }, 1600);
      });  
    }; 

      //TOTALS: Sospitosos Homes
      function getTotalSospitososHomes(){
        for(var i=0; i<6; i++){
          request({url: districtsUrls[i], json:true}, function(err, res, json){
            if (err) {
              throw err;
            } else {
              
              //Itera en les dades d'una certa regió
              for(var i=0; i<json.length; i++){
    
                //Filtra per data
                if(json[i].data === dataAPI){
                  
                  //Sospitosos Homes
                  if(json[i].sexedescripcio==="Home" & json[i].resultatcoviddescripcio=="Sospitós"){
                    totalSospitososHomes = totalSospitososHomes + parseInt(json[i].numcasos);
                  }
                }
              }
            }     
          }  
        )};
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(totalSospitososHomes);
          }, 1600);
        });  
      };
    }

  //QUERY PARAMS: si tenim paràmetres en la query, buscarem les dades referents a la data en concret
  else  {
    var data = req.query.data;
    
    //TOTALS: Variables Totals Terrassa
    var totalPositiusDones = 0;
    var totalSospitososDones = 0;
    var totalPositiusHomes = 0;
    var totalSospitososHomes = 0;

    if(validaData(data)){

    getApiData();
    
    async function getApiData(){
      totalPositiusDones = await getTotalPositiusDones();
      totalSospitososDones = await getTotalSospitososDones();
      totalPositiusHomes = await getTotalPositiusHomes();
      totalSospitososHomes = await getTotalSospitososHomes();

      res.render("landing", {data: data, totalPositiusDones: totalPositiusDones, totalSospitososDones: totalSospitososDones, totalPositiusHomes: totalPositiusHomes, totalSospitososHomes: totalSospitososHomes});
    }
  
    //TOTALS: Positius Dones
    function getTotalPositiusDones(){
      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === transformaData(data)){
                
                //Positius Dones
                if(json[i].sexedescripcio==="Dona" & json[i].resultatcoviddescripcio=="Positiu"){
                  totalPositiusDones = totalPositiusDones + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalPositiusDones);
        }, 1600);
      });  
    };  

    //TOTALS: Sospitosos Dones
    function getTotalSospitososDones(){
      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === transformaData(data)){
                //Sospitosos Dones
                if(json[i].sexedescripcio==="Dona" & json[i].resultatcoviddescripcio=="Sospitós"){
                  totalSospitososDones = totalSospitososDones + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalSospitososDones);
        }, 1600);
      });  
    }; 

    //TOTALS: Positius Homes
    function getTotalPositiusHomes(){
      for(var i=0; i<6; i++){
        request({url: districtsUrls[i], json:true}, function(err, res, json){
          if (err) {
            throw err;
          } else {
            
            //Itera en les dades d'una certa regió
            for(var i=0; i<json.length; i++){

              //Filtra per data
              if(json[i].data === transformaData(data)){
                
                //Positius Homes
                if(json[i].sexedescripcio==="Home" & json[i].resultatcoviddescripcio=="Positiu"){
                  totalPositiusHomes = totalPositiusHomes + parseInt(json[i].numcasos);
                }
              }
            }
          }     
        }  
      )};
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(totalPositiusHomes);
        }, 1600);
      });  
    }; 

      //TOTALS: Sospitosos Homes
      function getTotalSospitososHomes(){
        for(var i=0; i<6; i++){
          request({url: districtsUrls[i], json:true}, function(err, res, json){
            if (err) {
              throw err;
            } else {
              
              //Itera en les dades d'una certa regió
              for(var i=0; i<json.length; i++){
    
                //Filtra per data
                if(json[i].data === transformaData(data)){
                  
                  //Sospitosos Homes
                  if(json[i].sexedescripcio==="Home" & json[i].resultatcoviddescripcio=="Sospitós"){
                    totalSospitososHomes = totalSospitososHomes + parseInt(json[i].numcasos);
                  }
                }
              }
            }     
          }  
        )};
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(totalSospitososHomes);
          }, 1600);
        });  
      };
    }

    else {
      res.send("format incorrecte");
    };

      //Valida Data
      function validaData(data){
        var dataString = data;
        //Subdividim amb variables
        var dia = dataString.substr(0, 2);
        var mes = dataString.substr(3, 2);
        var any = dataString.substr(6, 8);
        
        var formatDiaCorrecte = false;
        var formatMesCorrecte = false;
        var formatAnyCorrecte = false;

        var formatCorrecte = false;
        //Validacions
          //Dia
        if(parseInt(dia) >0 && parseInt(dia)<31){
          formatDiaCorrecte = true;
        }
          //Mes
        if((parseInt(mes) >0 && parseInt(mes)<13)){
          formatMesCorrecte = true;
        }
          //Any
          if((parseInt(any) >2019 && parseInt(dia)<2023)){
            formatAnyCorrecte = true;
          }

          formatCorrecte = formatDiaCorrecte*formatMesCorrecte*formatAnyCorrecte;
          return formatCorrecte;
      }

    //Transforma el Format de la Data en termes de la API
    function transformaData(data){
      var dataString = data;
      //Subdividim amb variables
      var dia = dataString.substr(0, 2);
      var mes = dataString.substr(3, 2);
      var any = dataString.substr(6, 8);

      //Data amb el Format de la API
      var dataFormatada = any+"-"+mes+"-"+dia+"T00:00:00.000";
      return dataFormatada;
    }
  }
});

// ROUTES EXPORT
module.exports = router;