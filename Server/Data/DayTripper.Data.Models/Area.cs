using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Area : BaseDeletableModel<int>
    {
        public Area()
        {
            this.Crags = new HashSet<Crag>();
        }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual ICollection<Crag> Crags { get; set; }
    }
}
