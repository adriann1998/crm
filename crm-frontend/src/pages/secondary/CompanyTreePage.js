import React, { useState, useEffect } from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { getData } from "../../utils/CRUDUtil";

export default function CompanyTreePage() {

  const [users, setUsers] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    getData("/users").then((data) => {
      setUsers(data);
    });
  }, [])

  useEffect(() => {
    let ams = users.filter(u => u.userPosition === 'am');
    let bms = users.filter(u => u.userPosition === 'bm');
    let dirs = users.filter(u => u.userPosition === 'director');
    const bmsData = bms.map(bm => {
      const subordinates = ams.filter(am => String(am.reportTo) === String(bm._id))
                              .map(am => ({name: `${am.name.firstName}.${am.name.lastName[0]}`}))
      return {
        _id: bm._id,
        reportTo: bm.reportTo,
        name: `${bm.name.firstName}.${bm.name.lastName[0]}`, 
        children: subordinates
      }
    })
    const dirsData = dirs.map(dir => {
      const subordinates = bmsData.filter(bm => String(bm.reportTo) === String(dir._id))
      return {
        name: `${dir.name.firstName}.${dir.name.lastName[0]}`,
        children: subordinates
      }
    })
    const treeData = {
      name: "Compnet",
      children: dirsData
    }
    setTreeData(treeData)
  }, [users])

  return (
    <div className="custom-container">
      <Tree
        data={treeData}
        height={800}
        width={800}
      />
    </div>
  );
}