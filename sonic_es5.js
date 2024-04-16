
var p2 = 0;
var p3 = 0;
var p4 = 0;
var p5 = 0;
var p6 = 0;

var u1 = 20;
var u2 = 50;
var u3 = 200;
var u4 = 300;
var u5 = 500;

var weight1 = [0.2];
var weight2 = [0.2, 0.08];
var weight3 = [0.2, 0.0333, 0.02];
var weight4 = [0.2, 0.0333, 0.02, 0.0133];
var weight5 = [0.2, 0.0333, 0.02, 0.0133, 0.0066];

var petList = [];

// Functions
function tierMatrix(p1, percentOrRSR, tier) {
    if (percentOrRSR == 1) {
        p1 = 10 * (1 + p1 / 100);
    }
    petList = [];
    var weight = [];
    eval("weight = weight" + tier);
    var u = 0;
    eval("u = u" + tier);
    var min = 999999999;
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
                            prices[x] += tierOfPet(prices.indexOf(prices[x]), tier, x1, x2, x3, x4, x5) + returnPrice(0, tier);
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
    if (tier === 1) {
        p2 = min;
    } else if (tier === 2) {
        p3 = min;
    } else if (tier === 3) {
        p4 = min;
    } else if (tier === 4) {
        p5 = min;
    } else if (tier === 5) {
        p6 = min;
    }
}

function calculateChance(u, c1, c2, c3, c4, c5) {
    var a5 = u;
    var a4 = u;
    var a3 = u;
    var a2 = u;
    var a1 = u;
    var s5 = u;
    var s4 = u;
    var s3 = u;
    var s2 = u;
    var s1 = u;
    for (var i = 0; i < 100; i++) {
        // 5 pets
        a5 *= 1.0 - c5;
        s5 += a5;
        // 4 pets
        a4 *= 1.0 - c4;
        s4 += a4;
        // 3 pets
        a3 *= 1.0 - c3;
        s3 += a3;
        // 2 pets
        a2 *= 1.0 - c2;
        s2 += a2;
        // 1 pets
        a1 *= 1.0 - c1;
        s1 += a1;
    }
    return [s1, s2, s3, s4, s5];
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
    if (tier - x === 1) {
        return p1;
    }
    if (tier - x === 2) {
        return p2;
    }
    if (tier - x === 3) {
        return p3;
    }
    if (tier - x === 4) {
        return p4;
    }
    if (tier - x === 5) {
        return p5;
    }
}

// jQuery ready function
$(document).ready(function() {
    var i = 1;
    var length = document.querySelectorAll('.FormulaTable').length;
    while (i <= length) {
        $("span#NumBox-" + i).html('<input onClick="this.select();" type="number" value="0" class="Num oo-ui-inputWidget-input"></input>');
        $("span#TypeBox-" + i).html('<select class="Type oo-ui-dropdownWidget-handle"><option value="1">%</option><option value="2">RSR</option></select>');
        i++;
    }
    $(".calcButton").click(function() {
        var id = this.id.substring(5);
        var p1 = parseInt($("#NumBox-" + id + " > .Num")[0].value);
        if (p1 < 0) {
            $("#NumBox-" + id + " > .Num")[0].value = 0;
        }
        var percentOrRSR = parseInt($("#TypeBox-" + id + " > .Type")[0].value);
        i = 1;
        while (i <= 5) {
            tierMatrix(p1, percentOrRSR, i);
            var j = 1;
            document.getElementById("Cost" + i + "-" + id).innerHTML = eval("p" + (i + 1));
            while (j <= 5) {
                document.getElementById("FFs" + i + "_" + j + "-" + id).innerHTML = petList[j - 1];
                j++;
            }
            i++;
        }
    });
});
