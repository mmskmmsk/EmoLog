import { useReducer, useEffect, useContext } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "DATE":
      return new Date(
        state.getFullYear(),
        state.getMonth() + action.value,
        state.getDate()
      );
    case "SORT":
      return action.value;
  }
};
const Home = () => {
  const { dateRef } = useContext(DiaryStateContext);
  const [PivotDate, DateChange] = useReducer(reducer, dateRef.current);
  const [sortType, SortTypeChange] = useReducer(reducer, "latest");
  useEffect(() => {
    dateRef.current = PivotDate;
  }, [PivotDate]);

  return (
    <div>
      <Header
        title={PivotDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
        leftChild={
          <Button
            text={"<"}
            onClick={() => DateChange({ type: "DATE", value: -1 })}
          />
        }
        rightChild={
          <Button
            text={">"}
            onClick={() => DateChange({ type: "DATE", value: 1 })}
          />
        }
      />

      <DiaryList
        memoizedPivotDate={PivotDate}
        sortType={sortType}
        SortTypeChange={SortTypeChange}
      />
    </div>
  );
};

export default Home;
