import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";

const Diary = () => {
  const { id } = useParams();
  const { navigate } = useContext(DiaryDispatchContext);
  const diaryItem = useDiary(id);

  return (
    <div className="Diary">
      <Header
        title={
          diaryItem
            ? `Diary for ${diaryItem?.createdDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`
            : ""
        }
        leftChild={
          <Button
            text={"< back"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          <Button
            text={"Edit"}
            onClick={() => navigate(`/edit/${id}`)}
          />
        }
      />
      <Viewer diaryItem={diaryItem} />
    </div>
  );
};

export default Diary;
