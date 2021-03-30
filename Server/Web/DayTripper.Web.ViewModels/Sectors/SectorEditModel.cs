using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Sectors
{
    public class SectorEditModel
    {
        public int SectorId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

        public int CragId { get; set; }
    }
}
