

function filterSearchItems()
{
    let input,filter,ul,li,i,p,itemName,c;
    input=document.getElementById("myinput");
    filter=input.value.toLocaleLowerCase();
    ul=document.getElementById("myUl");
    li=ul.getElementsByTagName("li");

    for(i=0;i<li.length;i++)
    {
        p=li[i].getElementsByTagName("p")[0];
        c=li[i].getElementsByTagName("p")[2];
        itemName=p.innerHTMl || p.textContent;
        courseName=c.innerHTML || c.textContent;
        if(itemName.toLocaleLowerCase().indexOf(filter)>-1 || courseName.toLocaleLowerCase().indexOf(filter)>-1)
        {
            li[i].style.display="";
        }
        else
        { 
            li[i].style.display="none";

        }
    }
}



function filterSearchTables()
{
    let input,filter,ul,li,i,p,tablename;
    input=document.getElementById("tableSearch");
    filter=input.value.toLocaleLowerCase();
    ul=document.getElementById("mytables");
    li=ul.getElementsByTagName("li");

    for(i=0;i<li.length;i++)
    {
        p=li[i].getElementsByTagName("a")[0];
        tablename=p.innerHTMl || p.textContent;
        if(tablename.toLocaleLowerCase().indexOf(filter)>-1)
        {
            li[i].style.display="";
        }
        else
        { 
            li[i].style.display="none";

        }
    }
}

var table1=[];
var table2=[];
var table3=[];





function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("draggable element id="+ev.target.id);
    let price=document.getElementById(ev.target.id).querySelector("#food-price").innerHTML;
    console.log("price is "+price);
  }
  
  function drop(ev) {
    ev.preventDefault();



    let dragId = ev.dataTransfer.getData("text");
    let dropId=ev.target.id;



   let originaldata=document.getElementById(ev.target.id).querySelector("#total-price").innerHTML;
   let toAdd=document.getElementById(dragId).querySelector("#food-price").innerHTML;
   let totalprice=parseFloat(originaldata)+parseFloat(toAdd);


   let originalQuantity=document.getElementById(ev.target.id).querySelector("#quantity").innerHTML;
   let totalquantity=originalQuantity;

   

   if(dropId=="table1")
   {
       if(table1.includes(dragId)==false)
       {
         totalquantity=parseInt(originalQuantity)+1;
       }
       
       table1.push(dragId);
   }
   else if(dropId=="table2")
   {   
       if(table2.includes(dragId)==false)
       {
         totalquantity=parseInt(originalQuantity)+1;
       }
       table2.push(dragId);
   }
   else if(dropId=="table3")
   {
       if(table3.includes(dragId)==false)
       {
          totalquantity=parseInt(originalQuantity)+1;
       }
       table3.push(dragId);
   }

   document.getElementById(ev.target.id).querySelector("#total-price").innerHTML=totalprice;
   document.getElementById(ev.target.id).querySelector("#quantity").innerHTML=totalquantity;

    
  
}


function listItems(id)
{


   //calculating rows already present in the table
   let table = document.getElementById("table-table1");
   let rowCount = table.rows.length;
   //taking appropriate list based on id passed
   let tableid=[];
   if(id=='table1')
   {
       tableid=table1;
   }
   else if(id=='table2')
   {
       tableid=table2;
   }
   else if(id=='table3')
   {
       tableid=table3;
   }

   //delete already displayed rows
   for (let k = rowCount - 1; k> 1; k--) {
       table.deleteRow(k);
   }


   let set=new Set();
   let cost=0;

   document.getElementById("ModalTableID").innerHTML=id;

   //const rows=document.getElementById("listofitems");


   for(let itemid of tableid)
   {
       cost=cost+parseInt(document.getElementById(itemid).querySelector("#food-price").innerHTML);
       if(set.has(itemid))
       {
           continue;  //to avoid duplications
       }

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);  //insert a row at the end
    document.getElementById("itemIDHidden").innerHTML=itemid;


    console.log("item id set "+itemid);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5=row.insertCell(4);
       cell1.innerHTML=rowCount-1;
       cell2.innerHTML=document.getElementById(itemid).querySelector("#name").innerHTML;        
       cell3.innerHTML=document.getElementById(itemid).querySelector("#food-price").innerHTML;
       let q=getFreq(tableid,itemid);
       console.log("freq :"+q);
      // cell4.innerHTML= `<input id="quantInc" style="border:0;outline:0;border-bottom: 2px solid blue" type="number" min="1" max="100"  value="${q}" onchange="updateQuantity(document.getElementById('ModalTableID').innerHTML,document.getElementById('itemIDHidden').innerHTML,this.value)" >`;
      // cell5.innerHTML=`<i id="deleteicon" class="material-icons" onclick="deleteItem(document.getElementById('ModalTableID').innerHTML, document.getElementById('itemIDHidden').innerHTML)" type="button" >delete</i>`;
      
      let quant=document.createElement('input');
      quant.setAttribute("style","border:0;outline:0;border-bottom: 2px solid blue");
      quant.setAttribute("type","number");
      quant.setAttribute("min","1");
      quant.setAttribute("max","100");
      quant.setAttribute("value",q);
      let quantID="quantityID"+"-"+id+"-"+itemid;
      quant.setAttribute("id",quantID);
      quant.addEventListener("change",(event)=>
      {
          let targetElement=event.target;
          let tableID=event.target.id.split("-")[1];
          let itemID=event.target.id.split("-")[2];
          let newQuantity=document.getElementById(targetElement.id).value;

          console.log("from quantity event "+tableID+" "+itemID+" "+newQuantity);

          updateQuantity(tableID,itemID,newQuantity);
      })
      cell4.appendChild(quant);


      let delicon=document.createElement('i');
      delicon.setAttribute("class","material-icons");
      delicon.setAttribute("type","button");
      delicon.innerHTML="delete";
      let idForDelete="deleteicon"+"-"+itemid+"-"+id;  //oth element is deleteicon...1st element is itemid...2 nd element is tableid
      //console.log("id for delete for itemid "+itemid+" is "+idForDelete+" and tableid is "+id);
      delicon.setAttribute("id",idForDelete);
      delicon.addEventListener("click",(event)=>{
          let targetElement=event.target;
          let itemID=event.target.id.split("-")[1];
          let tableID=event.target.id.split("-")[2];
          deleteItem(tableID,itemID);
      })
      cell5.appendChild(delicon);




       set.add(itemid);
   }
   document.getElementById("total-bill").innerHTML=cost;
   document.getElementById(id).querySelector("#total-price").innerHTML=cost;


   

}

