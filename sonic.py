
a = """                             ..,*,.                                     
                           .,*///(/////((#%&&&&%(/,.                            
                        ,*(((((/////////*****//(##&@@%*                         
                    .*((((////*******////////******/(%&@&/                      
                  *##(//*****,,,,,,,,,,******/(((/****/(#&@&/                   
                ,##/****,,,,,,,,,..    .,  ..,*///((/*****/#&@#.                
              .(%(***,,,,,,,,.        ./*.       .*((#(/****(#&&,               
             *%#/**,,,,,,,            /(*,          .*(#(****/(%@(              
           .(#/**,,,,,,,             *#/**,            *##/****/#&&,            
           *#/**,,,,,,.             .##***,.            ,(#(****/(%&/           
           (#/**,,,,,.             .(%(****,.            ./%#/***/(%(.          
          ,#(**,,,,*,  ,////////////##/***************,,,,,(%(****/##,          
         .(#/**,,***,     *(((//////(#****//////***,,,,.   *%#*****/(*          
         ,%(********.       ./(((((///****,,,,,,,,,,.      .#%/*****//.        
         .(#******//,          ,/((%(***,,,,,,,,,.         ./%#******/,        
          *#/*****/#(.          /%#/,,/(*******,           ,#%(*******.        
          .#(*****/#%*         *%#*,,,,/((*****,.          /%#/*,,***,         
           /#/****/(##*       ,#(,,,,,,,*((/****,         .#%(*,,,,*,.          
           .((/*****(#&(     .#(,,,,.     ./((***,       ,(%#/*,,,,,.           
             /#/*****/#&&,   //,,.           ./(*,.     /#%#/*,,,,,,.           
              ,#(*****/(%@&/..                  .**   ,(##(**,,,,,,             
                /#/*****/(#&@&/                    *//#%(/*,,,,,,.              
                 ,(#//*****/(%&@@&#/*.      ...,*//#%#(/**,,,,,.                
                   ./#(//******//((#####(//////(##(//***,,,,,,.                 
                      .*((///////////////((((((///***,,,,,,.                    
                          ,//(((//////////////***,,,,,,,                        
                              .,,********,,,,,,,,,,,.                           
                                      ....                                      
                                            """
print (a)
print(" ")
print ("Welcome to the Fast Friend RSR Cost Calculator!")
print(" ")

p1 = float(input("Enter how many RSR an average Fast Friend costs (above 0), or enter the TOTAL % Chance you have at getting any Fast Friend (below 0: 69% = 0.69): "))

if p1<1:
    p1 = 10 * (1 + p1)
    
p2 = 0
p3 = 0
p4 = 0
p5 = 0

u1 = 20
u2 = 50
u3 = 200
u4 = 300
u5 = 500

weight1 = [0.2]
weight2 = [0.2, 0.08]
weight3 = [0.2, 0.0333, 0.02]
weight4 = [0.2, 0.0333, 0.02, 0.0133]
weight5 = [0.2, 0.0333, 0.02, 0.0133, 0.0066]

RED = '\033[31m'
RESET = '\033[0m'

def tierMatrix(u, tier, weight):
    min = 999999999
    petList = []
    global p2, p3, p4, p5
    for x1 in range(tier):
        for x2 in range(tier):
            for x3 in range(tier):
                for x4 in range(tier):
                    for x5 in range(tier):
                        pet1 = weight[x1]
                        pet2 = weight[x2]
                        pet3 = weight[x3]
                        pet4 = weight[x4]
                        pet5 = weight[x5]
                        prices = calculateChance(u, pet1, pet1 + pet2, pet1 + pet2 + pet3, pet1 + pet2 + pet3 + pet4, pet1 + pet2 + pet3 + pet4 + pet5)
                        for x in prices:
                            xIndex = prices.index(x)
                            x += tierOfPet(prices.index(x), tier, x1, x2, x3, x4, x5) + returnPrice(0, tier)
                            if x<min:
                                petList.clear()
                                min = x
                                minIndex = xIndex
                                if minIndex >= 0:
                                    petList.append(tier-x1)
                                if minIndex >= 1:
                                    petList.append(tier-x2)
                                if minIndex >= 2:
                                    petList.append(tier-x3)
                                if minIndex >= 3:
                                    petList.append(tier-x4)
                                if minIndex >= 4:
                                    petList.append(tier-x5)                               
    if tier == 1:
        p2 = min
    elif tier == 2:
        p3 = min
    elif tier == 3:
        p4 = min
    elif tier == 4:
        p5 = min             
    print("To level up", tier, "star fast friends, the best price you can get them for is", RED + str(round(min, 0)) + RESET, "red star rings.")
    print("You'll need to use", minIndex + 1, "pets:") 
    for i in range(len(petList)):
        print(petList[i], "star")   
    print(" ")                                   
    
def calculateChance(u,c1,c2,c3,c4,c5):
    a5 = a4 = a3 = a2 = a1 = s5 = s4 = s3 = s2 = s1 = u
    for i in range(100):
        # 5 pets
        a5 *= 1.0 - c5
        s5 += a5
        # 4 pets
        a4 *= 1.0 - c4
        s4 += a4
        # 3 pets
        a3 *= 1.0 - c3
        s3 += a3
        # 2 pets
        a2 *= 1.0 - c2
        s2 += a2
        # 1 pets
        a1 *= 1.0 - c1
        s1 += a1
    return [s1, s2, s3, s4, s5]

def tierOfPet(x, tier, x1, x2, x3, x4, x5):
    if x == 0:
        return returnPrice(x1, tier)
    if x == 1:
        return returnPrice(x1, tier) + returnPrice(x2, tier)
    if x == 2:
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier)
    if x == 3:
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier) + returnPrice(x4, tier)
    if x == 4:
        return returnPrice(x1, tier) + returnPrice(x2, tier) + returnPrice(x3, tier) + returnPrice(x4, tier) + returnPrice(x5, tier)
        
def returnPrice(x, tier):
    if tier - x == 1:
        return p1
    if tier - x == 2:
        return p2
    if tier - x == 3:
        return p3
    if tier - x == 4:
        return p4
    if tier - x == 5:
        return p5

tierMatrix(u1, 1, weight1)
tierMatrix(u2, 2, weight2)
tierMatrix(u3, 3, weight3)
tierMatrix(u4, 4, weight4)
tierMatrix(u5, 5, weight5)