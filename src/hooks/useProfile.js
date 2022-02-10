import React from 'react';
import axios from 'axios';

import {UserContext} from '../contexts/UserContext';
import {BASE_URL} from '../config';

export function useProfile(endpoint, initialValue = {}) {
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState({initialValue});
  if (!data) {
    React.useEffect(() => {
        axios
            .get(`${BASE_URL}${endpoint}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                //console.log('I Triggered')
                setData(response.data)
            })
    }, [token, endpoint])
  }
  return data;
}
