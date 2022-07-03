Math.round10 = function(value, maxDecimals){
    base = 10**maxDecimals
    return this.round(value*base)/base
}
const basicStatisInputElement = document.getElementById('basic-statis__input-number');
const basicStatisListNumbersElement = {element:document.getElementById('basic-statis__list-numbers'),
                                    update: function(array){
                                        this.element.innerHTML =  `[${listValues}]`;
                                    },
                                    clear: function(){
                                        this.element.innerHTML = '[]';
                                    }

};

function CardElement(type){
    this.content = document.getElementById(`card__value-${type}`)
    this.info = document.getElementById(`card__info-${type}`)

    this.setContent = function(value){
        this.content.innerHTML = Math.round10(value,2)
    }

    this.setInfo = function(info){
        this.info.innerHTML = info
    }
    this.reset = function(){
        this.content.innerHTML = 'value'
        this.info.innerHTML = '[]'
    }
}

const cardMode = new CardElement('mode');
cardMode.update = function(array){
    let mode = getMode(array);
    this.setContent(mode.value);
    this.setInfo(`[f:${mode.frequency}]`);
}

const cardMean = new CardElement('mean');
cardMean.update = function(array){
    let mean = getArithmeticMean(array);;
    this.setContent(mean.value);
    this.setInfo(`[sum:${mean.sum}, n: ${mean.length}]`);
}
const cardMedian = new CardElement('median');
cardMedian.update = function(array){
    let median = getMedian(array);
    this.setContent(median.value);
    this.setInfo(`[items:${median.items}]`);
}

function updateStatisCards(array){        
    cardMean.update(array);
    cardMedian.update(array);
    cardMode.update(array);
}
var listValues = []

basicStatisInputElement.addEventListener('keyup', function(event){
    if(event.keyCode===13){
        listValues.push(parseInt(event.target.value));
        basicStatisInputElement.value = ''  ;
        basicStatisListNumbersElement.update(listValues);

        updateStatisCards(listValues)
    }
});

function resetBtn(){
    listValues = []
    basicStatisListNumbersElement.clear()
    cardMean.reset();
    cardMedian.reset();
    cardMode.reset();
}
resetBtn()
