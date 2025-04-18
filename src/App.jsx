import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import { createContext, useReducer, useRef } from "react";
import {
  getLocalStorageAndReturnData,
  getMaxIdFromLocalStorage,
  setLocalStorageAndReturnData,
} from "./util/function";

const mockData = [
  {
    id: 0,
    createdDate: new Date("2025-04-16"),
    emotionId: 1,
    content: "Today is best day",
  },
  {
    id: 1,
    createdDate: new Date("2025-04-15"),
    emotionId: 2,
    content: "Today is great day",
  },
  {
    id: 2,
    createdDate: new Date("2025-03-15"),
    emotionId: 3,
    content: "Today is normal day",
  },
  {
    id: 3,
    createdDate: new Date("2025-05-15"),
    emotionId: 4,
    content: "Today is bad day",
  },
  {
    id: 4,
    createdDate: new Date("2024-12-15"),
    emotionId: 5,
    content: "Today is worst day",
  },
  {
    id: 5,
    createdDate: new Date("2025-04-17"),
    emotionId: 5,
    content: "Today is worst day",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return setLocalStorageAndReturnData([...state, action.data]);
    case "UPDATE":
      return setLocalStorageAndReturnData(
        state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item
        )
      );
    case "DELETE":
      return setLocalStorageAndReturnData(
        state.filter((item) => String(item.id) !== String(action.data.id))
      );
  }
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const navigate = useNavigate();
  const idRef = useRef(getMaxIdFromLocalStorage() || 0);
  const dateRef = useRef(new Date());
  const [data, dispatch] = useReducer(
    reducer,
    getLocalStorageAndReturnData().map((item) => {
      return { ...item, createdDate: new Date(item.createdDate) };
    }) || []
  );

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: {
        id: id,
      },
    });
  };

  return (
    <>
      <DiaryStateContext value={{ data, dateRef }}>
        <DiaryDispatchContext
          value={{
            onCreate,
            onUpdate,
            onDelete,
            navigate,
          }}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/new"
              element={<New />}
            />
            <Route
              path="/diary/:id"
              element={<Diary />}
            />
            <Route
              path="/edit/:id"
              element={<Edit />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </DiaryDispatchContext>
      </DiaryStateContext>
    </>
  );
}

export default App;
