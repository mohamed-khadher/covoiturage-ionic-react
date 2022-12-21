export const getDateFromLocaleString = (str : string) =>{
    const t = str.split(',');
    t[1] = t[1].trim()
    t[0] = t[0].split('/').reverse().join('-')
    return new Date(t[0] + "T" + t[1])
} 