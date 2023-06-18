import React from "react";
import { Nav } from "react-bootstrap";
import "./Footer.scss";
const MyComponent = () => {
  return (
    <>
      <div className="footer-layout ">
        <div className="container my-5">
          <div className="col-12 my-5 d-lg-flex   ">
            <div class="col-lg-4 col-12 px-3 my-5 ">
              <div>
                <span className="d-block my-3">
                  <b> MY WEB </b> is not affiliated with or endorsed by{" "}
                  <i> miHoYo.</i>
                </span>
                <span className="d-block my-3">
                  <b> MY WEB </b> is a Database and Tier List website for{" "}
                  <i> Honkai: Star Rail.</i>
                </span>
              </div>
            </div>
            <div class="col-lg-4  col-12 px-3 my-5 ">
              <div className="my-3">
                <span>
                  {" "}
                  <b> More Links</b>{" "}
                </span>
                <span className="d-block">
                  <a
                    class="footer-link"
                    href="mailto:baymaxvipx@gmail.com"
                    target="_blank"
                  >
                    Contact Me
                  </a>
                </span>
              </div>
            </div>
            <div class="col-lg-4 col-12 px-3 my-5 ">
              <div className="my-3 ">
                <span>
                  <b> MY WEB </b> is a Database, Tier List, and Guide for
                  <i> Honkai: Star Rail.</i> on PC, mobile.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
