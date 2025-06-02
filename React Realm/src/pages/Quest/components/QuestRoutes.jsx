import { useParams } from "react-router-dom"
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Lesson from "./Lesson";
import Quiz from "./Quiz";

const QuestRoutes = () => {
  const id = useParams().id
  const db = getFirestore();
  const [questDetail, setQuestDetail] = useState()
  const [isLoading, setIsLoading] = useState(false)

  async function getQuestById() {
    try {
      setIsLoading(true)
      const q = doc(collection(db, "questList"), id);
      const questData = await getDoc(q);
      if (questData.exists()) setQuestDetail(questData.data())
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getQuestById();
  }, [id])
  
  return(
    <>
      {questDetail?.type === "lesson" && <Lesson data={questDetail} loading={isLoading}/>}
      {questDetail?.type === "quiz" && <Quiz data={questDetail} loading={isLoading}/>}
    </>
  )
}

export default QuestRoutes