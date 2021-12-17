import React, { createContext, useEffect, useState } from "react";

import { User } from "../interfaces/User";
import { MeProps } from "../interfaces/Me";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type GetS3Object = (path: string) => Promise<string>;

interface HeaderProviderProps {
  user?: User;
  profiles?: MeProps;
  companySelected?: string;
  production: boolean;
  api: any;
  getS3Object: GetS3Object;
}

interface HeaderContextProps extends HeaderProviderProps {
  setUser: SetState<User>;
  setProfiles: SetState<MeProps>;
  setCompanySelected: SetState<string>;
  setProduction: SetState<boolean>;
}

interface Props {
  value: HeaderProviderProps;
}

export const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps);

const HeaderProvider: React.FC<Props> = ({ children, value }) => {
  const [user, setUser] = useState(value.user);
  const [profiles, setProfiles] = useState(value.profiles);
  const [companySelected, setCompanySelected] = useState(value.companySelected);
  const [production, setProduction] = useState(value.production);

  useEffect(() => {
    if (value.user) setUser(value.user);
    if (value.profiles) setProfiles(value.profiles);
    if (value.production) setProduction(value.production);
    if (value.companySelected) setCompanySelected(value.companySelected);
  }, [value]);

  const context = {
    user,
    setUser,
    profiles,
    setProfiles,
    companySelected,
    setCompanySelected,
    production,
    setProduction,
    api: value.api,
    getS3Object: value.getS3Object,
  } as HeaderContextProps;

  return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>;
};

export default HeaderProvider;
