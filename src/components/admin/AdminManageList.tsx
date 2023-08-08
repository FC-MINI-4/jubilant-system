import React, { useState, useEffect } from 'react';
import {
  ISideBarProps,
  IFilterProps,
  IDayOffDetailResProps,
  IManageResProps,
  IDutyDetailResProps
} from '@/types/IAdmin';
import Pagination from '@/components/common/Pagination';
import { IPaginationProps } from '@/types/ICommon';
import ManageModal from '@/components/common/ManagerModal';
import { useRecoilState } from 'recoil';
import { manageState } from '@/recoil/common/modal';
import reqManage from '@/api/admin/manage';
import detailDayOff from '@/api/admin/modalDayOff';
import detailDuty from '@/api/admin/modalDuty';
import Loading from '@/components/common/Loading';

export default function EmployeeList({
  selectedDepartment,
  selectedPosition,
  searchValue,
  currentPage,
  onPageChange
}: ISideBarProps & IFilterProps & IPaginationProps) {
  const [employees, setEmployees] = useState<IManageResProps[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IManageResProps[]>(
    []
  );
  const [dayOffDetails, setDayOffDetails] = useState<IDayOffDetailResProps[]>(
    []
  );
  const [dutyDetails, setDutyDetails] = useState<IDutyDetailResProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);
  const [isManageShow, setIsManageShow] = useRecoilState(manageState);

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      const response = await reqManage();
      setEmployees(response.data || []);
    };
    {
      setTimeout(() => setIsLoading(false), 500);
    }
    fetchEmployees();
  }, []);

  const handleDayOffDetails = async (employeeId: number) => {
    const res = await detailDayOff(employeeId);
    const dayOffDetail = res.data || [];

    if (dayOffDetail.length > 0) {
      setDayOffDetails(dayOffDetail);
      setIsManageShow(true);
    } else {
      alert('해당 직원의 휴가 내역이 없습니다.');
    }
  };

  const handleDutyDetails = async (employeeId: number) => {
    const res = await detailDuty(employeeId);
    const dutyDetail = res.data || [];

    if (dutyDetail.length > 0) {
      setDutyDetails(dutyDetail);
      setIsManageShow(true);
    } else {
      alert('해당 직원의 당직 내역이 없습니다.');
    }
  };

  useEffect(() => {
    const filterEmployees = () => {
      let newFilteredEmployees = employees;

      if (selectedDepartment !== '계열사') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.department === selectedDepartment
        );
      }

      if (selectedPosition !== '직급') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.position === selectedPosition
        );
      }

      if (searchValue !== '') {
        newFilteredEmployees = newFilteredEmployees.filter(employee =>
          employee.name.includes(searchValue.trim())
        );
      }

      setFilteredEmployees(newFilteredEmployees);
    };
    filterEmployees();
  }, [selectedDepartment, selectedPosition, searchValue, employees]);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <>
      {isManageShow && (
        <>
          {dayOffDetails.map((detail, dayOffId) => (
            <ManageModal
              key={dayOffId}
              type={detail.type}
              date={`${detail.startDate} ~ ${detail.endDate}`}
              value={detail.reason}
            />
          ))}
          {dutyDetails.map(detail => (
            <ManageModal
              key={detail.dutyId}
              type={detail.type}
              date={detail.date}
              value={detail.status}
            />
          ))}
        </>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentPageData.map(employee => (
            <div
              key={employee.employeeId}
              className="flex justify-between border-solid border-b-[1px] h-[50px] items-center">
              <div className="w-[13.5rem] text-center">{employee.name}</div>
              <div className="w-[7rem] text-center">{employee.department}</div>
              <div className="w-[7rem] ml-2 mr-4 text-center">
                {employee.position}
              </div>
              <div className="text-center w-[10rem]">{employee.hireDate}</div>
              <div className="w-[10rem] flex justify-center">
                <button
                  className="w-[10rem] text-center hover:underline text-secondaryGray"
                  onClick={() => handleDayOffDetails(employee.employeeId)}>
                  상세보기
                </button>
              </div>
              <div className="w-[10rem] justify-center flex">
                <button
                  className="w-[10rem] text-center hover:underline text-secondaryGray"
                  onClick={() => handleDutyDetails(employee.employeeId)}>
                  상세보기
                </button>
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffTotal}일
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffUsed}일
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffRemains}일
              </div>
            </div>
          ))}
        </>
      )}
      <div className="flex items-end justify-center mt-[2rem]  ">
        <Pagination
          pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
