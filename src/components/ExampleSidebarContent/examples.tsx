import React from "react";
import { T } from "ui";

export const examples = [
  {
    label: "Minimal hello world",
    description:
      "The characters are added to the stack using string-mode, then printed in reverse order.",
    code: '"!dlrow ,olleH",,,,,,,,,,,,,@',
  },
  {
    label: "ASCII hello world",
    description:
      "The ASCII values of the characters are put on the stack by doing arithmetic with single digit numbers, then printed in reverse order.",
    code: " v>v>v>v>v>v>v \n 5 5 5 4 5 5 9 \n 6 7-7-2 7 7+8 \n + +7+22 + +1* \n 3*9*9*2*9*9*  \n *:*:*:*4*9*:  \n  * +3+*+3+ *  \n  5 6+6*6+7 5  \n  2 5 5 5 5 2  \n >^>^>^>^>^>^>v\n@,,,,,,,,,,,,,<\n               \n !dlrow ,olleH \n", // prettier-ignore
  },
  {
    label: "FizzBuzz",
    description:
      "The program asks for a numeric input, then prints all the numbers up to that input value, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both 3 and 5 with 'FizzBuzz'",
    code: ' 52*:"?timiL",,,,,,,,&00p   v\nv:_v#%3: _v#%5: _v#%*53:  +1<\n>.#"#>   #"#>   #"#> v> 25*,^\n   z ,    z ,    z , :|      \n   z ,    z ,    z , 1>@     \n   i ,    u ,    u , +#      \n   F ,    B ,    B , 0!      \n   "      "      z , 0`      \n   > ^    > ^    z , g       \n                 i , >^      \n                 F ,         \n                 "           \n                 > ^         \n',
  },
  {
    label: "Prime generator",
    description: (
      <T>
        Generates primes by checking, for each integer, if any of the primes
        less than its square root divide it evenly. Fills most of the code grid
        with primes.
      </T>
    ),
    code: "v                                                                               \n7                                                                               \n1                                                                               \n0                                                                               \np                                                                               \n0                                                                               \n2                                                                               \n0                                                                               \np                                                                               \n                                                                                \n2                                                                               \n7                                                                               \n0                                                                               \np                                                                               \n                                                                                \n2                                                                               \n.                                                                               \n5                                                                               \n5                                                                               \n+                                                                               \n,                                                                               \n               >40gg%!#v_v          ++for12or34                      @>:: .55+,v\n3              ^g03:   #<>350p460pv              >$150g0p60g0g1+:45*`| vpg02g01<\n>730p040p >:30g40gg:*1-`|         >50g0g1+:89*7+`|             vp0g06< >      1+\n^         ^#         +1<> 150p260p^              >50g0p        >50g3-#^_       #\n",
  },
  {
    label: "Emulator",
    description:
      "An emulator of a simple machine with 16 instructions, a maximum program length of 16, and 2? registers.",
    code: 'v aaaaaaaaaaaaaaaa Load:                                                        \n  ip: a ^Memory^          ^^   <    v                                         < \n< is: a a-p=0-15   v 0              <              Print: >55+%68*+,    v     ^ \n  ar: a            >:96+`#^_:2+ &:69v                     ^,+*86<               \n  r0: a            ^ +1p0\\+"a"_^#!`+<                           |:/+55:<        \n  r1: a                                                   ^    $<               \n                   Fetch:                                                       \n>   61g"a"-::2+0g62p1+88+%2+0g63p62g"a"-7`1++88+%"a"+61p62g"a"-         #     v \n :!#v_1-:!#v_1-:!#v_1-:!#v_1-:!#v_1-:!#v_1-:!#v_1-:!#v_1-:!#v_1-v  Execute:   > \n    5      $      $      $      $      $      $      $      $   >      #    v   \n^   5 0     1      2      3      4      5      6      7     >8$63g"a"- ^>       \n    +                                                >"**GNID**",,,,,,,,^       \n    ,                                         >65g"a"-1-88++88+%"a"+65p ^       \n    @                                  >64g"a"-1-88++88+%"a"+64p>       ^       \n                                >65g"a"-1+88+%"a"+65p>          ^               \n                         >64g"a"-1+88+%"a"+64p>      ^     p46g0+2-"a"g36<      \n                  >64g65g-88++88+%"a"+64p>    ^      p56g0+2-"a"g36<            \n           >64g"a"-65g"a"-+88+%"a"+64p  >^     p0+2-"a"g36g46<                  \n  +---------------+   >            >    ^p0+2-"a"g36g56<                        \n  | 4917 Emulator |                |-"a"g46<                                    \n  |Dougall Johnson|   ^p16g36<     <                                            \n  |  12 Feb 2010  |          |-"a"g46<                                          \n  +---------------+   ^   <  <     15    14    13    12    11    10     9       \n@,,,,,,"ERROR"+55          <      -1_^#:-1_^#:-1_^#:-1_^#:-1_^#:-1_^#:-1_^#:<   \n',
  },
] as const;
