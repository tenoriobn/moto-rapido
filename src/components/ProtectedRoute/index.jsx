import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateUserDate } from "src/store/atom.js";
import { useNavigate } from "react-router-dom";
import { getCookieData } from "src/services/cookieService";

export default function ProtectedRoute({ element }) {
  const [userData, setUserData] = useRecoilState(stateUserDate);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataInfo = getCookieData('userDataInfo');
    
    if (userDataInfo) {
      setUserData(userDataInfo);
    } else {
      navigate('/', { replace: true });
    }
  }, [setUserData, navigate]);


  if (!userData.token) {
    return null;
  }

  return element;
}
