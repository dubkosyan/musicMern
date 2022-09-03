import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../Context/reducer";
import {deleteAlbumById, deleteSongById, getAllAlbums, getAllSongs} from "../api";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [{ allAlbums }, dispatch] = useStateValue();

  const deleteObject = (id) => {
    console.log(id);
    deleteAlbumById(id).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allSongs: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>

      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            ВЫ действительно хотите удалить?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md"
                 onClick={() => deleteObject(data._id)}>
              <p className="text-headingColor text-sm">Да</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">Нет</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardAlbum;
