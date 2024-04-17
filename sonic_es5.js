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
                        var pet1 = weight[x1];
                        var pet2 = weight[x2];
                        var pet3 = weight[x3];
                        var pet4 = weight[x4];
                        var pet5 = weight[x5];
                        var prices = calculateChance(u, pet1, pet1 + pet2, pet1 + pet2 + pet3, pet1 + pet2 + pet3 + pet4, pet1 + pet2 + pet3 + pet4 + pet5);

                        for (var x = 0; x < prices.length; x++) {
                            var xIndex = prices.indexOf(prices[x]);
                            prices[x] += tierOfPet(xIndex, tier, x1, x2, x3, x4, x5) + p_[tier-1];
                            if (prices[x] < min) {
                                petList = [];
                                min = prices[x];
                                var minIndex = xIndex;
                                if (minIndex >= 0) {
                                    petList.push(tier - x1);
                                }
                                if (minIndex >= 1) {
                                    petList.push(tier - x2);
                                }
                                if (minIndex >= 2) {
                                    petList.push(tier - x3);
                                }
                                if (minIndex >= 3) {
                                    petList.push(tier - x4);
                                }
                                if (minIndex >= 4) {
                                    petList.push(tier - x5);
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

function calculateChance(u, c1, c2, c3, c4, c5) {
    var a = [u, u, u, u, u];
    var s = [u, u, u, u, u];
    var c = [c1, c2, c3, c4, c5]
    
    for (var i = 0; i < 100; i++) {
      for (var j = 0; j < 5; j++) {
        a[j] *= 1.0 - c[j];
        s[j] += a[j];
      }
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
            p_[0] = 10 * (1 + p_[0] / 100);
        }


        i = 1;
        while (i <= 5) {
            tierMatrix(i);
            var j = 1;
            document.getElementById("Cost" + i + "-" + id).innerHTML = p_[i];
            while (j <= 5) {
                document.getElementById("FFs" + i + "_" + j + "-" + id).innerHTML = petList[j - 1];
                j++;
            }
            i++;
        }
    });
});
