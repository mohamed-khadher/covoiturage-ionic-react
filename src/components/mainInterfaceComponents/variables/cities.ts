export const getCityTextFromValue = (value : string)=>{
  return cities.find((obj)=> {return obj.value === value})?.text;
}

const cities = [
    { text: "Ariana", value: "ariana" },
    { text: "Béja", value: "beja" },
    { text: "Ben Arous", value: "ben_arous" },
    { text: "Bizerte", value: "bizerte" },
    { text: "Gabès", value: "gabes" },
    { text: "Gafsa", value: "gafsa" },
    { text: "Jendouba", value: "jendouba" },
    { text: "Kairouan", value: "kairouan" },
    { text: "Kasserine", value: "kasserine" },
    { text: "Kébili", value: "kebili" },
    { text: "Kef", value: "kef" },
    { text: "Mahdia", value: "mahdia" },
    { text: "Manouba", value: "manouba" },
    { text: "Médenine", value: "medenine" },
    { text: "Monastir", value: "monastir" },
    { text: "Nabeul", value: "nabeul" },
    { text: "Sfax", value: "sfax" },
    { text: "Sidi Bouzid", value: "sidi_bouzid" },
    { text: "Siliana", value: "siliana" },
    { text: "Sousse", value: "sousse" },
    { text: "Tataouine", value: "tataouine" },
    { text: "Tozeur", value: "tozeur" },
    { text: "Tunis", value: "tunis" },
    { text: "Zaghouan", value: "zaghouan" },
  ];
export default cities;