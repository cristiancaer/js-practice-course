const salaryStatis = {
    selectElement : document.getElementById('salary-statis__select'),
    meanElement : document.getElementById('salary-statis__mean'),
    medianElement : document.getElementById('salary-statis__median'),
    modeElement : document.getElementById('salary-statis__mode'),
    best1Element : document.getElementById('salary-statis__best1'),
    optionListElement: document.getElementById('salary-statis__list-options'),
    filterByElement : document.getElementById('salary-statis__filter-by'),
    addOptionList : function(option){
        var new_option = document.createElement('option')
        new_option.value = option
        this.optionListElement.appendChild(new_option)
    },
    clearOptionList: function(){
       while (this.optionListElement.firstChild){
            this.optionListElement.removeChild(this.optionListElement.firstChild)
       }
    },
    updateListOptions: function(option){
        if (option){
            var functionGetOptions = listOptions[option]
            var new_options = functionGetOptions()
            new_options.forEach(element => {
                salaryStatis.addOptionList(element)
            })
        }
    },
    updateStatisCards: function(listSalaried){
        var salaries = listSalaried.map((salaried)=>parseInt(salaried.salary));
        var mean = getArithmeticMean(salaries);
        this.meanElement.innerText = mean.value;

        var median = getMedian(salaries);
        this.medianElement.innerText = median.value;

        var mode = getMode(salaries);
        this.modeElement.innerText = mode.value

        var sorted_salaries = salaries.sort((a,b)=> a-b);
        this.best1Element.innerText = sorted_salaries[sorted_salaries.length-1];
        

    }
}
function filterByCountry(list_salaried, country){
    return filterList = list_salaried.filter((salaried)=> salaried.country==country)
}
function filterByProfession(list_salaried, profession){
    return filterList = list_salaried.filter((salaried)=> salaried.profession==profession)
}
const filterOptions = {
    profession: filterByProfession,
    country: filterByCountry
}
const listOptions ={
    profession: ()=>DbSalaried.get_professions(),
    country: ()=> DbSalaried.get_countries(),
}
salaryStatis.selectElement.addEventListener('change',function(event){
    var option = event.target.value.toLowerCase();
    salaryStatis.clearOptionList();
    salaryStatis.updateListOptions(option);
})
salaryStatis.filterByElement.addEventListener('change',function(event){
    var filterBy = salaryStatis.selectElement.value;
    var functionFilter = filterOptions[filterBy];
    var optionToFilter = event.target.value.toLowerCase();
    var salaried = DbSalaried.get_fields();
    var salariedFiltered = functionFilter(salaried,optionToFilter);
    salaryStatis.updateStatisCards(salariedFiltered);
})

salaryStatis.filterByElement.addEventListener('click', function(event){
    event.target.value = ''
})