import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { DiaryDispatchContext } from "../App";
import { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const { id } = useParams();
  const { navigate, onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const diaryItem = useDiary(id);
  usePageTitle(`Tweak Your EmoLog`);

  return (
    <div>
      <Header
        title={"Edit Diary"}
        leftChild={
          <Button
            text={"< back"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          <Button
            text={"Delete"}
            type="NEGATIVE"
            onClick={() => {
              if (window.confirm("Are you sure you delete?")) {
                onDelete(id);
                navigate("/", { replace: true });
              }
            }}
          />
        }
      />
      <Editor
        diaryItem={diaryItem}
        onSubmit={(data) => {
          onUpdate(id, data.date, data.selectedId, data.content);
        }}
      />
    </div>
  );
};

export default Edit;
