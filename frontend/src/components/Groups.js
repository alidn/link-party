import React, { Suspense, useState, useEffect, useContext } from "react";
import { FixedSizeList } from "react-window";
import { getAllGroups } from "../api/groups";
import { useWindowSize } from "../hooks";
import { useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";
import { fetchUsernameByIdAsync } from "../api/user";
import SpinnerCircle from "./SpinnerCircle";

const groups = getAllGroups();

export default function Groups({ changeGroup }) {
  return (
    <Suspense fallback={<SpinnerCircle />}>
      <div className="ml-10 mr-10">
        <GroupListWindow
          changeGroup={(v) => {
            changeGroup(v);
          }}
          groupsReader={groups}
        />
      </div>
    </Suspense>
  );
}

function Group({ index, data, style }) {
  let themeContext = useContext(ThemeContext);
  let history = useHistory();
  let [creatorName, setCreatorName] = useState("");

  const {
    name,
    id,
    membersCount,
    creator,
    setSelectedGroup,
    isSelected,
    selectedGroup,
  } = data[index];

  useEffect(() => {
    // fetchUsernameByIdAsync(creator).then((v) => setCreatorName(v));
  }, []);

  const handleClick = () => {
    setSelectedGroup(selectedGroup, id);
    history.push("/" + id);
  };

  return (
    <div
      onClick={handleClick}
      className={`mt-2 cursor-pointer rounded-lg p-5 border ${
        selectedGroup === id
          ? ` border-transparent ${
              themeContext.dark ? "bg-gray-900" : " bg-indigo-100"
            }`
          : ` ${
              themeContext.dark ? "hover:bg-gray-600" : "hover:bg-gray-100"
            }  border-transparent`
      }  `}
      style={{
        ...style,
        top: style.top + 5,
        height: style.height - 5,
      }}
    >
      <span>
        <span
          className={`${
            themeContext.dark ? "text-gray-300" : "text-gray-700"
          } text-sm`}
        >
          {creatorName} /{" "}
        </span>
        <span
          className={`${
            themeContext.dark ? "text-gray-400" : "text-gray-800"
          } text-lg`}
        >
          {name}
        </span>
      </span>
      <div
        className={`${
          themeContext.dark ? "text-gray-400" : "text-gray-700"
        } text-sm`}
      >
        <span>{membersCount} members</span>
      </div>
    </div>
  );
}

function GroupListWindow({ groupsReader, changeGroup }) {
  let groups = groupsReader.read();
  const [_width, height] = useWindowSize();
  let [selectedGroup, setSelectedGroup] = useState(0);
  let [groupsWithProps, setGroupsWithProps] = useState(groups);

  useEffect(() => {
    if (selectedGroup === 0) {
      setSelected(-1, groups[0].id);
    }
  }, [selectedGroup]);

  useEffect(() => {
    setGroupsWithProps(
      groups.map((group, index) =>
        Object.assign(group, {
          setSelectedGroup: setSelected,
          isSelected: index === selectedGroup,
          selectedGroup: selectedGroup,
        })
      )
    );
  }, [groups, selectedGroup]);

  const setSelected = (from, to) => {
    setSelectedGroup(to);
    changeGroup(to);
  };

  return (
    <FixedSizeList
      itemData={groupsWithProps}
      height={(height * 85) / 100}
      width={300}
      itemSize={100}
      itemCount={groups.length}
    >
      {Group}
    </FixedSizeList>
  );
}
