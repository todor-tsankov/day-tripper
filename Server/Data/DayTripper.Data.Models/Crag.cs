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
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }

        public virtual ICollection<Sector> Sectors { get; set; }
    }
}
