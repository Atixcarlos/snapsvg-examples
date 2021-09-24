
window.onload = function () {
    var selectedWall;
    
    var mySVG = document.getElementById("svgDiv");
    var s = Snap(mySVG);
    s.attr({ viewBox: "0 0 600 600" });

    Snap.load("svg.svg", onSVGLoaded ) ;

    function onSVGLoaded( data ){ 
        s.append( data );
        /*myWall= data.select("#wallN");*/
        data.selectAll('g > *')
        .forEach( function( el ) {
            el.mouseover(function() {
                this.animate({opacity: 0.6}, 200);
            }).mouseout(function() {
                this.animate({
                    opacity: 1
                }, 200);
            });
            el.click(function(){
                selectedWall = el;
                alert(el.node.getAttribute('xlink:href'));
                s.selectAll(".active-svg").forEach(element => element.removeClass("active-svg"));
                el.addClass("active-svg");
            });
        });
        
    }
    // Gets a reference to the form element
    var frmWindowDoors = document.getElementById('frmWindow&Doors');
    
    // Adds a listener for the "submit" event.
    frmWindowDoors.addEventListener('submit', function(e) {
        if(selectedWall) {
            // Borrar si en el muro seleccionado hay otras ventanas o puertas
            // (por el momento identificamos estos con cicle tag)
            selectedWall.parent().selectAll('circle').forEach(element => element.remove());
            
            // Declare variables.
            let x1 = parseInt(selectedWall.attr('x1'));
            let y1 = parseInt(selectedWall.attr('y1'));
            let x2 = parseInt(selectedWall.attr('x2'));
            let y2 = parseInt(selectedWall.attr('y2'));

            var NRsmWindows = parseInt(frmWindowDoors.txtSmallWindows.value) || 0;
            var NRmdWindows = parseInt(frmWindowDoors.txtMediumWindows.value) || 0;
            var NRlgWindows = parseInt(frmWindowDoors.txtLargeWindows.value) || 0;
            var NRDoors = parseInt(frmWindowDoors.txtDoors.value) || 0;

            let myNrObjetos = NRsmWindows + NRmdWindows + NRlgWindows + NRDoors;
            let espaceX = (x2 - x1) / (myNrObjetos + 1);
            let espaceY = (y2 - y1) / (myNrObjetos + 1);

            let pointx = x1;
            let pointy = y1;
    
            let myGroup = selectedWall.parent();

            for (let i = 0; i < NRsmWindows; i++) {
                pointx += espaceX;
                pointy += espaceY;
                myGroup.add(s.circle(pointx, pointy, 10 ).attr({stroke: '#6ac4fc', fill: "#fff", strokeWidth: '4px'}));
            }

            for (let i = 0; i < NRmdWindows; i++) {
                pointx += espaceX;
                pointy += espaceY;
                myGroup.add(s.circle(pointx, pointy, 15 ).attr({stroke: '#6ac4fc', fill: "#fff", strokeWidth: '4px'}));
            }

            for (let i = 0; i < NRlgWindows; i++) {
                pointx += espaceX;
                pointy += espaceY;
                myGroup.add(s.circle(pointx, pointy, 20 ).attr({stroke: '#6ac4fc', fill: "#fff", strokeWidth: '4px'}));
            }

            for (let i = 0; i < NRDoors; i++) {
                pointx += espaceX;
                pointy += espaceY;
                myGroup.add(s.circle(pointx, pointy, 15 ).attr({stroke: '#a87332', fill: "#fff", strokeWidth: '4px'}));
            }
           
        } else{
            alert("please select a wall");
        }
        

        e.preventDefault();
    
    });
};
