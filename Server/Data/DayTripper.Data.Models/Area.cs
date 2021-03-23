using System.Collections.Generic;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Area : BaseDeletableModel<int>
    {
        public Area()
        {
            this.Crags = new HashSet<Crag>();
        }

        public string Name { get; set; }

        public virtual ICollection<Crag> Crags { get; set; }
    }
}
