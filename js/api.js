function xhr(url,callback){
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && xhr.status===200){
            let data=xhr.responseText;
            data=JSON.parse(data);
            callback(data);
            
        }
    }
    xhr.open('GET',url,true);
    xhr.send();
}

