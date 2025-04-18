import Button from "./Button";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import "./DiaryItem.css";
import { useContext } from "react";
import { getEmotionImage } from "../util/get-emotion-image";

const DiaryItem = ({ id, createdDate, emotionId, content }) => {
  const { navigate } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryItem">
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => navigate(`/diary/${id}`)}>
        {<img src={getEmotionImage(emotionId)} />}
      </div>
      <div
        className="info_section"
        onClick={() => navigate(`/diary/${id}`)}>
        <div className="created_date">{createdDate.toLocaleDateString()}</div>
        <div className="content">
          {content.length > 36 ? content.substring(0, 36) + "..." : content}
        </div>
      </div>
      <div className="button_section">
        <Button
          text={"Edit"}
          onClick={() => navigate(`/edit/${id}`)}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
