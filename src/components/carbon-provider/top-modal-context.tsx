import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

type TopModalContextProps = {
  topModal: HTMLElement | null;
};

const TopModalContext = createContext<TopModalContextProps>({
  topModal: null,
});

export const TopModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [topModal, setTopModal] = useState<HTMLElement | null>(null);

  // can't add the setter to the global list inside useEffect because that doesn't run until
  // after the render. We use a ref to ensure it only runs once.
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    if (!window.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
    }

    window.__CARBON_INTERNALS_MODAL_SETTER_LIST.push(setTopModal);

    isFirstRender.current = false;
  }

  useEffect(() => {
    return () => {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST = window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.filter(
        (setter) => setter !== setTopModal
      );
    };
  }, []);

  return (
    <TopModalContext.Provider value={{ topModal }}>
      {children}
    </TopModalContext.Provider>
  );
};

export default TopModalContext;
