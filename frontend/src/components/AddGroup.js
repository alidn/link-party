import React, {useState} from 'react';

export default function GroupEdit() {
  let [isEditing, setEditing] = useState(false);

  return isEditing ? <button></button> : <div></div>;
}
