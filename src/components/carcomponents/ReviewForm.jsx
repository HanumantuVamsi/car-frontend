import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { MdStar } from 'react-icons/md';
import { useParams } from 'react-router-dom';

//this is review form for cars
const ReviewForm = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const { carId } = useParams();

  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError(''); // Clear error message when user starts editing
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
    setSubmitError(''); // Clear error message when user starts editing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/api/review/${carId}`,
        {
          rating: formData.rating,
          comment: formData.comment,
        });

      navigate(`/booking`);

    } catch (error) {
      setSubmitError('Failed to submit review. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-400">Submit Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Rating
            </label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStar
                  key={star}
                  size={24}
                  onClick={() => handleRatingChange(star)}
                  className={formData.rating >= star ? 'text-yellow-500' : 'text-gray-400'}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-white">
              Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            ></textarea>
          </div>
          {submitError && <p className="text-red-500">{submitError}</p>}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md duration-300 hover:scale-90"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
