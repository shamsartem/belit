const SOFT_SIGN = '*'
const HARD_SIGN = "'"
const YOT_BIG = 'Y'
const YOT_SMALL = 'y'

type BelChar = string
type BelitChar = string | [string, string]

const vowelsThatMayNeedASoftSignBeforeThem: Array<[BelChar, BelitChar]> = [
  ['ё', ['o', `${YOT_SMALL}o`]],
  ['ю', ['u', `${YOT_SMALL}u`]],
  ['я', ['a', `${YOT_SMALL}a`]],
]

const vowelsThatMayNeedASoftSignBeforeThemMap = new Map(
  vowelsThatMayNeedASoftSignBeforeThem,
)

const smallLetterE: Array<[BelChar, BelitChar]> = [
  ['е', ['e', `${YOT_SMALL}e`]],
]

const smallLetterEMap = new Map(smallLetterE)

const smallLetterI: Array<[BelChar, BelitChar]> = [
  ['i', ['i', `${YOT_SMALL}i`]],
  ['і', ['i', `${YOT_SMALL}i`]],
]

const smallLetterIMap = new Map(smallLetterI)

const vowelsThatNeverNeedAHardSignBeforeThem: Array<[BelChar, BelitChar]> = [
  ...vowelsThatMayNeedASoftSignBeforeThem,
  ...smallLetterI,
  ...smallLetterE,
]

const vowelsThatNeverNeedAHardSignBeforeThemMap = new Map(
  vowelsThatNeverNeedAHardSignBeforeThem,
)

const vowelsThatMayNeedAHardSignBeforeThem: Array<[BelChar, BelitChar]> = [
  ['э', 'e'],
]

const vowelsThatMayNeedAHardSignBeforeThemMap = new Map(
  vowelsThatMayNeedAHardSignBeforeThem,
)

const restOfTheVowels: Array<[BelChar, BelitChar]> = [
  ['А', 'A'],
  ['а', 'a'],
  ['Е', `${YOT_BIG}e`],
  ['І', 'I'],
  ['I', 'I'],
  ['О', 'O'],
  ['о', 'o'],
  ['У', 'U'],
  ['у', 'u'],
  ['Ы', `${HARD_SIGN}I`],
  ['ы', `${HARD_SIGN}i`],
  ['Э', 'E'],
  ['Ё', `${YOT_BIG}o`],
  ['Ю', `${YOT_BIG}u`],
  ['Я', `${YOT_BIG}a`],
]

const vowels = [
  ...vowelsThatNeverNeedAHardSignBeforeThem,
  ...vowelsThatMayNeedAHardSignBeforeThem,
  ...smallLetterI,
  ...restOfTheVowels,
]

const vowelsMap = new Map(vowels)

const consonantsThatCanBeSoftenedByVowels: Array<[BelChar, BelitChar]> = [
  ['Б', 'B'],
  ['б', 'b'],
  ['В', 'V'],
  ['в', 'v'],
  ['Г', 'G'],
  ['г', 'g'],
  ['Д', 'D'],
  ['д', 'd'],
  ['З', 'Z'],
  ['з', 'z'],
  ['К', 'K'],
  ['к', 'k'],
  ['Л', 'L'],
  ['л', 'l'],
  ['М', 'M'],
  ['м', 'm'],
  ['Н', 'N'],
  ['н', 'n'],
  ['П', 'P'],
  ['п', 'p'],
  ['Р', 'R'],
  ['р', 'r'],
  ['С', 'S'],
  ['с', 's'],
  ['Т', 'T'],
  ['т', 't'],
  ['Ф', 'F'],
  ['ф', 'f'],
  ['Ц', 'Ts'],
  ['ц', 'ts'],
  ['Х', 'H'],
  ['х', 'h'],
]

const consonantsThatCanBeSoftenedByVowelsMap = new Map(
  consonantsThatCanBeSoftenedByVowels,
)

const consonantsThatMayNeedAYotAfterThem: Array<[BelChar, BelitChar]> = [
  ['Ў', 'W'],
  ['ў', 'w'],
]

const consonantsThatMayRequireVowelWithYAfterThem = new Map(
  consonantsThatMayNeedAYotAfterThem,
)

const consonantsNeverSoftenedByVowels: Array<[BelChar, BelitChar]> = [
  ['Ж', 'Zh'],
  ['ж', 'zh'],
  ['Ш', 'Sh'],
  ['ш', 'sh'],
  ['Ч', 'Ch'],
  ['ч', 'ch'],
]

