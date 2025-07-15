import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { AdminSlice } from '../slices';
import createAdminSlice from '../slices';
import type { UserSlice } from '../slices/users-slices';
import createUserSlice from '../slices/users-slices';

type TAppSlices = AdminSlice & UserSlice;
const useStore = create<TAppSlices>()(
    devtools(
        persist(
            (...args) => ({
              ...createAdminSlice(...args),
              ...createUserSlice(...args)
            }),
            {
              name: 'AUP_ADMIN',
            },
          ),
    )
)

export default useStore