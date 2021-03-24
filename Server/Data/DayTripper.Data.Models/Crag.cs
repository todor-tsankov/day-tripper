using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Crag : BaseDeletableModel<int>
    {
        public Crag()
        {
            this.Sectors = new HashSet<Sector>();
        }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public int AreaId { get; set; }

        [Required]
        public Area Area { get; set; }

        public virtual ICollection<Sector> Sectors { get; set; }
    }
}
