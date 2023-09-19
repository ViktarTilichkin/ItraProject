import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import { useParams } from 'react-router-dom';
import storage from '../../storage/films.json';
import Review from '../../components/Review/index';

interface IReviewData {
  id: number;
  title: string;
  name: string;
  category: string;
  description: string;
  grade: string;
  genre: string;
}

function ReviewPage() {
  const [review, setReview] = useState<IReviewData>();

  const { id } = useParams();

  useEffect(() => {
    const found = storage.find((item) => String(item.id) === id);
    setReview(found);
  }, [id]);

  return (
    <>
      <Header />

      {review && <Review review={review} />}
    </>
  );
}

export default ReviewPage;
