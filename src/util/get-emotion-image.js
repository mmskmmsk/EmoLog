import emotion1 from "../assets/emotion1.png";
import emotion2 from "../assets/emotion2.png";
import emotion3 from "../assets/emotion3.png";
import emotion4 from "../assets/emotion4.png";
import emotion5 from "../assets/emotion5.png";

export const emotionIds = [
  { key: 1, value: "Best" },
  { key: 2, value: "Great" },
  { key: 3, value: "Normal" },
  { key: 4, value: "Bad" },
  { key: 5, value: "Worst" },
];

export const getEmotionImage = (emotionId) => {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    default:
      return null;
  }
};
