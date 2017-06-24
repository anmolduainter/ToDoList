/**
 * Created by anmol on 23/6/17.
 */
window.onload=function(){

    let arr=[];

    let item=document.getElementById('newItem');
    let btn=document.getElementById('btn');
    let unorderlist=document.getElementById('list');
    let delallBtn=document.getElementById("del-all");

    retrieve();

    // Array.prototype.swap=function(old_index,new_index){
    //     let a=this[old_index];
    //     this[old_index]=this[new_index];
    //     this[new_index]=a;
    // };



    delallBtn.onclick=function(){
              delAll();
    };

    btn.onclick=function () {
        let value=item.value;
        addAndSave(value);
    };

    function addintoList(value,itemindex){

        //console.log(itemindex);

        let list=document.createElement("li");
        list.setAttribute("data-id",itemindex);
        list.setAttribute("class","list-group-item");
        let inputCheckBox=document.createElement("input");
        let label=document.createElement("label");
        let deleteBtn=document.createElement("button");
        let upBtn=document.createElement("button");
        let downBtn=document.createElement("button");
        inputCheckBox.setAttribute("aria-label","Checkbox for following text input");
        inputCheckBox.setAttribute("type","checkbox");
        inputCheckBox.setAttribute("data-id-check",itemindex);
        upBtn.setAttribute("data-id-up",itemindex);
        downBtn.setAttribute("data-id-down",itemindex);
        label.setAttribute("for","data-id-check");
        //list.innerText=value;
        label.innerText=value;
        if (arr[itemindex].done===true){
              label.style.textDecoration='line-through';
              inputCheckBox.checked=true;
        }
        //inputCheckBox.addEventListener('change',checkbox);
        inputCheckBox.onchange=function(){
          if (this.checked){
              checkbox(this)
          }
          else{
            checkbox(this)
          }
        };
        list.appendChild(inputCheckBox);
        list.appendChild(label);
        upBtn.innerText="up";
        downBtn.innerText="down";
        deleteBtn.innerText="Delete";
        deleteBtn.setAttribute("data-id-del",itemindex);
        deleteBtn.setAttribute("class","btn btn-danger");
        deleteBtn.addEventListener('click',delbtn);
       // console.log(itemindex==0 );
        if (itemindex==0 && itemindex!=(arr.length-1)){
           //console.log("hello")
           list.appendChild(downBtn)
       }
       else if(itemindex==(arr.length-1) && itemindex!=0){
           list.appendChild(upBtn)
       }
       else if(itemindex==(arr.length-1) && itemindex==0){

        }
       else{
           list.appendChild(downBtn)
           list.appendChild(upBtn)
       }

       upBtn.addEventListener("click",up);
       downBtn.addEventListener("click",down);
        list.appendChild(deleteBtn);
        unorderlist.appendChild(list);
    }


    function up(event){
       let id=event.target.getAttribute("data-id-up");
       swap(arr,id,(id-1));
       save(arr);
       ArraytoList(arr);
    }

    function down(){
        let id=event.target.getAttribute("data-id-down");
        console.log(id);
        // swap(arr,id+1,id);
        // save(arr);
    }

    function swap(arr,old_index,new_index){
        let a=arr[old_index];
        arr[old_index]=arr[new_index];
        arr[new_index]=a;
    }

    function delbtn(event){

        let id=event.target.getAttribute("data-id-del");
        console.log(id);
        arr.splice(id,1);
        save(arr);
        ArraytoList(arr);

    }

    function checkbox(check){
        let id=check.getAttribute("data-id-check");
        console.log(id);
        arr[id].done=!arr[id].done;
        save(arr);
        ArraytoList(arr);
    }


    function save(arr){
        localStorage.setItem("todo",JSON.stringify(arr));
    }


    function addAndSave(value){

        arr.push({
            valueText:value,
            done:false
        });

        save(arr);

        ArraytoList(arr)

    }


    function ArraytoList(arr){

        unorderlist.innerHTML='';
        for(index in arr){
            addintoList(arr[index].valueText,index);
        }

    }


    function retrieve(){

       let retr=localStorage.getItem("todo");
       if (retr){
           arr=JSON.parse(retr);
           console.log(arr);
       }
       ArraytoList(arr);
    }


    function delAll(){

        if (arr.length==0){
             alert("There is nothing to be deleted");
        }
        else {
            if (confirm("Are you sure you want to delete?")) {
                localStorage.clear("todo");
                arr=[];
                ArraytoList(arr);
                alert("successfully deleted")
            }
        }

    }

};