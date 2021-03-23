using System.Collections.Generic;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Crag : BaseDeletableModel<int>
    {
        public Crag()
        {
            this.Sectors = new HashSet<Sector>();
        }

        public string Name { get; set; }

        public virtual ICollection<Sector> Sectors { get; set; }
    }
}
