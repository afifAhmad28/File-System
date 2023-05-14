const fs=require('fs');
const io=require('socket.io')(8000,{
    cors:{
        origin:"*"
    }
});
io.on('connection',(socket)=>{
    socket.on("ask",()=>{
            console.log(x);
            var readStream=fs.createReadStream('a.txt',{
            encoding:'utf-8',
            });
            readStream.on("data",(chunk)=>{
                console.log("init",chunk);
                socket.emit('init',chunk);
            });
    });
    fs.watchFile('a.txt',{
        bigint:false,
        persistent:true,
        interval:1000
    },(curr,prev)=>{
        var read=fs.createReadStream('a.txt',{
            encoding:'utf-8',
            start:prev['size'],
            end:curr['size']
        });
        console.log("Hello");
        read.on("data",(chunk)=>{
            socket.broadcast.emit('file-change',chunk);
            console.log("change",chunk);
        });
    });
    socket.on('add',(line)=>{
        var lin="\n"+line;
        fs.appendFileSync('a.txt',lin);
    });
});