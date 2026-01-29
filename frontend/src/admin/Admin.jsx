import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";

function Admin() {

  return (
    <>
      <Header />
      <div className="dark:text-white">
        <div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 p-5">
              <div className="flex flex-col gap-5 items-center">
                <div>
                  <NavLink
                    to=""
                    className={ ({isActive}) => isActive ? 'font-bold text-blue-400' : ''}
                    end
                  >Dashboard</NavLink>
                </div>
                <div>
                  <NavLink
                    to="addproducts"
                    className={({ isActive }) => isActive ? 'font-bold text-blue-400' : ''}
                  >
                    Add Products
                  </NavLink>
                </div>
                <div>
                  <NavLink 
                    to="productlist"
                    className={({isActive}) => isActive ? 'font-bold text-blue-400' : '' }
                  >Products List</NavLink>
                </div>
              </div>
            </div>
            <div
              className="col-span-10 shadow-[inset_0_0_10px_#0000007f] rounded-tl-xl py-5 px-6 overflow-y-scroll border-s"
              style={{ height: "calc(100vh - 4.35rem)" }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
