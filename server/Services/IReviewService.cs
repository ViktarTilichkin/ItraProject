using Server.Models;

namespace Server.Services
{
    public interface IReviewService
    {
        Task<IEnumerable<Review>> GetAllReviews();
        Task<Review> GetReviewById(int id);
        Task<int> CreateReview(Review review);
        Task UpdateReview(Review review);
        Task DeleteReview(int id);
    }
}
