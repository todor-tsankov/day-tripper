﻿using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class City : BaseDeletableModel<int>
    {
        public string Name { get; set; }
    }
}