const consonantsNeverSoftenedByVowelsMap = new Map(
  consonantsNeverSoftenedByVowels,
)

const yots: Array<[BelChar, BelitChar]> = [
  ['Й', YOT_BIG],
  ['й', YOT_SMALL],
]

const consonants: Array<[BelChar, BelitChar]> = [
  ...consonantsThatCanBeSoftenedByVowels,
  ...consonantsThatMayNeedAYotAfterThem,
  ...consonantsNeverSoftenedByVowels,
  ...yots,
]

const consonantsMap = new Map(consonants)

const hardSigns: Array<[BelChar, BelitChar]> = [
  ['’', "'"],
  [HARD_SIGN, "'"],
]

const hardSignsMap = new Map(hardSigns)

const softSigns: Array<[BelChar, BelitChar]> = [
  ['ь', SOFT_SIGN],
  ['Ь', SOFT_SIGN],
]

const otherSymbols: Array<[BelChar, BelitChar]> = [...hardSigns, ...softSigns]

const letters: Array<[BelChar, BelitChar]> = [
  ...vowels,
  ...restOfTheVowels,
  ...consonants,
  ...otherSymbols,
]

const lettersMap = new Map(letters)

export const belToBelit = (bel: string): string =>
  bel
    .split('')
    .map((belChar, i, belCharsArray) => {
      const maybeCharOrChars = lettersMap.get(belChar)
      const maybePreviousBelChar = belCharsArray[i - 1]
      const isPreviousBelCharALetter =
        maybePreviousBelChar !== undefined &&
        lettersMap.has(maybePreviousBelChar)
      const maybeNextBelChar = belCharsArray[i + 1]

      // If it is not a belarusian letter - return it as is
      if (maybeCharOrChars === undefined) {
        return belChar
      }

      const charOrChars = maybeCharOrChars

      // If the char is `'` and the next letter is `е`, `ё`, `ю`, `я`, `i` -
      // then `'` char is not needed at all
      // because they will have `y` before them
      if (
        hardSignsMap.has(belChar) &&
        maybeNextBelChar !== undefined &&
        vowelsThatNeverNeedAHardSignBeforeThemMap.has(maybeNextBelChar)
      ) {
        return ''
      }

      // If letter can be written in two ways: with `y` and without `y`
      if (Array.isArray(charOrChars)) {
        const [vowel, yPlusVowel] = charOrChars

        const isSmallI = smallLetterIMap.has(belChar)

        if (
          (!isSmallI &&
            (maybePreviousBelChar === undefined ||
              !isPreviousBelCharALetter ||
              vowelsMap.has(maybePreviousBelChar))) ||
          (maybePreviousBelChar !== undefined &&
            (hardSignsMap.has(maybePreviousBelChar) ||
              consonantsThatMayRequireVowelWithYAfterThem.has(
                maybePreviousBelChar,
              ))) ||
          maybePreviousBelChar === 'ь'
        ) {
          return yPlusVowel
        }

        // If letter may need a soft sign before it
        // and previous letter allows soft sign after it
        if (
          vowelsThatMayNeedASoftSignBeforeThemMap.has(belChar) &&
          maybePreviousBelChar !== undefined &&
          consonantsThatCanBeSoftenedByVowelsMap.has(maybePreviousBelChar)
        ) {
          return `${SOFT_SIGN}${vowel}`
        }

        if (
          (vowelsThatMayNeedASoftSignBeforeThemMap.has(belChar) ||
            smallLetterEMap.has(belChar)) &&
          maybePreviousBelChar !== undefined &&
          consonantsNeverSoftenedByVowelsMap.has(maybePreviousBelChar)
        ) {
          return `${HARD_SIGN}${vowel}`
        }

        return vowel
      }

      const char = charOrChars
      if (maybePreviousBelChar === undefined) {
        return char
      }

      const previousBelChar = maybePreviousBelChar

      // For letter Э
      if (
        vowelsThatMayNeedAHardSignBeforeThemMap.has(belChar) &&
        consonantsMap.has(previousBelChar)
      ) {
        return `${HARD_SIGN}${char}`
      }

      // for generating c'h, s'h, z'h
      if (
        belChar === 'х' &&
        ['С', 'с', 'Ц', 'ц', 'З', 'з'].some((l) => l === previousBelChar)
      ) {
        return `${HARD_SIGN}h`
      }

      // so double цц becomes tss
      if (belChar === 'ц' && previousBelChar === 'ц') {
        return 's'
      }

      return char
    })
    .join('')
