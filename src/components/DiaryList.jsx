import { useContext } from "react";
import Button from "./Button";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ memoizedPivotDate, sortType, SortTypeChange }) => {
  const { data } = useContext(DiaryStateContext);
  const { navigate } = useContext(DiaryDispatchContext);
  const filteredData = data
    .filter(
      (diary) =>
        diary.createdDate.getMonth() === memoizedPivotDate.getMonth() &&
        diary.createdDate.getFullYear() === memoizedPivotDate.getFullYear()
    )
    .sort((a, b) => {
      switch (sortType) {
        case "latest":
          return b.createdDate.getTime() - a.createdDate.getTime();
        case "oldest":
          return a.createdDate.getTime() - b.createdDate.getTime();
      }
    });

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select
          onChange={(e) =>
            SortTypeChange({ type: "SORT", value: e.target.value })
          }>
          <option value={"latest"}>latest</option>
          <option value={"oldest"}>oldest</option>
        </select>

        <Button
          text={"New Diary"}
          onClick={() => navigate(`/new`)}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {filteredData.map((diary) => (
          <DiaryItem
            key={diary.id}
            {...diary}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
