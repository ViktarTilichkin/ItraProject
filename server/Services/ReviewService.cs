using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReviewService : IReviewService
{
    private readonly AppDbContent _dbContext;

    public ReviewService(AppDbContent db)
    {
        _dbContext = db;
    }

    public async Task<IEnumerable<Review>> GetAllReviews()
    {
        return await _dbContext.Reviews.ToListAsync();
    }

    public async Task<Review> GetReviewById(int id)
    {
        return await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task CreateReview(Review review)
    {
        _dbContext.Reviews.Add(review);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateReview(Review review)
    {
        var existingReview = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == review.Id);
        if (existingReview != null)
        {
            existingReview.Title = review.Title;
            existingReview.Name = review.Name;
            existingReview.Category = review.Category;
            existingReview.Description = review.Description;
            existingReview.Grade = review.Grade;
            existingReview.Genre = review.Genre;
            existingReview.ImageLink = review.ImageLink;

            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteReview(int id)
    {
        var review = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
        if (review != null)
        {
            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();
        }
    }
}
