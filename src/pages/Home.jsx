import { useReducer, useMemo } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "DATE":
      return new Date(state.getFullYear(), state.getMonth() + action.value);
    case "SORT":
      return action.value;
  }
};
const Home = () => {
  const [PivotDate, DateChange] = useReducer(reducer, new Date());
  const [sortType, SortTypeChange] = useReducer(reducer, "latest");

  const memoizedPivotDate = useMemo(() => PivotDate, [PivotDate]);

  return (
    <div>
      <Header
        title={memoizedPivotDate.toLocaleDateString("en-US", {
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
        memoizedPivotDate={memoizedPivotDate}
        sortType={sortType}
        SortTypeChange={SortTypeChange}
      />
    </div>
  );
};

export default Home;
