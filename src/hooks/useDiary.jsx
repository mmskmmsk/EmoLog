import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const useDiary = (id) => {
  const { data } = useContext(DiaryStateContext);
  const { navigate } = useContext(DiaryDispatchContext);
  const [diaryItem, setDiaryItem] = useState();
  console.log(data);

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("The diary does not exist!");
      navigate("/", { replace: true });
    }
    setDiaryItem(currentDiaryItem);
  }, [id]);

  return diaryItem
    ? diaryItem
    : {
        id: "",
        createdDate: new Date("1900-01-01"),
        emotionId: "",
        content: "",
      };
};

export default useDiary;
