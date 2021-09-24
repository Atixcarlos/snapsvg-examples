function Get(url){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var my_response = JSON.parse(Get("mj8data.json"));

for (let i = 0; i < my_response.collectionItems.length; i++) {
    let mySvg = my_response.collectionItems[i].resourceData.svg;

    var s = Snap(600, 600);
    s.attr({ viewBox: "0 0 600 600" });
    let myDecodedSVG = atob(mySvg);
    console.log(myDecodedSVG);
    var snip = Snap.parse(myDecodedSVG);
    s.append(snip);
}

