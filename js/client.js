const socket=io('http://localhost:8000');
var fileData=document.getElementById('text');
const form = document.getElementById('send-container');
const lineInput=document.getElementById('lineInp');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const line=lineInput.value;
    socket.emit('add',line);
    lineInput.value="";
});
if(fileData.innerText==""||fileData.innerText==null||fileData.innerText==" ")
{
    console.log("asked",fileData.innerText);
    socket.emit("ask",()=>{
    });
}
socket.on("init",(data)=>{
    console.log("init",fileData.innerText,"hell:",data);
    fileData.innerText=fileData.innerText+data;
});
socket.on("file-change",(data)=>{
    console.log("change",fileData.innerText,"hell",data);
    fileData.innerText=fileData.innerText+data;
});