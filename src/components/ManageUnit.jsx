import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import React, { useRef, useState } from "react";
import Error from "./Error";
import Success from "./Success";
import { addUnitApi } from "../service/api";
import { VscLoading } from "react-icons/vsc";

function ManageUnit() {
  const [subjectId, setSubjectId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setisAdding] = useState(false);

  const fileInput = useRef(null);

  const handleAddUnit = async (e) => {
    e.preventDefault();
    console.log({ unitName, subjectId });
    try {
      if (subjectId === "" || unitName === "") {
        return setError("Important fields can not be empty.");
      }
      setisAdding(true);
      const formData = new FormData();
      formData.append("name", unitName);
      if (fileInput.current && fileInput.current.files[0]) {
        formData.append("file", fileInput.current.files[0]);
      }

      const { data, error } = await addUnitApi(subjectId, formData);
      if (error) {
        return setError(error.message);
      }
      setUnitName("");
      setSuccess(data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setisAdding(false);
    }
  };

  return (
    <div className="w-full p-4 mb-10 px-[5vw]">
      {error && <Error error={error} setError={setError} />}
      {success && <Success success={success} setSuccess={setSuccess} />}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight font-main">
          Manage Unit
        </h2>
      </div>

      <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-xl font-semibold py-6">Add Unit</h4>

        <form className=" w-full p-4 flex justify-center items-start flex-col gap-4">
          <input
            ref={fileInput}
            type="file"
            name="file"
            id="file"
            required={true}
            className="bg-white"
          />
          <label htmlFor="name">Unit name</label>
          <input
            required
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            type="text"
            className="w-full bg-bg-color px-4 py-1 rounded-md outline-none border-2 border-border-color mb-2"
            placeholder="Input the Unit Name"
          />
          <label htmlFor="subject">Subject Id</label>

          <input
            required
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            type="text"
            className="w-full bg-bg-color px-4 py-1 rounded-md outline-none border-2 border-border-color mb-2"
            placeholder="Input the Unit Name"
          />

          <button
            onClick={handleAddUnit}
            className="w-full text-base outline-none flex justify-center items-center select-none font-semibold tracking-tight bg-primary-color text-bg-color px-4 py-1 rounded-md cursor-pointer"
          >
            {isAdding ? (
              <VscLoading className="text-white animate-spin" />
            ) : (
              "Add Unit"
            )}
          </button>
        </form>
      </div>

      {/* <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-lg font-semibold py-6">All Subjects</h4>

        <div className="w-full grid grid-cols-2 py-6">
          <span className="place-self-start font-semibold tracking-tight">
            Unit Name
          </span>
          <span className="place-self-end font-semibold tracking-tight">
            Action
          </span>
        </div>

        <div className="w-full grid grid-cols-2 py-6 border-t-2 border-white">
          <span className="place-self-start">Unit 1</span>
          <span className="place-self-end flex justify-end gap-4 items-center">
            <button className="bg-bg-color text-text-muted flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-text-muted text-sm cursor-pointer select-none outline-none rounded-sm">
              <BiEdit /> Edit
            </button>
            <button className="bg-bg-color flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-red-500 text-red-500 text-sm cursor-pointer select-none outline-none rounded-sm">
              <FiDelete /> Delete
            </button>
          </span>
        </div>
      </div> */}
    </div>
  );
}

export default ManageUnit;
