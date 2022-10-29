const CHARACTER_NAMES = {
  ["+"]: "plus",
  ["-"]: "minus",
  ["*"]: "star",
  ["/"]: "slash",
  ["%"]: "percent",
  ["`"]: "accent",
  ["!"]: "exclamation",
  ["?"]: "question",
  ["^"]: "caret",
  [">"]: "greater than",
  ["<"]: "less than",
  ["v"]: "V",
  ["_"]: "underscore",
  ["|"]: "pipe",
  ['"']: "double quote",
  [":"]: "colon",
  ["\\"]: "back slash",
  ["$"]: "dollar",
  ["."]: "dot",
  [","]: "comma",
  ["&"]: "ampersand",
  ["~"]: "tilde",
  ["#"]: "hash",
  ["g"]: "G",
  ["p"]: "P",
  ["@"]: "at",
  [" "]: "space",
};

export function mapCharactersToNames(s: string): string {
  return s
    .split("")
    .map(
      (char) => CHARACTER_NAMES[char as keyof typeof CHARACTER_NAMES] || char
    )
    .join(" ");
}
