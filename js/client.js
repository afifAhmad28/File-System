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
    socket.emit("ask",()=>{
    });
}
socket.on("init",(data)=>{
    fileData.innerText=fileData.innerText+data;
});
socket.on("file-change",(data)=>{
    fileData.innerText=fileData.innerText+data;
});