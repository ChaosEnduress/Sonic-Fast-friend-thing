// ASCII art
//                                     ..,*///(/////((#%&&&&%(/,.                            
//                        ,*(((((/////////*****//(##&@@%*                         
//                    .*((((////*******////////******/(%&@&/                      
//                  *##(//*****,,,,,,,,,,******/(((/****/(#&@&/                   
//                ,##/****,,,,,,,,,..    .,  ..,*///((/*****/#&@#.                
//              .(%(***,,,,,,,,.        ./*.       .*((#(/****(#&&,               
//             *%#/**,,,,,,,            /(*,          .*(#(****/(%@(              
//           .(#/**,,,,,,,             *#/**,            *##/****/#&&,            
//           *#/**,,,,,,.             .##***,.            ,(#(****/(%&/           
//           (#/**,,,,,.             .(%(****,.            ./%#/***/(%(.          
//          ,#(**,,,,*,  ,////////////##/***************,,,,,(%(****/##,          
//         .(#/**,,***,     *(((//////(#****//////***,,,,.   *%#*****/(*          
//         ,%(********.       ./(((((///****,,,,,,,,,,.      .#%/*****//.        
//         .(#******//,          ,/((%(***,,,,,,,,,.         ./%#******/,        
//          *#/*****/#(.          /%#/,,/(*******,           ,#%(*******.        
//          .#(*****/#%*         *%#*,,,,/((*****,.          /%#/*,,***,         
//           /#/****/(##*       ,#(,,,,,,,*((/****,         .#%(*,,,,*,.          
//           .((/*****(#&(     .#(,,,,.     ./((***,       ,(%#/*,,,,,.           
//             /#/*****/#&&,   //,,.           ./(*,.     /#%#/*,,,,,,.           
//              ,#(*****/(%@&/..                  .**   ,(##(**,,,,,,             
//                /#/*****/(#&@&/                    *//#%(/*,,,,,,.              
//                 ,(#//*****/(%&@@&#/*.      ...,*//#%#(/**,,,,,.                
//                   ./#(//******//((#####(//////(##(//***,,,,,.                    
//                      .*((///////////////((((((///***,,,,,,.                       
//                          ,//(((//////////////***,,,,,,,                           
//                              .,,********,,,,,,,,,,,.                              
//                                      ....                                                                            

// Converted ES5 code
// Variables
var p_ = [0, 0, 0, 0, 0, 0];

var u_ = [20, 50, 200, 300, 500];

var w_ = [
    [0.2],
    [0.2, 0.08],
    [0.2, 0.0333, 0.02],
    [0.2, 0.0333, 0.02, 0.0133],
    [0.2, 0.0333, 0.02, 0.0133, 0.0066]
  ];

var petList = [];

// Functions
function tierMatrix(tier) {
    var weight = w_[tier-1];
    var u = u_[tier-1];
    var min = Infinity;
    for (var x1 = 0; x1 < tier; x1++) {
        for (var x2 = 0; x2 < tier; x2++) {
            for (var x3 = 0; x3 < tier; x3++) {
                for (var x4 = 0; x4 < tier; x4++) {
                    for (var x5 = 0; x5 < tier; x5++) {

                        var petTier = [tier - x1, tier - x2, tier - x3, tier - x4, tier - x5];
                        var petWeight = [weight[x1], weight[x2], weight[x3], weight[x4], weight[x5]]

                        var sumTier = 0;
                        var sumWeight = 0;

                        var priceTier = [];
                        var priceWeight = [];

                        for(var i = 0; i < 5; i++){
                            sumWeight += petWeight[i];
                            priceWeight.push(sumWeight);
                            sumTier += p_[petTier[i] - 1];
                            priceTier.push(sumTier);
                        }

                        var prices = [];
    
                        for (var i = 0; i < 5; i++) {
                            prices[i] = (u + priceTier[i]) / priceWeight[i] + p_[tier-1];
                        }

                        for (var x = 0; x < 5; x++) {
                            if (prices[x] < min) {

                                min = prices[x];
                                petList = [];
                                for(var i = 0; i <= x; i++){
                                    petList.push(petTier[i]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    p_[tier] = Math.round(min);

}

function calculateChance(u, x, c1, c2, c3, c4, c5) {
    var s = [u, u, u, u, u];
    var c = [c1, c2, c3, c4, c5]
    
    for (var j = 0; j < 5; j++) {
        s[j] / c[j]
    }
    
    return s;
}

function tierOfPet(x, tier, x1, x2, x3, x4, x5) {
    if (x === 0) {
        return returnPrice(x1, tier);
    }
    if (x === 1) {
        return returnPrice(x1, tier) + returnPrice(x2, tier);
    }
    if (x === 2) {
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier);
    }
    if (x === 3) {
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier) + returnPrice(x4, tier);
    }
    if (x === 4) {
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier) + returnPrice(x4, tier) + returnPrice(x5, tier);
    }
}

function returnPrice(x, tier) {
    return p_[tier-x-1]
}

// jQuery ready function
$(document).ready(function() {
    // Your code here
    var i = 1;
    var length = document.querySelectorAll('.FormulaTable').length;
    while (i <= length) {
        $("span#NumBox-" + i).html('<input onClick="this.select();" type="number" value="0" class="Num oo-ui-inputWidget-input"></input>');
        $("span#TypeBox-" + i).html('<select class="Type oo-ui-dropdownWidget-handle"><option value="1">%</option><option value="2">RSR</option></select>');
        i++;
    }
    $(".calcFFRSR").click(function() {
        var id = this.id.substring(5);
        p_ = [0, 0, 0, 0, 0, 0];
        petList = [];

        p_[0] = parseInt($("#NumBox-" + id + " > input").val());
        if (p_[0] < 0) {
            $("#NumBox-" + id + " > input")[0].value = 0;
            p_[0] = 0;
        }

        var percentOrRSR = parseInt($("#TypeBox-" + id + " > select").val());
        if (percentOrRSR == 1) {
            if (p_[0] < 30) {
                p_[0] *= 3;
            }
            p_[0] = 10 / (p_[0] / 100);
        }

        i = 1;
        while (i <= 5) {
            tierMatrix(i);
            var j = 1;
            document.getElementById("Cost" + i + "-" + id).innerHTML = p_[i] + " RSR";
            while (j <= 5) {
                var pet = petList[j-1]
                var active = document.getElementById("FFs" + i + "_" + j + "-" + id)
                if (pet !== undefined){
                    if (pet === 1){
                        active.style.cssText = "color: white; ";
                    }
                    if (pet === 2){
                        active.style.cssText = "color: green; ";
                    }
                    if (pet === 3){
                        active.style.cssText = "color: dodgerblue; ";
                    }
                    if (pet === 4){
                        active.style.cssText = "color: blueviolet; ";
                    }
                    if (pet === 5){
                        active.style.cssText = "color: orange; ";
                    }
                    active.innerHTML = petList[j - 1] + " star";
                }
                j++;
            }
            i++;
        }
    });
});
