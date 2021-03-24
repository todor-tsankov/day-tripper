using System.Collections.Generic;

namespace DayTripper.Data.Scrapper.Dto
{
    public class Area
    {
        public Area()
        {
            this.Crags = new HashSet<Crag>();
        }

        public string Name { get; set; }

        public ICollection<Crag> Crags { get; set; }
    }
}
