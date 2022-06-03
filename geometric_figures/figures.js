function Rectangle(inputs){
    this.heigh = inputs.height.value;
    this.width = inputs.width.value;
    this.getArea = function(){
        return this.heigh*this.width
    }
    this.getPerimeter = function(){
        return 2*this.heigh+2*this.width
    }
}


function Triangle(inputs){
    this.base = inputs.base.value;
    this.sideA = inputs.sideA.value;
    this.sideB = inputs.sideB.value;

    this.getPerimeter = function(){
        return this.base + this.sideA + this.sideB
    }

    this.get_height = function(){
        // equilateral 
        if (this.base == this.sideA == this.sideB){ 
            return this.base*Math.sqrt(3)/2
        }
        // isosceles
        if (this.sideA==this.sideB){
            return Math.sqrt(this.sideA - (this.base/2)**2)
        }
        // scalene
        let semi_per = this.getPerimeter()
        return (2/this.base)*Math.sqrt(semi_per*(semi_per- this.base)*(semi_per-this.sideA)*(semi_per-this.sideB))
    }

    this.getArea = function(){
        return this.base*this.get_height()/2
    }
}


function Circle(inputs){
    this.radius = inputs.radius.value
    this.diameter = 2 * this.radius

    this.getPerimeter = function(){
        return this.diameter*Math.PI
    }
    this.getArea = function(){
        return Math.PI*this.radius**2
    }
}

function update_calculator(){
    figure = figuresMap[figureOption.value]
    calculator = new figure.cal_object(figure.inputs)
    return calculator
}

function getResultsBtn(){
    calculator = update_calculator()
    clearResult()
    const areaResult = document.getElementById('area-result')
    areaResult.value = calculator.getArea()
    const result = document.getElementById('perimeter-result')
    result.value = calculator.getPerimeter()
}


function showInputBlok(figure){
    clearOptions()
    figuresMap[figure].box.style.display = 'block'
}

function clearOptions() {
    for (let block_name in figuresMap) {
        figuresMap[block_name].box.style.display = 'None';
    }
}

function clearResult(){
    areaResult.value = undefined
    perimeterResult.value = undefined
}

// global bars
// triangle
const triangleBox = document.getElementById('triangle-inputs')
const triangleInputs = {base:document.getElementById('base'),
                        sideA:document.getElementById('side-a'),
                        sideB:document.getElementById('side-b')
                        }
// rectangle
const rectangleBox = document.getElementById('rectangle-inputs')
const rectangleInputs = {height:document.getElementById('height'),
                        width:document.getElementById('width'),
                    }
// circle
const circleBox = document.getElementById('circle-inputs')
const circleInputs = {radius:document.getElementById('radius')
                    }
//  hash map
var figuresMap ={triangle:{box:triangleBox, inputs: triangleInputs, cal_object:Triangle},
                    rectangle: {box:rectangleBox, inputs: rectangleInputs, cal_object:Rectangle},
                    circle: {box:circleBox, inputs: circleInputs, cal_object:Circle}
                }
// results
const areaResult = document.getElementById('area-result')
const perimeterResult = document.getElementById('perimeter-result')
var calculator 
               
 
// at change figure-option
const figureOption = document.getElementById('figure-option')
figureOption.addEventListener('change',(event)=>{
    this.selected  = true
    option = event.target.value
    showInputBlok(option)
    
    
})
// run 
function setup(){
    clearOptions()
    // show the first figure by default
    showInputBlok(figureOption.value)
    calculator = update_calculator()
}
setup()

