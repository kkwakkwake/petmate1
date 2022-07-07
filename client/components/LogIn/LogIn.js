import Link from "next/link";
import Router from "next/router";
import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import {
  LogInContainer,
  FormWrapper,
  InputWrapper,
  UserInput,
  LoginBtn,
  GoogleBtn,
  KakaoBtn,
  CheckInput,
} from "./styled";

const LogIn = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLoginSubmit = useCallback(() => {
    const emailregExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailregExp.test(email) === false || !email) {
      setEmail("");
      emailRef.current.focus();
      return setEmailIsValid(false);
    }
    if (!password) {
      return passwordRef.current.focus();
    }
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  const handleLoginEmail = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(true);
  };

  // useEffect(() => {
  //   if (me) {
  //     Router.push("/");
  //   }
  // }, [me]);

  return (
    <LogInContainer>
      <h1>로그인</h1>
      <FormWrapper>
        <InputWrapper>
          <label>이메일</label>
          <UserInput
            type="email"
            value={email}
            ref={emailRef}
            onChange={handleLoginEmail}
          ></UserInput>
          {!emailIsValid && (
            <CheckInput color="red">유효하지 않은 이메일입니다.</CheckInput>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <UserInput
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          ></UserInput>
        </InputWrapper>
        <LoginBtn onClick={handleLoginSubmit}>로그인</LoginBtn>
        <GoogleBtn>구글 로그인</GoogleBtn>
        <KakaoBtn>카카오 로그인</KakaoBtn>
      </FormWrapper>
      <p>
        <Link href="/signup">
          <a>아직 아이디가 없으신가요? 회원가입 하러가기</a>
        </Link>
      </p>
    </LogInContainer>
  );
};

export default LogIn;
