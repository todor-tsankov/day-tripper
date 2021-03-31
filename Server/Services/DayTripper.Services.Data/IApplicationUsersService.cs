using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Users;

namespace DayTripper.Services.Data
{
    public interface IApplicationUsersService : IBaseService<ApplicationUser>
    {
        Task Login(LoginInputModel loginInput);

        Task Register(RegisterInputModel registerInput);

        Task Logout();

        Task Edit(EditInputModel editInput);
    }
}
