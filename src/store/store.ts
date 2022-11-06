import create from 'zustand';
import {persist} from 'zustand/middleware';

const useConfig = create(
    persist(
        (set, get) => ({
            userConfig: {},
            email: '',
            updateConfig: (params: any) => {
                set((state: any) => ({
                    userConfig: {
                        ...state.userConfig,
                        ...params
                    }
                }));
            },
            setupUser: (params: any) => {
                set(() => {
                    return ({
                        email: params.email,
                        userConfig: {
                            ...params.config
                        }
                    });
                });
            },
            clearConfig: () => {
                set(() => ({
                    userConfig: {}
                }))
            }
        }),
        {name: 'food-saver-user-configuration'}
    )
);
export default useConfig;