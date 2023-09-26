import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import { useParams } from 'react-router-dom';
import Review from '../../components/Review/index';
import { useGetReviewQuery } from "../../services/review";

interface IReview {
  id: number;
  title: string;
  name: string;
  category: string;
  description: string;
  grade: number;
  genre: string;
  imageLink: string;
  ownerId: number;
}

function ReviewPage() {
  const { data: review } = useGetReviewQuery({});
  const { id } = useParams();
  const [rev, setRev] = useState<IReview | null>(null);

  useEffect(() => {
    if (id && review) {
      const found = review.find((item:any) => String(item.id) === id);
      if (found) {
        setRev(found);
      }
    }
  }, [id, review]);

  return (
    <>
      <Header />
      {rev && <Review review={rev} />}
    </>
  );
}

export default ReviewPage;
