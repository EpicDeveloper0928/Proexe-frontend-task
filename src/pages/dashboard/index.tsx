import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import Button from "../../components/form-controls/button";
import Table from "../../components/table";
import Input from "../../components/form-controls/input";
import {TABLE_COULUMNS} from "../../constants/table-columns";

import {selectPersonalData} from "../../store/manage/selectors";
import {addPersonalData, editPersonalData} from "../../store/manage";
import {getPersonalData} from "../../store/manage/actions";
import type {AppDispatch} from "../../store";

export default function Dashboard() {
  const [isEditPanelOpened, setIsEditPanelOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const personalData = useSelector(selectPersonalData);
  const dispatch = useDispatch<AppDispatch>();
  let formData = personalData.find((item) => item.id === selectedId);
  let tableData = useMemo(() => {
    if (personalData)
      return personalData?.map(
        (data) => ({...data, city: data.address?.city} as TTableData)
      );
    return [];
  }, [personalData]);

  useEffect(() => {
    dispatch(getPersonalData());
  }, [dispatch]);

  useEffect(
    () =>
      reset({
        ...formData,
        city: personalData.find((item) => item.id === selectedId)?.address
          ?.city,
      }),
    [selectedId]
  );

  const onSubmit = (data: TTableData) => {
    const lastIndex = personalData.at(-1)?.id ?? 0;
    if (!selectedId) {
      dispatch(
        addPersonalData({
          ...data,
          id: lastIndex + 1,
        })
      );
    } else {
      dispatch(
        editPersonalData({
          ...data,
          id: selectedId,
        })
      );
    }
    setIsEditPanelOpened(false);
  };

  return (
    <>
      <div className="p-5">
        <header className="py-5">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <div className="m-auto shadow-[-1px_6px_22px_2px_rgba(0,0,0,0.3)] rounded-xl">
          <header className="flex items-center justify-between h-20 px-5 py-2 border-b border-gray-200">
            <h4 className="text-base">
              {isEditPanelOpened ? "Form" : "User list"}
            </h4>
            {!isEditPanelOpened ? (
              <Button
                label="Add new"
                onClick={() => {
                  setIsEditPanelOpened(true);
                  reset({});
                  setSelectedId(null);
                }}
              />
            ) : null}
          </header>

          <div className="p-2">
            {!isEditPanelOpened ? (
              <Table
                columns={TABLE_COULUMNS}
                data={tableData ?? []}
                handleEditPanelOpened={(e: boolean) => setIsEditPanelOpened(e)}
                selectDataId={(id: number) => setSelectedId(id)}
              />
            ) : (
              <form
                className="space-y-4"
                onSubmit={handleSubmit((e) => onSubmit(e as TTableData))}
                key={selectedId}
              >
                <Input
                  register={register("name", {
                    required: "This input is reqired",
                  })}
                  error={errors.name?.message as string}
                  label="Name"
                />
                <Input
                  register={register("username", {
                    required: "This input is reqired",
                  })}
                  error={errors.username?.message as string}
                  label="Username"
                />
                <Input
                  register={register("email", {
                    required: "This input is reqired",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid Email",
                    },
                  })}
                  error={errors.email?.message as string}
                  label="Email"
                />
                <Input
                  register={register("city", {
                    required: "This input is reqired",
                  })}
                  error={errors.city?.message as string}
                  label="City"
                />

                <footer className="w-full p-5">
                  <div className="w-full gap-2 text-right">
                    <Button
                      label="Cancel"
                      className="mr-5"
                      onClick={() => setIsEditPanelOpened(false)}
                    />
                    <Button label="Submit" colorName="green" type="submit" />
                  </div>
                </footer>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
