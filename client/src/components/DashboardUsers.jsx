import React, {useEffect, useState} from 'react';
import DashboardUserCard from "./DashboardUserCard";
import {useStateValue} from "../Context/StateProvider";
import {getAllUsers} from "../api";
import {actionType} from "../Context/reducer";

const DashboardUsers = () => {
    const [filtereUsers, setFiltereUsers] = useState(null)

    const [{allUsers}, dispatch] = useStateValue()
    useEffect(() => {
        if(!allUsers){
            getAllUsers().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers:data.data
                })
            })
        }
    })

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div className="w-full flex justify-center items-center gap-24">
                <div
                    className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
                    <div className="absolute top-4 left-4">
                        <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Количество :{" "}
            </span>
                            {filtereUsers ? filtereUsers?.length : allUsers?.length}

                        </p>
                    </div>
                    <div className="w-full min-w-[750px] flex items-center justify-between">
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Изображение</p>
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Имя</p>
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Состояние</p>
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Создан</p>
                        {/* prettier-ignore */}
                        <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Роль</p>{" "}
                    </div>
                    {allUsers && !filtereUsers ?
                        allUsers?.map((data, i) => (
                            <DashboardUserCard data={data} key={data._id} index={i}/>
                        )) :
                        filtereUsers?.map((data, i) => (
                            <DashboardUserCard data={data} key={data._id} index={i}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardUsers;
