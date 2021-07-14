import React from 'react';
import {Link} from 'react-router-dom';
import { css } from 'emotion';
import history from '../../../history'

// Components and Styles
import {
  IoIosSettings,
  IoIosHome, IoIosEye, IoIosPeople
} from 'react-icons/io';

import * as styles from '../../../styles/wayfinder/wayfinder'

export default class Wayfinder extends React.Component {
  render() {
    return (
      <div className={css`${styles.stepsForm2}`}>
        <div className="steps-row-2 setup-panel-2 d-flex justify-content-between">

          <div className="steps-step-2">
            <Link to={{
                pathname: "/flight-information"
              }} className={"btn-circle-2 " + ((history.location.pathname === "/flight-information") ? " active" : "")}>
              <IoIosSettings/>
              <div className='label-step pb-1'>Step 1</div>
              <div className='label-wayfinder'>Flight Info</div>
            </Link>
          </div>
          <div className="steps-step-2">
            <Link to={{
                pathname: "/assets"
              }} className={"btn-circle-2" + ((history.location.pathname === "/assets") ? " active" : "")}>
              <IoIosHome/>
              <div className='label-step pb-1'>Step 2</div>
              <div className='label-wayfinder'>Assets</div>
            </Link>
          </div>
          
          <div className="steps-step-2">
            <Link to={{
                pathname: "/personalization"
              }} className={"btn-circle-2" + ((history.location.pathname === "/personalization") ? " active" : "")}>
              <IoIosPeople/>
              <div className='label-step pb-1'>Step 3</div>
              <div className='label-wayfinder'>Personalization</div>
            </Link>
          </div>
          <div className="steps-step-2">
            <Link to={{
                pathname: "/review"
              }} className={"btn-circle-2" + ((history.location.pathname === "/review") ? " active" : "")}>
              <IoIosEye/>
              <div className='label-step pb-1'>Step 4</div>
              <div className='label-wayfinder'>Review</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
