import React, { useState } from 'react';
import { IMainProps } from '@/types/IAdmin';
import MainHeader from '@/components/admin//AdminMainHeader';
import SideBar from '@/components/admin//AdminSideBar';
import DropdownFilter from '@/components/admin/AdminDropDownFilter';
import RequestList from '@/components/admin/AdminRequestList';
import EmployeeList from '@/components/admin/AdminManageList';
import CustomPicker from '@/components/common/CustomPicker';
import AdminModify from '@/components/admin/AdminModify';
import { RecoilRoot } from 'recoil';

import {
  EMPLOYEE_POSITION,
  DUTY_REQUEST,
  DEPARTMENT,
  STATUS,
  REST_REQUEST
} from '@/constants/option';

export default function Main({ page }: IMainProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>('계열사');
  const [selectedPosition, setSeletedPosition] = useState<string>('직급');
  const [selectedStatus, setSelectedStatus] = useState<string>('상태');
  const [selectedRest, setSelectedRest] = useState<string>('요청');
  const [selectedDuty, setSelectedDuty] = useState<string>('요청');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [profileImage, setProfileImage] = useState('');

  const itemsPerPage = 10;

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleRestChange = (value: string) => {
    setSelectedRest(value);
  };

  const handleDutyChange = (value: string) => {
    setSelectedDuty(value);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handlestatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handlePositionChange = (value: string) => {
    setSeletedPosition(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevIsSidebarOpen => !prevIsSidebarOpen);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          const str = base64?.toString();
          if (str && str.length > 1048576) {
            alert('이미지는 1MB이하여야합니다!');
            return;
          }
          setProfileImage(base64.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RecoilRoot>
      <div className="w-[96rem] h-[52.25rem] bg-white mx-auto my-auto rounded-2xl ">
        <MainHeader onToggleSidebar={handleToggleSidebar} />
        <div className=" flex">
          {isSidebarOpen && <SideBar />}
          <div className="">
            <div className="w-[12rem] h-[2rem]  font-400 mb-[4rem] text-3xl flex ml-[3.5rem] mt-[2rem] font-semibold ">
              {page === 'admin-manage' && '관리'}
              {page === 'admin-leave' && '연차요청관리'}
              {page === 'admin-duty' && '당직요청관리'}
              {page === 'admin-modify' && '사원정보수정'}
            </div>

            {(page === 'admin-duty' || page === 'admin-leave') && (
              <div className="mb-[2rem] ml-[3rem] font-semibold text-4xl">
                <CustomPicker />
              </div>
            )}

            <div className={`${isSidebarOpen ? '' : 'ml-[3rem]'}`}>
              <>
                {page !== 'admin-modify' && (
                  <div
                    className={`flex border-solid border-b-2 justify-between h-[3rem]  items-center text-lg font-medium `}>
                    {(page === 'admin-duty' || page === 'admin-leave') && (
                      <>
                        {page === 'admin-duty' && (
                          <div className="flex justify-center ml-4 w-[7rem]">
                            <DropdownFilter
                              options={DUTY_REQUEST}
                              value={selectedDuty}
                              onChange={handleDutyChange}
                            />
                          </div>
                        )}

                        {page === 'admin-leave' && (
                          <div className="flex justify-center ml-4 w-[7rem]">
                            <DropdownFilter
                              options={REST_REQUEST}
                              value={selectedRest}
                              onChange={handleRestChange}
                            />
                          </div>
                        )}

                        <div className="w-[12rem] flex justify-center ">
                          이름:
                          <input
                            className="w-[5rem] ml-2 border-solid border-2 border-gray-400 rounded-md text-center h-[1.8rem] "
                            type="text"
                            placeholder="사원검색"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                        </div>
                        <div className="flex justify-center w-[7rem]">
                          <DropdownFilter
                            options={DEPARTMENT}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                          />
                        </div>
                        <div className="flex justify-center ml-2 w-[6rem]">
                          <DropdownFilter
                            options={EMPLOYEE_POSITION}
                            value={selectedPosition}
                            onChange={handlePositionChange}
                          />
                        </div>
                        <div className="text-center pr-2 w-[13rem]">입사일</div>
                        <div className="w-[19rem] pr-14 text-center">
                          요청내역
                        </div>
                        <div className="flex justify-center w-[6rem]">
                          <DropdownFilter
                            options={STATUS}
                            value={selectedStatus}
                            onChange={handlestatusChange}
                          />
                        </div>
                        <div className="w-[13rem]  text-center ">관리</div>
                      </>
                    )}

                    {page === 'admin-manage' && (
                      <>
                        <div className="w-[9rem] ml-[3rem] mr-4 text-center">
                          이름:
                          <input
                            className="w-[5rem] ml-2 border-solid border-2 border-gray-400 rounded-md text-center h-[1.8rem] "
                            type="text"
                            placeholder="사원검색"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                        </div>
                        <div className="flex justify-center w-[8rem]">
                          <DropdownFilter
                            options={DEPARTMENT}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                          />
                        </div>
                        <div className="flex justify-center w-[8rem]">
                          <DropdownFilter
                            options={EMPLOYEE_POSITION}
                            value={selectedPosition}
                            onChange={handlePositionChange}
                          />
                        </div>
                        <div className="text-center w-[10rem]">입사일</div>
                        <div className="w-[10rem] text-center">연차내역</div>
                        <div className="w-[10rem] text-center">당직내역</div>
                        <div className="w-[10rem] text-center">총연차</div>
                        <div className="w-[10rem] text-center">사용연차</div>
                        <div className="w-[10rem]  text-center">잔여연차</div>
                      </>
                    )}
                  </div>
                )}
              </>
              <>
                {page === 'admin-modify' && (
                  <AdminModify
                    profileImage={profileImage}
                    handleChangeFile={handleChangeFile}
                    selectedDepartment={selectedDepartment}
                    handleDepartmentChange={handleDepartmentChange}
                    selectedPosition={selectedPosition}
                    handlePositionChange={handlePositionChange}
                  />
                )}
              </>

              <div>
                {page === 'admin-duty' && (
                  <RequestList
                    page={page}
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    selectedDuty={selectedDuty}
                    selectedStatus={selectedStatus}
                    searchValue={searchValue}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
              <div>
                {page === 'admin-leave' && (
                  <RequestList
                    page={page}
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    selectedRest={selectedRest}
                    selectedStatus={selectedStatus}
                    searchValue={searchValue}
                    currentPage={currentPage}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
              <div>
                {page === 'admin-manage' && (
                  <EmployeeList
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    searchValue={searchValue}
                    currentPage={currentPage}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
