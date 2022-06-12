// Arithmetic Mean
function getArithmeticMean(array){
    let sum = array.reduce((accumulator, element) => accumulator + element);
    let mean = {sum: sum,
            value: sum/array.length,
            length: array.length,
            };
    return  mean
}
// Median
function getMedian(array){
    let midIndex = Math.floor(array.length/2);
    let elements = [array[midIndex]]
    let isEven = array.length%2===0;
    if (isEven){
        elements.unshift(array[midIndex-1])
    }
    let median = {value: getArithmeticMean(elements).value,
                items: elements
                }
    return median
}
//  Mode
function countUniqueValues(array){
    let countValues = {}
    array.forEach(function(element){
        if (countValues[element]){
            countValues[element] += 1;
        }
        else{
            countValues[element] = 1;
        }
    })
    
    return countValues
}
function getMode(array){
   let uniqueValues = countUniqueValues(array)
    // sort by frequency
    let listCountValues = Object.entries(uniqueValues) // list of list, the inside list has [uniqueValue, valueFrequency]
    listCountValues = listCountValues.sort((listA, listB) => listA[1]-listB[1])
    modeInfo = listCountValues.pop()// get last list
    mode = {value : modeInfo[0],
        frequency: modeInfo[1]}
    return mode
}