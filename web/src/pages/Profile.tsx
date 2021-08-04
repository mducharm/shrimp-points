import React, { useState } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { ALL_PEOPLE } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

function Profile() {
  const { loading, error, data } = useQuery(ALL_PEOPLE);

  useEffect(() => console.log(data))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading && <p>loading...</p>}
        {error && <p>error: {error.message}</p>}
        <p>Profile</p>
      </header>
    </div>
  )
}

export default Profile
