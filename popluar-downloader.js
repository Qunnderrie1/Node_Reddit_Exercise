const fetch = require("isomorphic-fetch");
const fs = require("fs");
const { path , extname, join} = require("path");

let mediaExtensions = [".gif" , ".jpg", ".jpeg", ".png"]


// Fetching the article.
async function getArticles(){
    let res = await fetch("https://reddit.com/r/programmingHumor.json");
    let resBody = await res.json();
    resBody.data.children.forEach((post) =>{
        if(mediaExtensions.includes(extname(post.data.url))){
            downloadMedia(post.data.url , post.data.id);
        }
    })

}

async function downloadMedia(src, fileName){
    let res = await fetch(src);
    let resBody = await res.arrayBuffer();
    let filePath = join(__dirname , `./downloads/${fileName}.${extname(src)}`);
    console.log(res)

    fs.writeFile(filePath , Buffer.from(resBody) , (err) =>{
        if(err){
            throw new Error(`Failed to write ${fileName} to file.`);

        }else{
            console.log(`Successfully wrote ${fileName} to file.`)
        }
    })

}


try {

    getArticles();
    
} catch (err) {
    console.error(err)
}
