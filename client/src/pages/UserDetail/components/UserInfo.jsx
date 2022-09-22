import React, { useEffect, useState } from 'react';
import { FormControlLabel, Paper } from '@mui/material';
import styled from '@emotion/styled';
import LabelAndContentBox from '../../../components/LabelAndContentBox';

const UserInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const {
    id,
    uuid,
    photo,
    name,
    email,
    age,
    gender_origin,
    birth_date,
    phone_number,
    address,
    detail_address,
    last_login,
    created_at,
    updated_at,
  } = userInfo;

  const gender = gender_origin === 1 || gender_origin === 3 ? '남성' : '여성';

  return (
    <ContainerPaper square elevation={2}>
      <table>
        <caption>회원정보</caption>
        <tbody>
          <tr>
            <th>프로필 사진</th>
            <td>
              <img src={photo} alt="프로필 사진" />
            </td>
            <LabelAndContentBox label="이름" content={name} />
            <LabelAndContentBox label="이메일" content={email} />
            <LabelAndContentBox label="나이" content={age} />
            <LabelAndContentBox label="성별" content={gender} />
          </tr>
          <tr>
            <LabelAndContentBox label="생년월일" content={birth_date} contentColSpan="3" />
            <LabelAndContentBox label="전화번호" content={phone_number} contentColSpan="5" />
          </tr>
          <tr>
            <LabelAndContentBox label="주소" content={address} contentColSpan="3" />
            <LabelAndContentBox label="상세주소" content={detail_address} contentColSpan="5" />
          </tr>
          <tr>
            <LabelAndContentBox label="최근 로그인 시간" content={last_login} contentColSpan="3" />
            <LabelAndContentBox label="생성 시간" content={created_at} contentColSpan="2" />
            <LabelAndContentBox label="수정 시간" content={updated_at} contentColSpan="2" />
          </tr>
        </tbody>
      </table>

      {/* <div>
        <div>
          <img src={photo} alt="프로필 사진" />
        </div>
        <div>
          <LabelAndContentBox>
            <div>이름 </div>
            <div>{name}</div>
          </LabelAndContentBox>
          <LabelAndContentBox>이메일: {email}</LabelAndContentBox>
          <LabelAndContentBox>나이: {age}</LabelAndContentBox>
          <LabelAndContentBox>성별: {gender}</LabelAndContentBox>
        </div>
      </div>
      <div>
        <div>생년월일: {birth_date}</div>
        <div>전화번호: {phone_number}</div>
      </div>
      <div>
        <div>주소: {address}</div>
        <div>상세주소: {detail_address}</div>
      </div>
      <div>
        <div>최근 로그인 시간: {last_login}</div>
        <div>생성 시간: {created_at}</div>
        <div>수정 시간: {updated_at}</div>
      </div> */}
    </ContainerPaper>
  );
};

export default UserInfo;

const ContainerPaper = styled(Paper)`
  margin: 10px;

  & > table {
    margin: 0 auto;
    width: 100%;
    border: 1px solid #219ebc;
    border-collapse: collapse;
  }

  & tr {
    height: 80px;
    border: 1px solid grey;
  }

  & th {
    background-color: #023047;
    border: 1px solid #219ebc;
    color: #fb8500;
    min-width: 50px;
  }

  & td {
    border: 1px solid #219ebc;
    min-width: 50px;
    text-align: center;
  }
`;

// const LabelAndContentBox = styled.div`
//   width: 100px;
//   height: 100px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// `;