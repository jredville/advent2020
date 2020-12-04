/** 
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
 */

interface Rule {
  key: string;
  valid: (arg0: string) => boolean;
}

const rules: Array<Rule> = [
  {
    key: "pid",
    valid: (value: string): boolean => {
      return /^\d{9}$/.test(value);
    },
  },
  {
    key: "ecl",
    valid: (value: string): boolean => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    },
  },
  {
    key: "hcl",
    valid: (value: string): boolean => {
      return /^#[0-9a-f]{6}$/.test(value);
    },
  },
  {
    key: "hgt",
    valid: (value: string): boolean => {
      const height = value.match(/(\d+)(cm|in)/);
      if (!height) {
        return false;
      }
      const val = Number(height[1]);
      const unit = height[2];

      if (unit == "cm") {
        return val >= 150 && val <= 193;
      } else if (unit == "in") {
        return val >= 59 && val <= 76;
      }

      return false;
    },
  },
  {
    key: "byr",
    valid: (value: string): boolean => {
      const num = Number(value);
      return num >= 1920 && num <= 2002;
    },
  },
  {
    key: "iyr",
    valid: (value: string): boolean => {
      const num = Number(value);
      return num >= 2010 && num <= 2020;
    },
  },
  {
    key: "eyr",
    valid: (value: string): boolean => {
      const num = Number(value);
      return num >= 2020 && num <= 2030;
    },
  },
];
const required = rules.map((rule) => rule.key);

const load = async (file: string) => {
  const data = await Deno.readTextFile(file);
  return data.split("\n\n");
};
const present = (passport: string) => {
  const keys: Array<string> = passport
    .split(/(?:\n| )/)
    .reduce((acc: Array<string>, data: string): Array<string> => {
      const key: string = data.split(":")[0];
      acc.push(key);
      return acc;
    }, []);

  return required.every((key: string) => keys.includes(key));
};

const valid = (passport: string) => {
  const fields: Map<string, string> = passport
    .split(/(?:\n| )/)
    .reduce((acc: Map<string, string>, data: string): Map<string, string> => {
      const splitUp: Array<string> = data.split(":");
      acc.set(splitUp[0], splitUp[1]);
      return acc;
    }, new Map<string, string>());

  return rules.every((rule: Rule) => {
    const value = fields.get(rule.key);
    if (!value) {
      return false;
    }
    return rule.valid(value);
  });
};

const data = await load(Deno.args[0]);
const presentPassports = data.filter(present);
console.log(presentPassports);
const validPassports = presentPassports.filter(valid);
console.log(validPassports.length);
