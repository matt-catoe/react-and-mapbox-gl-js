import React, { useReducer } from "react";

const UserContext = React.createContext();

const initialState = {};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "user location received": {
      return { ...state, ...payload, message: null };
    }
    case "user location not found":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const getUserLocation = async (dispatch) => {
  try {
    await navigator.geolocation.watchPosition(
      (location) => {
        const { coords: position, timestamp } = location;
        const { altitude, heading, longitude, latitude, speed } = position;
        dispatch({
          type: "user location received",
          payload: { altitude, heading, longitude, latitude, speed, timestamp },
        });
      },
      (error) => {
        const { message } = error;
        dispatch({ type: "user location not found", payload: { message } });
      }
    );
  } catch (error) {
    throw new Error("Error retrieving user location:", error);
  }
};

export { UserProvider, useUser, getUserLocation };
