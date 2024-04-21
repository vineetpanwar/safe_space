import React, { FC } from 'react';
import { useRouter } from 'next/router';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { FaAngleRight } from "react-icons/fa";
import assessment from '../../../mocks/mock_assessment.json'
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const HealthcareAssessment = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb max-h-screen overflow-y-auto">
      <SafeSpaceLogoBanner />
      <h1 className="text-2xl text-center my-6 mt-[5rem]">Below is the list of assessments and the quetions, feel free to edit and save</h1>
      <div className='w-[80%] flex flex-col align-center gap-3'>
        {
            Object.entries(assessment).map((curr,index) => {
                return ( 
                <div key={index} tabIndex={index} className="collapse collapse-arrow border border-base-300 bg-purple-600">
                <div className="collapse-title text-xl font-medium">
                {curr[0]}
                </div>
                <div className="collapse-content"> 
                <div className='mb-[2rem] flex '>
                <FaPlus className='h-[30px] w-[30px] ml-auto mr-2 '/>
                <AiOutlineDelete className='h-[30px] w-[30px] ml-2'/>
                <MdEdit className='h-[30px] w-[30px] ml-2'/>
                </div>
                    { Object.entries(curr[1]).map((currr,index) => {
                        return (<>
                        <div className='w-full'>
                
                            <span><b>{currr[1].QID}</b></span> <span><b>{currr[1].QuestionText}</b></span>
                            <div className='ml-auto flex'><AiOutlineDelete className='ml-auto h-[30px] w-[30px]'/><MdEdit className='h-[30px] w-[30px]'/></div>
                        </div>
                            <ul className="menu rounded-box">
                                {currr[1].Options.map((curr,index) => {
                                    return (<>
                                    <li><a><span>{curr.optionId}</span> <span>{curr.optionText}</span></a></li>
                                    </>
                                    )
                                })}
                            </ul>
                        </>
                        )
                    }) }
                    
                </div>
            </div>)
            })
        }
        </div>
        <button 
        className="btn btn-lg btn-outline mt-[2rem] w-[50%] text-[#fff] hover:bg-[#230C59] hover:text-[#fff] hover:border-[#fff]" 
        onClick={() => {router.push('/healthcare');}}
      >
        Save <FaAngleRight className='ml-auto'/>
      </button>
      </div>
  );
};

export default HealthcareAssessment;
