// base url

let base_url;

let url_set = 1 ; // 1 untuk local

if(url_set == 1){
    base_url = "http://localhost:3000/contacts/"
}else{
    base_url = "https://ol4lkm2jzy.sse.codesandbox.io/contacts"
}


const request = (url, type,callback,data=null) => {

    if(type == "GET" || type == "DELETE"){
        const myAjax = new XMLHttpRequest()
        myAjax.open(type, url, true)
        myAjax.onreadystatechange = () => {
            if (myAjax.readyState === 4 && myAjax.status === 200) {
                callback(myAjax.response)
            }
        }
        myAjax.send();

    }else if(type == "POST" || type == "PATCH"){
        const myAjax = new XMLHttpRequest()
        myAjax.onload = () => {
            // if (this.readyState === 4 && this.status === 200) {
                callback(myAjax.response)
            // }
        }
        myAjax.open(type, url, true)
        myAjax.setRequestHeader('Content-Type',"application/json")
        myAjax.send(data);
        
    }

    
}

// Pencari with keyword
    document.getElementById("finder").addEventListener("change",function(){
      var keyword=document.getElementById("finder").value;
      var Table = document.getElementById("table-row");
      Table.innerHTML = "";
      
       request(base_url,"GET",(data)=>{
        // parsing dulu
        data = JSON.parse(data);
        console.log(data);
     
      view(search(data,keyword,y));

      function search(arr,keyword){
        return arr.filter(function(obj){
          return obj["fullName"].includes(keyword);
        });
        
      }
    })
//pencarian gender
const y = document.getElementById('pilihgender');
y.addEventListener('change', function() {
var x = y.value;

if (x == "Male") {
  let baru = contacts.filter(function(item) {
    return item.gender == "Male";
  });
  var Table = document.getElementById("table-row");
      Table.innerHTML = ""
  view(baru);
}else if (x == "Female") {
  let baru = contacts.filter(function(item) {
    return item.gender == "Female";
  });
  var Table = document.getElementById("table-row");
      Table.innerHTML = ""
  view(baru);
} else { 
   var Table = document.getElementById("table-row");
      Table.innerHTML = "";
      baru=contacts;
      view(baru);
};
}, false);
  });


// mengambil data
function view(contacts) {
  let tbody = document.getElementById("table-row");
  contacts.map((contacts, index) => {
    let row = tbody.insertRow();
    let id = row.insertCell(0);
    let fullName = row.insertCell(1);
    let phoneNumber = row.insertCell(2);
    let email = row.insertCell(3);
    let gender = row.insertCell(4);
   
    id.innerHTML = contacts.id;
    fullName.innerHTML = contacts.fullName;
    phoneNumber.innerHTML = contacts.phoneNumber;
    email.innerHTML = contacts.email;
    gender.innerHTML = contacts.gender;

    // membuat action
   let action = row. insertCell(5);
    var element1 = document.createElement("button");
    var element2 = document.createElement("button");
    element1.id = contacts.id;
    element1.innerHTML= "edit";
    element1.setAttribute("onclick", "editya(this.id)");
    element1.name = "edit";
    action.appendChild(element1);

    element2.id = contacts.id;
    element2.innerHTML= "delete";
    action.appendChild(element2);
    element2.name= "hapus";
    element2.setAttribute("onclick", "hapusya(this.id)");
  });
}

// Tombol Save , dapat berupa data baru atau edit data
document.getElementById("tombolku").addEventListener("click", function() { 

  if (document.getElementById("tombolku").name=="databaru"){ //seleksi apakah merupakan data baru
  const fullName1 = document.getElementById("fname");
  const phoneNumber1 = document.getElementById("pnumber");
  const email1 = document.getElementById("email");

  // buat data pada radio
  var gender1;
  if (document.getElementById("r1").checked) {
    gender1 = document.getElementById("r1");
  } else if (document.getElementById("r2").checked) {
    gender1 = document.getElementById("r2");
  }

  //mencari id terkecil yang belum ada
  //dengan cara menncari dengan nilai max[dari id yg sudah ada]
  var nameArray = contacts.map(function (el) { return el.id; });
  var cariid = contacts.map(function (el) { return el.id; });
  const idbaru= Math.max(...cariid)+1;

  const tambah = {
    id: idbaru,
    fullName: fullName1.value,
    phoneNumber: phoneNumber1.value,
    email: email1.value,
    gender: gender1.value
  };

  // Validation form
  if (
    fullName1.value.length == 0 ||
    phoneNumber1.value.length == 0 ||
    email1.value.length == 0 ||
    gender1.value.length == 0
  ) {
    alert("must be filled out");
    return false;
  } else {
    let contactsbaru = [...contacts, tambah];
     contacts= contactsbaru;
    document.getElementById("table-row").innerHTML = "";
    view(contacts);
  }

}
else{                                                         //Jika merupakan Edit data
  cariId= document.getElementById("tombolku").value;
  document.getElementById("tombolku").name="databaru"
  console.log(cariId)
  new1=contacts.find(hasil => hasil.id == cariId);
  new1.fullName = document.getElementById("fname").value;
  new1.phoneNumber = document.getElementById("pnumber").value;
  new1.email = document.getElementById("email").value;

  var gender1;
  if (document.getElementById("r1").checked) {
    gender1 = document.getElementById("r1").value;
  } else if (document.getElementById("r2").checked) {
    gender1 = document.getElementById("r2").value;
  }
  new1.gender = gender1;
   document.getElementById("table-row").innerHTML = "";
    view(contacts);
};
//set value input kosong
  document.getElementById("fname").value = "";
  document.getElementById("pnumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("r1").checked= false;
  document.getElementById("r2").checked =false;
  }
  );

//baru

// view
const tampil = ()=>{

    //jalankan ajax
    request(base_url,"GET",(data)=>{
        // parsing dulu
        data = JSON.parse(data);
        console.log(data)
        view(data);

    // end ajax
    })
// end view
}



// fungsi hapus dari tiap tombol hapus per data
window.hapusya = function(id){                                
    var new1= contacts.filter(hasil => hasil.id != id);       //hanya akan menyimpan data yang id nya tidak terhapus
    contacts= new1;
    document.getElementById("table-row").innerHTML = "";
    view(contacts)
      };


window.editya = function(id){
    var new1= contacts.filter(hasil => hasil.id == id);
    document.getElementById("fname").value= new1[0].fullName;
    document.getElementById("pnumber").value= new1[0].phoneNumber;
    document.getElementById("email").value= new1[0].email;
    document.getElementById("tombolku").value= new1[0].id;
    document.getElementById("tombolku").name= "gantidata";

    console.log(new1[0].gender);
    if (new1[0].gender == "Male"){
      document.getElementById("r1").checked = true;
    }else {
      document.getElementById("r2").checked=true;
    }   
};
  
tampil();
