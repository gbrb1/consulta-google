const express = require('express')
const fetch = require('node-fetch');
const APIKEY = "INSIRA A SUA APIKEY" 
const idioma = {
    Arabic : "lang_ar", Bulgarian : "lang_bg",Catalan : "lang_ca",Czech : "lang_cs",Danish : "lang_da",German : "lang_de",Greek : "lang_el",English : "lang_en",Spanish : "lang_es",
    Estonian : "lang_et",  Finnish : "lang_fi",French : "lang_fr", Croatian : "lang_hr", Hungarian : "lang_hu", Indonesian : "lang_id",Icelandic : "lang_is", Italian : "lang_it", 
    Hebrew : "lang_iw",Japanese : "lang_ja",Korean : "lang_ko",Lithuanian : "lang_lt",Latvian : "lang_lv",Dutch : "lang_nl",Norwegian : "lang_no",Polish : "lang_pl",Portuguese : "lang_pt",
    Romanian : "lang_ro",Russian : "lang_ru",Slovak  :"lang_sk",Slovenian : "lang_sl",Serbian : "lang_sr",   Swedish: ":lang_sv", Turkish: "lang_tr"
}
const app = express()
 app.get('/consulta', (req, res) => {
    let pesquisa = req.query.pesquisa;
    let lingua = req.query.lingua; //em ingles
    let dataInicio = req.query.dataInicio; //&sort=date:r:20180815:20180931 padrão de data
    let dataFim = req.query.dataFim;
    let totalLinks = req.query.totalLinks; //limite entre 1 e 10 por pagina
    (async () => { 
        try {
     
        const resposta = await fetch('https://www.googleapis.com/customsearch/v1?key='+APIKEY+'&cx=70dfa122b7cf8a004&lr='+idioma[lingua]+'&q='+pesquisa+'&sort=date:r:'+dataInicio+':'+dataFim+'&num='+totalLinks);
          console.log('Status Code:', resposta.status);
           const jsonResponse = await resposta.json();
           
           const respostaFinal = jsonResponse.items.map(item =>{
               return item.link
            })
           
            return res.json(respostaFinal)   
        
        } catch (err) {
          console.log(err.message); 
          console.log(err.message.errors)
        }
      })();
})
app.listen(3333)