function update()
{
    var itemids=document.querySelectorAll('#itemIDHidden');
    var qids=document.querySelectorAll("#quantInc");

console.log("itemids "+itemids);
console.log("qids "+qids);
console.log(itemids.length);
console.log(qids.length);

for(let index=0;index<itemids.length;index++)
  console.log("itemids "+" "+itemids[index+1].innerHTML)

  for(let index=0;index<qids.length;index++)
  console.log("qids "+qids[index].value)

}
   


function getFreq(arr,value)
{
    let count=0;
    for(let val of arr)
    {
        if(val==value)
           count++;
    }
    return count;
}

function deleteItem(tableid,item)
{
   console.log("delete clicked "+tableid+"-"+item);
   if(tableid=='table1')
   {
       let modifiedcost=getTotalPriceAfterDeleting(table1,item);
       table1=deleteItemInd(table1,item);
       document.getElementById('table1').querySelector("#total-price").innerHTML=modifiedcost;
       var originalQuantity=document.getElementById('table1').querySelector("#quantity").innerHTML;
       document.getElementById('table1').querySelector("#quantity").innerHTML=originalQuantity-1
       listItems('table1');
   }
   else if(tableid=='table2')
   {
       let modifiedcost=getTotalPriceAfterDeleting(table2,item);
       table2=deleteItemInd(table2,item);
       document.getElementById('table2').querySelector("#total-price").innerHTML=modifiedcost;
       var originalQuantity=document.getElementById('table2').querySelector("#quantity").innerHTML;
       document.getElementById('table2').querySelector("#quantity").innerHTML=originalQuantity-1
       listItems('table2');
   }
   else if(tableid=='table3')
   {
       let modifiedcost=getTotalPriceAfterDeleting(table3,item);
       table3=deleteItemInd(table3,item);
       document.getElementById('table3').querySelector("#total-price").innerHTML=modifiedcost;
       var originalQuantity=document.getElementById('table3').querySelector("#quantity").innerHTML;
       document.getElementById('table3').querySelector("#quantity").innerHTML=originalQuantity-1
       listItems('table3');
   }
    
}
function getTotalPriceAfterDeleting(arr,item)
{
       let f=getFreq(arr,item);
       let itemprice=document.getElementById(item).querySelector("#food-price").innerHTML;
       let originalcost=document.getElementById("total-bill").innerHTML;
       let modifiedcost=originalcost-f*itemprice;

       return modifiedcost;
}
function deleteItemInd(arr,item)
{
    arr=arr.filter(function(x){
        return x!=item;
    });
    return arr;
}
function generatebill()
{
    $("#myModal").modal('hide');
    let totalbill= document.getElementById("total-bill").innerHTML;
    document.getElementById("totalbillcost").innerHTML=totalbill;
}
function emptyTable()
{
    console.log("empty table called");
    let tableidToClear=document.getElementById("ModalTableID").innerHTML;
    document.getElementById(tableidToClear).querySelector("#total-price").innerHTML="0.00";
    document.getElementById(tableidToClear).querySelector("#quantity").innerHTML=0;
    if(tableidToClear=='table1')
    {
        table1.length=0;
    }
    else if(tableidToClear=='table2')
    {
        table2.length=0;
    }
    else if(tableidToClear=='table3')
    {
        table3.length=0;
    }
}

function updateQuantity(tableid,itemid,newquantity)
{
      console.log("parameters called:"+tableid+" "+itemid+" "+newquantity);
      let ind=0;
       if(tableid=='table1')
       {
         ind=table1.indexOf(itemid);  
        table1= deleteItemInd(table1,itemid);  
       }
       else if(tableid=='table2')
       {
         ind=table2.indexOf(itemid);   
        table2=deleteItemInd(table2,itemid);
       }
       else if(tableid=='table3')
       {         
           ind=table3.indexOf(itemid);   
         table3= deleteItemInd(table3,itemid);
       }
       
     console.log("freq after deleting :"+getFreq(tableid,itemid));  
   for(let a=0;a<newquantity;a++)
   {
        if(tableid=='table1')
        {
           table1.splice(ind,0,itemid);
        }
       else if(tableid=='table2')
       {
           table2.splice(ind,0,itemid);
       }
       else if(tableid=='table3')
       {
           table3.splice(ind,0,itemid);
       }
   }
   console.log("freq after pushing :"+getFreq(table1,itemid));  

   listItems(tableid);
}





