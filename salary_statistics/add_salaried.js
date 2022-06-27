class Salaried {
    constructor(name, profession, country, salary) {
        this.name = name;
        this.profession = profession;
        this.country = country;
        this.salary = salary;
    }
}
function addNewSalaried(){
    var newSalaried = AddSalariedInputs.getValuesAsObject()
    if (newSalaried.salary){
        DbSalaried.update(newSalaried)
        AddSalariedInputs.clear()
    }
    
}
var DbSalaried = { fields:[
                            new Salaried('Juan', 'farmer', 'mexico', '500'),
                            new Salaried('Jon', 'mechanic', 'colombia', '600'),
                            new Salaried('Math', 'chemistry', 'mexico', '700'),
                        ],
                    load: function(){
                        sessionStorage.setItem('db', JSON.stringify(this.fields))
                        this.loaded = true
                        
                    },
                    update : function(salaried){
                        this.fields = this.get_fields()
                        this.fields.push(salaried)
                        this.load()
                    },
                    get_fields: function(){
                      
                        var db = sessionStorage.getItem('db')
                        if (db){
                            return JSON.parse(db)
                        }
                        return this.fields
                    },
                    get_professions: function(){
                        let fields = this.get_fields()
                        let professions = new Set(fields.map((salaried)=> salaried.profession)) 
                        professions = Array.from(professions)
                        return professions
                    },
                    get_countries: function(){
                        let fields = this.get_fields()
                        let countries = new Set(fields.map((salaried)=>salaried.country))
                        countries = Array.from(countries)
                        return countries
                    }

}
const AddSalariedInputs = {
    name: document.getElementById('add-salaried__name'),
    country: document.getElementById('add-salaried__country'),
    profession: document.getElementById('add-salaried__profession'),
    salary: document.getElementById('add-salaried__salary'),
    button_new: document.getElementById('add-salaried__button-new'),
    clear: function(){
      this.name.value = '';
      this.country.value = '';
      this.profession.value = '';
      this.salary.value = ''; 
    },
    getName: function(){
        return this.name.value
    },
    getCountry: function(){
        return this.country.value
    },
    getProfession: function(){
    return this.profession.value
    },
    getSalary: function(){
        return this.salary.value
    },
    getValuesAsObject: function(){
        return new Salaried(this.getName(),
                            this.getProfession(),   
                            this.getCountry(),
                            this.getSalary(),
        )
    }
}
