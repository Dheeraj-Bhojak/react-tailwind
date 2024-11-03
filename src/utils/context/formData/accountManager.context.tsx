import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/user.selectors";

interface AccountManagerProviderProps {
  children: ReactNode;
}

interface ProfilePictureInterface {
  id: number;
  img_name: string;
  img_url: string;
  is_active: true;
}

interface userInterface {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: ProfilePictureInterface | null;
}

export interface accountManager {
  id: number;
  admin_role: string;
  user: userInterface;
}

interface AccountManagerContextProp {
  am1: accountManager[];
  am2: accountManager[];
  am3: accountManager[];
}

export const AccountManagerDataContext = createContext<{
  amState: AccountManagerContextProp;
}>({
  amState: {
    am1: [],
    am2: [],
    am3: [],
  },
});

export const AccountManagerProvider: React.FC<AccountManagerProviderProps> = ({
  children,
}) => {
  const [am1, setAm1] = useState<accountManager[]>([]);
  const [am2, setAm2] = useState<accountManager[]>([]);
  const [am3, setAm3] = useState<accountManager[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchFormData, setFetchFormData] = useState<boolean>(true);
  const user = useSelector(selectCurrentUser);

  const adminRole = user?.userData?.user?.role?.toLowerCase();
  const accessToken = user?.userData?.token?.access_token;

  useEffect(() => {
    const fetchAccountManagerData = async () => {
      if (accessToken) {
        try {
          const accountManagerDataApi = `${process.env.REACT_APP_API_URL}admin/am-data`;
          const headers = {
            authorization: `Bearer ${accessToken}`,
          };
          const { data } = await axios.get(accountManagerDataApi, { headers });
          if (data) {
            console.log(data);
            setAm1(data.am1);
            setAm2(data.am2);
            setAm3(data.am3);
          }
        } catch (error: any) {
          setError(error);
        }
      }
    };
    if (adminRole === "super_admin") {
      fetchAccountManagerData();
    }
  }, [fetchFormData]);

  const value = {
    amState: {
      am1,
      am2,
      am3,
    },
  };

  return (
    <AccountManagerDataContext.Provider value={value}>
      {children}
    </AccountManagerDataContext.Provider>
  );
};
