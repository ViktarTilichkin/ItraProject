import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../services/user';
import { reviewApi } from '../services/review'; 

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
            userApi.middleware,
            reviewApi.middleware,
        ]),
});

setupListeners(store.dispatch);

export default store;
