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
