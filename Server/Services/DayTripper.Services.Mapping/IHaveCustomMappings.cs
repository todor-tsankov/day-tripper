using AutoMapper;

namespace DayTripper.Services.Mapping
{
    public interface IHaveCustomMappings
    {
        void CreateMappings(IProfileExpression configuration);
    }
}
