import AppLayout from "../../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { loadMyProfileRequestAction, loadProfileRequestAction, loadUserInfoRequestAction } from "../../reducers/user";
import { useEffect } from "react";
import KakaoProfile from "../../components/MyProfile/KakaoProfile";

const Kakao = () => {
  const dispatch = useDispatch();
  const { userInfo, setProfileError, setProfileDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUserInfoRequestAction());
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.active) {
      dispatch(loadMyProfileRequestAction())
    }
  }, [userInfo]);

  return (
    <>
      <AppLayout>
        <KakaoProfile />
      </AppLayout>
    </>
  );
};

export default Kakao;
