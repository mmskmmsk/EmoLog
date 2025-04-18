import { useEffect, useState } from "react";
import { emotionIds, getEmotionImage } from "../util/get-emotion-image";
import "./Viewer.css";

const Viewer = ({ diaryItem }) => {
  const [emotionItem, setEmotionItem] = useState();
  useEffect(() => {
    setEmotionItem(
      emotionIds.find(
        (item) => String(item.key) === String(diaryItem?.emotionId)
      )
    );
  }, [diaryItem?.emotionId]);

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>Today's Emotion</h4>
        <div
          className={`emotion_img_wrapper emotion_img_active_${emotionItem?.key}`}>
          <img src={getEmotionImage(emotionItem?.key)} />
          <div>{emotionItem?.value}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>Today's Diary</h4>
        <div className="content_wrapper">
          <p>{diaryItem?.content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
