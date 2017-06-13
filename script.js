window.onload=function(){
     console.log('hello');
     var stack=[];
     var num=document.getElementById('string-text');
     var btn=document.getElementById('run');
     var list=document.getElementById('list');

     btn.onclick=function(){
     	var text=num.value;
        var listString="";
        var btnString="";
        list.innerHTML="";
        if (text!="") {
        	stack.push(text);
     	for(var i=stack.length-1;i>=0;i--){
               listString+="<li>"+stack[i]+"</li>";
          
     	}
     
         list.innerHTML=listString;
        

        }
       else{
        	list.innerHTML=listString;
        }
     
     }

     
}