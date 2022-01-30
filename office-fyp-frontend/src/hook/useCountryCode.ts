import { useEffect, useState } from "react";

import { CountryCodeType } from "types/CommonType";
import { CommonApi } from "api/CommonApi";

const useCountryCode = () => {
  const [response, setResponse] = useState<CountryCodeType[]>();
  const [error, setError] = useState("");
    const [loading, setloading] = useState(true);
    useEffect(() => {
      fetchData();
    }, []);

  const fetchData = async () => {
    const { data } = await CommonApi.getCountryCode();
    if (data.status === 801 && data.response.length > 0) {
      setResponse(data.response);
    } else {
      setError("something wrong");
      }
      setloading(false)
    };
        return { response, error, loading };
    
};

export default useCountryCode