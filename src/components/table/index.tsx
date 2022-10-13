import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Column, useTable} from "react-table";

import {removePersonalData} from "../../store/manage";
import Button from "../form-controls/button";
import Modal from "../modal";

interface Props {
  columns: Column[];
  data: TTableData[];
  handleEditPanelOpened: Function;
  selectDataId: Function;
}

export default function Table({
  columns,
  data,
  handleEditPanelOpened,
  selectDataId,
}: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const dispatch = useDispatch();

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data,
    });

  const removeData = () => {
    dispatch(removePersonalData(selectedId));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <table className="w-full text-center border" {...getTableProps()}>
        <thead className="p-5 border-b bg-slate-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="px-6 py-3" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map((cell) => {
                  return (
                    <td className="px-6 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="px-6 py-2">
                  <Button
                    label={"Edit"}
                    colorName="yellow"
                    onClick={() => {
                      selectDataId(row.values.id);
                      handleEditPanelOpened(true);
                    }}
                  />
                </td>
                <td className="px-6 py-2">
                  <Button
                    label={"Delete"}
                    colorName="red"
                    onClick={() => {
                      setSelectedId(row.values.id);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        title="Delete"
      >
        <div className="p-5 border-b">
          <p className="text-sm text-gray-500">
            Are you really delete this account?
          </p>
        </div>

        <div className="w-full p-5 text-right border-b ">
          <Button
            variant="outline"
            colorName="purple"
            label="Cancel"
            className="mr-2"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <Button colorName="red" label="Delete" onClick={removeData} />
        </div>
      </Modal>
    </>
  );
}
