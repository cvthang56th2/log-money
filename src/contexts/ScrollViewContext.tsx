import {createContext, FC, ReactNode, RefObject} from 'react';

interface ScrollViewContextProps {
  scrollViewRef: RefObject<ScrollView> | null;
}

export const ScrollViewContext = createContext<
  ScrollViewContextProps | undefined
>(undefined);

interface ScrollViewProviderProps {
  children: ReactNode;
  scrollViewRef: any;
}

export const ScrollViewProvider: FC<ScrollViewProviderProps> = ({
  children,
  scrollViewRef,
}) => {
  return (
    <ScrollViewContext.Provider value={{scrollViewRef}}>
      {children}
    </ScrollViewContext.Provider>
  );
};
