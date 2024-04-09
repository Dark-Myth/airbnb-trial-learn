import countries from "world-countries";

const countriesFormated = countries.map((item) => ({
    value: item.cca2,
    label: item.name.common,
    flag: item.flag,
    latLang: item.latlng,
    region: item.region,
    })
);





//The one below is a hook that will be used to get all the countries
export const useCountries = () => {
    const getAllCountries = () => countriesFormated;
    //maybe from the getAllCountries function we can get the countries and then filter them by region then pass it to the below function to get it's next values dynamically
    const getCountryByValue = (value:string)=>{
        return countriesFormated.find((item)=> item.value === value);
        // geting value from params
    };

    return{
        getAllCountries,
        getCountryByValue
    }
};

