import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { rPassword } from '@/constants/constants';
import AuthValidCheck from '@/components/auth/sign-up/AuthValidCheck';

export default function AuthChangePwInput() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setComfirmPw] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };

  const handleConfirmPwChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComfirmPw(event?.target.value);
  };

  // 현재 비밀번호 형식 유효성 체크
  const currentPasswordCheck = () => {
    if (currentPassword.trim() === '') {
      return true;
    }
    return rPassword.test(password);
  };

  // 비밀번호 형식 유효성 체크
  const passwordCheck = () => {
    if (password.trim() === '') {
      return true;
    }
    return rPassword.test(password);
  };

  // 비밀번호 확인 유효성 체크
  const confirmPasswordCheck = () => {
    if (confirmPw.trim() === '' && confirmPw.length > 0) {
      return false;
    }
    return password === confirmPw;
  };

  // 비밀번호 변경 버튼 활성화 여부
  const isDisabled =
    passwordCheck() &&
    confirmPasswordCheck() &&
    password.length > 7 &&
    password.length < 17;

  // 유효성 검사
  const renderCheck = (isPassword: boolean) => {
    if (isPassword) {
      return <AuthValidCheck valid={passwordCheck()} name={'password'} />;
    } else {
      return (
        <AuthValidCheck
          valid={confirmPasswordCheck()}
          name={'confirmPassword'}
        />
      );
    }
  };
  return (
    <>
      <div className="sm:mb-8 mb-8">
        <Input
          label={'새로운 비밀번호'}
          name={'email'}
          onChange={handlePasswordChange}
          placeholder={'영문+숫자, 8자리 이상 16자리 이하'}
          type="password"
          valid={passwordCheck()}
        />
        {renderCheck(true)}
      </div>
      <div className="sm:mb-8 mb-8">
        <Input
          label={'비밀번호 확인'}
          name={'email'}
          onChange={handleConfirmPwChange}
          placeholder={'비밀번호를 한번 더 입력해주세요.'}
          type="password"
          valid={confirmPasswordCheck()}
        />
        {renderCheck(false)}
      </div>
      <Button contents={'변경하기'} disabled={!isDisabled} />
  const handleChangePw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestChangePw({
        password: password,
        confirmPassword: confirmPassword
      });
      if (response.status === 200) {
        if (!response.data.success) {
          alert(response.data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleChangePw}>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'새로운 비밀번호'}
            name={'password'}
            onChange={handlePasswordChange}
            placeholder={'영문+숫자, 8자리 이상 16자리 이하'}
            type="password"
          />
          {renderCheck(true)}
        </div>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'새로운 비밀번호'}
            name={'password'}
            onChange={handlePasswordChange}
            placeholder={'영문+숫자, 8자리 이상 16자리 이하'}
            type="password"
            valid={passwordCheck()}
          />
          {renderCheck(true)}
        </div>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'비밀번호 확인'}
            name={'password'}
            onChange={handleConfirmPwChange}
            placeholder={'비밀번호를 한번 더 입력해주세요.'}
            type="password"
            valid={confirmPasswordCheck()}
          />
          {renderCheck(false)}
        </div>
        <Button contents={'변경하기'} disabled={!isDisabled} submit />
      </form>
    </>
  );
}
