// src/useGoogleSheets.js
import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const SHEET_ID = process.env.REACT_APP_SHEET_ID;

export const useGoogleSheets = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance) {
          authInstance.isSignedIn.listen(setIsSignedIn);
          setIsSignedIn(authInstance.isSignedIn.get());
        } else {
          console.error('Google Auth instance not found');
        }
      }).catch((error) => {
        console.error('Error initializing Google API client:', error);
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const signIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn();
    } else {
      console.error('Google Auth instance not found for sign-in');
    }
  };

  const signOut = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signOut();
    } else {
      console.error('Google Auth instance not found for sign-out');
    }
  };

  const appendRow = (rows) => {
    console.log("saving form data")
    console.log(rows);
    return gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Exhibition 1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: rows,
      },
    });
  };

  const getLastOrderNumber = async () => {
    console.log("fetching last order no");
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Exhibition 1!A:A', // Assuming order numbers are in column A
    });
    console.log(response);
    const rows = response.result.values;
    if (rows && rows.length > 0) {
      const lastRow = rows[rows.length - 1];
      const lastOrderNumber = parseInt(lastRow[0], 10);
      return isNaN(lastOrderNumber) ? 0 : lastOrderNumber;
    }
    return 0;
  };

  return { isSignedIn, signIn, signOut, appendRow, getLastOrderNumber };
};
