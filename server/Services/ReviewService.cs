using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReviewService 
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

    public async Task<int> CreateReview(Review review)
    {
        _dbContext.Reviews.Add(review);
        return await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> UpdateReview(Review review)
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
            existingReview.OwnerId= review.OwnerId;

            await _dbContext.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> DeleteReview(int id)
    {
        var review = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
        if (review != null)
        {
            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
