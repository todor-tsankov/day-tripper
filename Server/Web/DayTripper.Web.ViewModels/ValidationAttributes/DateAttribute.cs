using System;
using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.ValidationAttributes
{
    public class DateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is not DateTime dateTime)
            {
                return new ValidationResult("The given date is not a date!");
            }

            if (dateTime < DateTime.UtcNow)
            {
                return new ValidationResult($"Date cannot be in the past!");
            }

            return ValidationResult.Success;
        }
    }
}
