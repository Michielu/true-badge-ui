import React, { useRef, useState, useEffect } from 'react';

const Badge = (badgeData) => {
    return (
        <div className="row">
            <div className=" col-md-6 offset-md-3 col-12">
                <img className="tb-badge-image" src="https://i.pinimg.com/600x315/a6/0d/68/a60d685194a7fd984d08a595a0a99ae7.jpg" alt="Profile Image"></img>
                {/* <img className="tb-badge-image" src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" alt="Profile Image"></img> */}
                <h3>{badgeData.name}</h3>
            </div>
        </div>
    )
}

export default Badge;