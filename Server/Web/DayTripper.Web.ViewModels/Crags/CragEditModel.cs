using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Crags
{
    public class CragEditModel
    {
        public int CragId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

        public int AreaId { get; set; }
    }
}
