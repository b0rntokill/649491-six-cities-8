import React from 'react';
import { User } from '../../../types/users';

type HostInfoProps = {
  host: User;
  description: string;
};

function HostInfo({host, description}: HostInfoProps): JSX.Element {
  const {name, avatarUrl, isPro} = host;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro? 'property__avatar-wrapper--pro' : ''}`}>
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">{name}</span>

        {isPro &&
        <span className="property__user-status">
          {isPro}
        </span>}

      </div>
      <div className="property__description">
        <p className="property__text">{description}</p>
      </div>
    </div>
  );
}

export default HostInfo;
