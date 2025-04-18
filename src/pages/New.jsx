import { useContext } from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { navigate, onCreate } = useContext(DiaryDispatchContext);
  usePageTitle(`New EmoLog`);

  return (
    <div className="New">
      <Header
        title={"New Diary"}
        leftChild={
          <Button
            text={"< back"}
            onClick={() => navigate(-1)}
          />
        }
      />
      <Editor
        onSubmit={(data) => {
          onCreate(data.date, data.selectedId, data.content);
        }}
      />
    </div>
  );
};

export default New;
