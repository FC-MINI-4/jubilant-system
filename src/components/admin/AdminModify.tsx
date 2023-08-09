import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DropdownFilter from '@/components/admin/AdminDropDownFilter';
import { MODIFY_DEPARTMENT, MODIFY_POSITION } from '@/constants/option';
import {
  IManageResProps,
  IModifyDetailProps,
  IModifyReqProps
} from '@/types/IAdmin';
import reqManage from '@/api/admin/manage';
import modifyDetail from '@/api/admin/modifyDetail';
import Loading from '@/components/common/Loading';
import modifyRes from '@/api/admin/modify';
import Button from '@/components/common/Button';

export default function AdminModify() {
  const [isLoading, setIsLoading] = useState(true);
  const [modifyEmployees, setModifyEmployees] = useState<IManageResProps[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    employeeId: 0,
    department: '순양그룹',
    position: '회장',
    name: '진양철',
    phone: '010-1234-1234',
    hireDate: '1943-10-06',
    email: 'jinyc@naver.com'
  });
  const [employeeId, setEmployeeId] = useState<number>(1);
  const [department, setDepartment] = useState<string>('순양자동차');
  const [position, setPosition] = useState<string>('사원');
  const [profileImage, setProfileImage] = useState<File>();
  const [name, setName] = useState<string>('테스트유저1');
  const [phone, setPhone] = useState<string>('010-1234-1234');
  const [hireDate, setHireDate] = useState<string>('2023-11-22');
  const [email, setEmail] = useState('jinyc@naver.com');

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      (employeeId && department && hireDate && name && phone && position) ||
      profileImage
    ) {
      try {
        const data = {

          employeeId: selectedEmployee.employeeId,
          department: selectedEmployee.department,
          hireDate: selectedEmployee.hireDate,
          name: selectedEmployee.name,
          phone: selectedEmployee.phone,
          position: selectedEmployee.position
        };

        const formData = new FormData();

        formData.append(

          'employeeInfoRequest',
          new Blob([JSON.stringify(data)], { type: 'application/json' })
        );

        formData.append('profileImagePath', profileImage as File);
          'key',
          new Blob([JSON.stringify(data)], { type: 'application/json' })
        );

        formData.append('file', JSON.stringify(profileImage));
        
        const response = await modifyRes(formData);

        alert(response.message);
      } catch (error) {
        alert('수정에 실패했습니다.');
      }
    } else {
      alert('수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      const response = await reqManage();
      setModifyEmployees(response.data || []);
    };
    {
      setTimeout(() => setIsLoading(false), 500);
    }
    fetchEmployees();
  }, []);

  const handleButtonClick = async (employee: IManageResProps) => {
    const response = await modifyDetail(employee.employeeId);
    setIsLoading(true);
    if (response.success && response.data) {
      const { employeeId, department, name, position, email, phone, hireDate } =
        response.data;

      setSelectedEmployee({
        employeeId,
        department,
        position,
        name,
        email,
        phone,
        hireDate
      });
      {
        setTimeout(() => setIsLoading(false), 500);
      }
    }
  };
  //이미지
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        setProfileImage(file);
        setPreviewImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      name: value
    }));
  };

  const handleHireDateChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      hireDate: value
    }));
  };

  const handleEmailChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      email: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      phone: value
    }));
  };

  const handlePositionChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      position: value
    }));
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      department: value
    }));
  };

  <input
    value={selectedEmployee.hireDate}
    onChange={e => handleHireDateChange(e.target.value)}
    className="border-b-2 border-gray-200 pt-2 w-[20rem] focus:border-primary rounded-sm outline-none text-md"
  />;

  return (
    <div className="ml-[3rem] h-[37rem] w-[92rem] flex">
      <div className=" h-[37rem] w-[25rem] border-2  border-primaryHover overflow-auto border-soild rounded-xl">
        <div className="w-[25rem] h-[2.5rem] flex bg-primary sticky top-0 z-10 ">
          <div className="w-[5rem] border-r-2 border-white h-[2,5rem] "></div>
          <div className="w-[10rem] border-r-2 border-white h-[2.5rem] justify-center items-center flex text-white">
            사원ID
          </div>
          <div className="w-[10rem] h-[2.5rem] flex justify-center items-center text-white ">
            이름
          </div>
        </div>

        {modifyEmployees.map((employee, index) => (
          <button
            key={employee.employeeId}
            onClick={() => handleButtonClick(employee)}
            className="w-[25rem] h-[2.5rem] flex border-b-2 border-primaryHover mt-[0.2px] focus:bg-subHover">
            <div className="w-[5rem] border-r-2 h-[2.5rem]  border-primaryHover justify-center items-center flex  ">
              {index + 1}
            </div>
            <div className="w-[10rem] border-r-2 border-primaryHover h-[2.5rem] justify-center items-center flex ">
              {employee.employeeId}
            </div>
            <div className="w-[10rem] h-[2.5rem] flex justify-center items-center ">
              {employee.name}
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <div className="h-[30rem] w-[20rem] ml-[3rem]">
          <div className=" h-[20rem] w-[20rem]  border-2 border-primaryHover  border-soild rounded-xl flex items-center justify-center ">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="프로필 이미지 미리보기"
                width={600}
                height={600}
                className="rounded-xl"
              />
            ) : null}

            <div className="flex  items-center  justify-center  font-semibold"></div>
          </div>
          <div className="w-[20rem] h-[3rem] flex items-center justify-center">
            <label
              htmlFor="imageUpload"
              className=" text-lg font-semibold hover:cursor-pointer">
              이미지를 선택해주세요
            </label>
            <input
              id="imageUpload"
              className="hidden"
              type="file"
              accept="image/jpeg, image/png, image/gif, image/svg+xml"
              name="file"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="ml-[3rem] h-[37rem] w-[30rem] border-2 border-primaryHover border-soild rounded-xl  ">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>
                <div className=" m-6 ml-16 mt-4 ">
                  <div className="text-md font-semibold ">이름</div>
                  <input
                    value={selectedEmployee.name}
                    onChange={e => handleNameChange(e.target.value)}
                    className="w-[20rem]  border-b-2 border-gray-200 pt-2 outline-none rounded-sm  focus:border-primary text-md"
                  />
                </div>

                <div className=" m-6 mt-4 ml-16">
                  <div className="text-md font-semibold ">계열사</div>
                  <div className="font-small w-[21rem] pt-2 border-b-2 border-gray-200 text-md pl-[-2rem] flex ">
                    <DropdownFilter
                      options={MODIFY_DEPARTMENT}
                      value={selectedEmployee.department}
                      onChange={handleDepartmentChange}
                    />
                  </div>
                </div>
              </div>

              <div className="  ml-16 mt-4 ">
                <div className="text-md font-semibold ">직급</div>
                <div className="font-small w-[21rem]  border-b-2 pt-2   border-gray-200 text-md ">
                  <DropdownFilter
                    options={MODIFY_POSITION}
                    value={selectedEmployee.position}
                    onChange={handlePositionChange}
                  />
                </div>
              </div>
              <div className=" m-6 mt-4 ml-16 ">
                <div className="text-md font-semibold ">입사일</div>
                <input
                  value={selectedEmployee.hireDate}
                  className="  border-b-2 border-gray-200 pt-2  w-[20rem] focus:border-primary rounded-sm outline-none text-md"
                  onChange={e => handleHireDateChange(e.target.value)}
                />
              </div>

              <div className=" m-6 mt-4 ml-16 ">
                <div className="text-md font-semibold ">이메일</div>
                <input
                  value={selectedEmployee.email}
                  className=" border-b-2 border-gray-200 pt-2  w-[20rem] focus:border-primary rounded-sm outline-none text-md"
                  onChange={e => handleEmailChange(e.target.value)}></input>
              </div>
              <div className=" m-6 ml-16 mt-4  ">
                <div className="text-md font-semibold ">전화번호</div>
                <input
                  value={selectedEmployee.phone}
                  className="  border-b-2 border-gray-200 pt-2 w-[20rem] focus:border-primary rounded-sm outline-none text-md"
                  onChange={e => handlePhoneChange(e.target.value)}
                />
              </div>
              <div className="w-[30rem justify-center  flex">
                <div className="w-[8rem]  ">
                  <Button contents="수정" submit />
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
