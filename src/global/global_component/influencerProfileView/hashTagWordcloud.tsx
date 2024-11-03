import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const data = [
  { text: "Hey", value: 10 },
  { text: "lol", value: 20 },
  { text: "first impression", value: 40 },
  { text: "very cool", value: 25 },
  { text: "duck", value: 10 },
  { text: "told", value: 6 },
  { text: "mistake", value: 11 },
  { text: "thought", value: 16 },
  { text: "bad", value: 17 },
  { text: "apple", value: 10 },
  { text: "banana", value: 40 },
  { text: "orange", value: 55 },
  { text: "grape", value: 30 },
  { text: "watermelon", value: 28 },
  { text: "kiwi", value: 25 },
  { text: "strawberry", value: 22 },
  { text: "pineapple", value: 20 },
  { text: "blueberry", value: 18 },
  { text: "peach", value: 15 },
  { text: "mango", value: 14 },
  { text: "pear", value: 12 },
  { text: "cherry", value: 10 },
  { text: "lemon", value: 9 },
  { text: "lime", value: 8 },
  { text: "pomegranate", value: 7 },
  { text: "fig", value: 6 },
  { text: "plum", value: 5 },
  { text: "apricot", value: 5 },
  { text: "nectarine", value: 5 },
  { text: "coconut", value: 5 },
  { text: "blackberry", value: 5 },
  { text: "raspberry", value: 5 },
  { text: "cranberry", value: 5 },
  { text: "honeydew", value: 5 },
  { text: "cantaloupe", value: 5 },
  { text: "guava", value: 5 },
  { text: "passionfruit", value: 5 },
  { text: "tangerine", value: 5 },
  { text: "persimmon", value: 5 },
];

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

const HashtagsWordCloud = () => {
  return (
    <div>
      <WordCloud
        data={data}
        width={400}
        height={300}
        fontWeight=""
        rotate={0}
        fontSize={(word) => Math.log2(word.value) * 10}
        spiral="rectangular"
        // rotate={(word) => word.value % 360}
        padding={5}
        random={Math.random}
        fill={(d: any, i: { toString: () => string }) =>
          schemeCategory10ScaleOrdinal(i.toString())
        }
        onWordClick={(event, d) => {}}
        onWordMouseOver={(event, d) => {}}
        onWordMouseOut={(event, d) => {}}
      />
    </div>
  );
};

export default HashtagsWordCloud;
