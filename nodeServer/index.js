const fs=require('fs');
const io=require('socket.io')(8000,{
    cors:{
        origin:"*"
    }
});
io.on('connection',(socket)=>{
    socket.on("ask",()=>{
            var readStream=fs.createReadStream('a.txt',{
            encoding:'utf-8',
            });
            readStream.on("data",(chunk)=>{
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
        read.on("data",(chunk)=>{
            socket.emit('file-change',chunk);
        });
    });
    socket.on('add',(line)=>{
        var lin="\n"+line;
        fs.appendFileSync('a.txt',lin);
    });
});