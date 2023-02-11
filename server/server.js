const fs = require("fs");
const { join } = require("path");
const path = require("path");
const http = require("http");


const filePath = join(__dirname, "./chirps.json");

const contents = [
    {
        "id": 1,
        "name": "John Smith",
        "age": 34
    },
     {
        "id": 2,
        "name": "Jane Doe",
        "age": 24
    },
     {
        "id": 3,
        "name": "Jerry Jones",
        "age": 44
    },
     {
        "id": 4,
        "name": "Larry Long",
        "age": 34
    },
     {
        "id": 5,
        "name": "Jasmine Mitten",
        "age": 74
    }
]

http.createServer((req, res) =>{

    // Write the array to a file in the root of the project called chirps.json
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(JSON.stringify(contents));

    // Add code to server.js that reads the file and outputs the chirps to the console.
    fs.readFile(path.join(__dirname , "/chirps.json"), "utf-8" , (err , data) =>{
        if(err){
            console.log(err);
        }else{
             // Always use the try and catch method when receiving JSON file.
            try{
                const JsonData =  JSON.parse(data);
                console.log(JsonData);
                
            } catch (err) {
                console.log("Failed to parse JSON file: " + err);
            }

        }
    })
}).listen(3000, () => {
    console.log("Server is running....")
})