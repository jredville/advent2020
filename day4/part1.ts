/** 
    byr(Birth Year)
    iyr(Issue Year)
    eyr(Expiration Year)
    hgt(Height)
    hcl(Hair Color)
    ecl(Eye Color)
    pid(Passport ID)
    cid (Country ID) ( optional )
 */
const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const load = async (file: string) => {
  const data = await Deno.readTextFile(file);
  return data.split("\n\n");
};
const valid = (passport: string) => {
  const keys: Array<string> = passport
    .split(/(?:\n| )/)
    .reduce((acc: Array<string>, data: string): Array<string> => {
      const key: string = data.split(":")[0];
      acc.push(key);
      return acc;
    }, []);

  return required.every((key: string) => keys.includes(key));
};

const data = await load(Deno.args[0]);
const validPassports = data.filter(valid);
console.log(validPassports.length);
