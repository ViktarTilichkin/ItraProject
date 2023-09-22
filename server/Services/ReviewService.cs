using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReviewService : IReviewService
{
    private readonly YourDbContext _dbContext;

    public ReviewService(YourDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Review>> GetAllReviewsAsync()
    {
        return await _dbContext.Reviews.ToListAsync();
    }

    public async Task<Review> GetReviewByIdAsync(int id)
    {
        return await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task CreateReviewAsync(Review review)
    {
        _dbContext.Reviews.Add(review);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateReviewAsync(int id, Review review)
    {
        var existingReview = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
        if (existingReview != null)
        {
            // Update the properties of the existing review with the new values
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

    public async Task DeleteReviewAsync(int id)
    {
        var review = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == id);
        if (review != null)
        {
            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();
        }
    }
}
