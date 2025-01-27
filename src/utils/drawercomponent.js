
import React from "react";
import "./drawer.css";
import ErrorComponent from "./errorcomponet";
import { formatDate } from "../components/dateformate";

const DrawerPlacement = ({ openDrawer, closeDrawer,loader,data,errorMessage,clearMessage,title }) => {
    
  return (
    <div
      className={`Drawer__Container ${
        openDrawer ? "Drawer__Container--isOpen" : ""
      }`}
    >
      <div className="Drawer__Header">
        <i className="fas fa-arrow-left back-arrow" onClick={closeDrawer}></i>
        <span className="Drawer__Title">{title}</span>

        <i className="fas fa-times close-icon" onClick={closeDrawer}></i>

      </div>

      <div className="Drawer__Content">
        {/* Profile Image */}
        <div className="Drawer__ImageContainer">
    <img
      src={data?.photo}
      alt={`${data?.name}'s Profile`}
      className="Drawer__Image"
    />
  </div>
  {errorMessage&&<ErrorComponent errorMessage={errorMessage} clearMessage={clearMessage}/>}

        {/* Personal Details */}
        {loader  && (
          <div className="loader-container">
            <i className="fa-solid fa-spinner loader"></i>
          </div>
        )}
       {!loader&& <div className="Drawer__Details">
    <div className="Drawer__DetailRow">
      <span className="Drawer__DetailLabel">Name</span>
      <span className="Drawer__DetailValue">{data?.name}</span>
    </div>
    <div className="Drawer__DetailRow">
      <span className="Drawer__DetailLabel">Email</span>
      <span className="Drawer__DetailValue">{data?.email}</span>
    </div>
    <div className="Drawer__DetailRow">
      <span className="Drawer__DetailLabel">Date</span>
      <span className="Drawer__DetailValue">{data?.date?formatDate(data?.date):"--"}</span>
    </div>
  </div>}
      </div>


      <div className="Drawer__Footer">
        <button className="Drawer__Button" onClick={closeDrawer}>
          Close Drawer
        </button>
      </div>
    </div>
  );
};

export default DrawerPlacement;
