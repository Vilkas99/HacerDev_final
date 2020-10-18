import { configureStore } from "@reduxjs/toolkit";
import reductorApp from "../redux/app/appSlice";


export default configureStore({
  reducer: {
    app: reductorApp,
    
  },
});
