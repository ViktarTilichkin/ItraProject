namespace Server.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int Grade { get; set; }
        public string Genre { get; set; }
        public string ImageLink { get; set; }
        public int OwnerId { get; set; }
    }
}
