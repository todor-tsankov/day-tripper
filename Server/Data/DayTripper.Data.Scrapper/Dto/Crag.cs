using System.Collections.Generic;

namespace DayTripper.Data.Scrapper.Dto
{
    public class Crag
    {
        public Crag()
        {
            this.Sectors = new HashSet<Sector>();
        }

        public string Name { get; set; }

        public ICollection<Sector> Sectors { get; set; }
    }
}
