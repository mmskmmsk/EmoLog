import { useReducer, useContext, useEffect, useRef } from "react";
import { emotionIds, getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./Editor.css";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { getStringedDate } from "../util/function";

const reducer = (state, action) => {
  switch (action.type) {
    case "selectedId":
      return { ...state, selectedId: action.selectedId };
    case "date":
      return { ...state, date: action.date };
    case "content":
      return { ...state, content: action.content };
    case "update":
      return { ...action };
    default:
      return state;
  }
};
const Editor = ({ onSubmit, diaryItem }) => {
  const { navigate } = useContext(DiaryDispatchContext);
  const { dateRef } = useContext(DiaryStateContext);
  const [data, dispatch] = useReducer(reducer, {
    selectedId: 0,
    date: dateRef.current ? dateRef.current : new Date(),
    content: "",
  });
  const contentRef = useRef();

  useEffect(() => {
    if (diaryItem)
      dispatch({
        type: "update",
        selectedId: diaryItem?.emotionId,
        date: diaryItem?.createdDate,
        content: diaryItem?.content,
      });
  }, [diaryItem]);

  const onSubmitSave = () => {
    if (!data.date || isNaN(new Date(data.date).getTime())) {
      alert("Please select a date");
    } else if (!data.selectedId) {
      alert("Please select an emotion");
    } else if (!data.content) {
      contentRef.current.focus();
    } else {
      onSubmit(data);
      dateRef.current = new Date(
        data.date.getFullYear(),
        data.date.getMonth(),
        dateRef.current.getDate()
      );
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>Today's Date</h4>
        <input
          value={getStringedDate(data.date)}
          onChange={(e) =>
            dispatch({
              type: "date",
              date: new Date(e.target.value),
            })
          }
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>Today's Emotion</h4>
        <div className="emotion_list_wrapper">
          {emotionIds.map(({ key, value }) => {
            return (
              <div
                className={`EmotionItem ${
                  key === data.selectedId ? `emotion_img_active_${key}` : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: "selectedId",
                    selectedId: key,
                  })
                }
                key={key}>
                <img
                  className="emotion_img"
                  src={getEmotionImage(key)}
                />
                <div className="emotion_name">{value}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h4>Today's Diary</h4>
        <textarea
          ref={contentRef}
          value={data.content}
          onChange={(e) =>
            dispatch({
              type: "content",
              content: e.target.value,
            })
          }
          placeholder="How was your day?"></textarea>
      </section>
      <section className="button_section">
        <Button
          text={"cancel"}
          onClick={() => navigate(-1)}
        />
        <Button
          text={"Save"}
          type={"POSITIVE"}
          onClick={onSubmitSave}
        />
      </section>
    </div>
  );
};

export default Editor;
