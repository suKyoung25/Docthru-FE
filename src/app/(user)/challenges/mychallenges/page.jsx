"use client"

import React, { useEffect, useState } from 'react'
import Container from "@/components/container/PageContainer";
import CallengeContainerd from "../_components/challengeCard/CallengeContainer";
import SearchInput from "@/components/input/SearchInput";
import Profile from "@/components/dropDown/Profile";
import ListHead from '../_components/appliedChallenges/ListHead';
import ListRow from '../_components/appliedChallenges/ListRow';

// key : 필드명, label : 리스트의 타이틀명, flex : 너비 비율, className : 각 셀의 스타일링
const listColumns = [
    { key: "id", label: "No.", flex: 1 , className: "pl-4 " },
    { key: "docType", label: "분야", flex: 1, className: ""  },
    { key: "category", label: "카테고리", flex: 1.2, className: ""  },
    { key: "title", label: "챌린지 제목", flex: 4, className: "text-gray-700 font-medium"},
    { key: "maxParticipant", label: "인원", flex: 1, className: ""  },
    { key: "createdAt", label: "신청일", flex: 1, className: ""  },
    { key: "updatedAt", label: "마감기한", flex: 1, className: ""  },
    { key: "", label: "상태", flex: 1.2 }
]

function page() {
  const [apiData, setApiData] = useState([]);

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const res = await fetch('http://localhost:8080/challenges');
        const data = await res.json();
        setApiData(data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])
  
  return (
    <Container>
      <ListHead columns={listColumns} />
      {apiData.map((AllChallenges, idx) => (
        <ListRow key={idx} data={AllChallenges} columns={listColumns} />
      ))}
    </Container>
  );
}

export default page