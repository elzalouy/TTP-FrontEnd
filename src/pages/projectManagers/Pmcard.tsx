import React from 'react'
import IMAGES from '../../assets/img/Images'
import './Pmcard.css'
const AccountInfo = {
    FullName: "Ahamed Ali",
    role: "Admin",
    Email: "Ahmed.Ali@ttp.Unicode",
    teams: "3",
    CurrentProjects: "5",
    CompletedProjects:"4"
}

type Props = {};

const Pmcard = (props:Props) => {
    return (
      <div className="single-card">
            <div className="circular--portrait">
                <img src={IMAGES.avatar} width="100px" height="100px" alt="avatar"/>
        </div>
            <div className="contentpm">
                <a className="Cname">{AccountInfo.FullName}</a>
                <a className="Cmail">{AccountInfo.Email}</a>
                <a className="Cteams">{AccountInfo.teams} Teams</a>
                <div>
                <div className="pmn">
                    <a className="Numpt">Completed projects </a> <a className="Numpn">
                        {AccountInfo.CompletedProjects} </a>
                </div>
                <div className="pmn" >  <a className="Numpt">Current projects </a> <a className="Numpn">
                        {AccountInfo.CurrentProjects} </a>
                    </div>
                </div>
        </div>
        <div className="teamnNum">
          <ul>
            <li>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Pmcard;

  