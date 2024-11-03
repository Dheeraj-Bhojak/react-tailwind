import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface nicheInterface {
  id: number;
  niche_name: string;
}

interface LanguageInterface {
  id: number;
  language_name: string;
}

interface locationDataInterface {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
}

interface FormDataProviderProps {
  children: ReactNode;
}

interface FromDataContextProp {
  niche: nicheInterface[];
  locationData: locationDataInterface[];
  languageData: LanguageInterface[];
}

export const FormDataContext = createContext<{
  state: FromDataContextProp;
}>({
  state: {
    niche: [],
    locationData: [],
    languageData: [],
  },
});

export const FormDataProvider: React.FC<FormDataProviderProps> = ({
  children,
}) => {
  const [niche, setNiche] = useState<nicheInterface[]>([]);
  const [locationData, setLocationData] = useState<locationDataInterface[]>([]);
  const [languageData, setLanguageData] = useState<LanguageInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchFormData, setFetchFormData] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDataConstantsApi = `${process.env.REACT_APP_API_URL}admin/profile_form-data`;
        const { data } = await axios.get(formDataConstantsApi);
        if (data) {
          setNiche(data.niches_categories);
          setLocationData(data.geoLocation);
          setLanguageData(data.languages);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFormData]);

  const value = {
    state: {
      niche,
      locationData,
      languageData,
    },
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};
