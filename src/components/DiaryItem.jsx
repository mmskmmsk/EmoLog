// import { useContext } from "react";
import Button from "./Button";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import "./DiaryItem.css";
import { useContext } from "react";
import { getEmotionImage } from "../util/get-emotion-image";

const DiaryItem = ({ id, createdDate, emotionId, content }) => {
  // const { data } = useContext(DiaryStateContext);
  const { navigate } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`}>
        {
          <img
            src={getEmotionImage(emotionId)}
            onClick={() => navigate(`/diary/${id}`)}
          />
        }
      </div>
      <div
        className="info_section"
        onClick={() => navigate(`/diary/${id}`)}>
        <div className="created_date">{createdDate.toLocaleDateString()}</div>
        <div className="content">{content}</div>
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
