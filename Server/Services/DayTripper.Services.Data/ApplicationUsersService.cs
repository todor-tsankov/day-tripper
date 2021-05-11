using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Users;
using Microsoft.AspNetCore.Identity;

namespace DayTripper.Services.Data
{
    public class ApplicationUsersService : BaseService<ApplicationUser>, IApplicationUsersService
    {
        private readonly IDeletableEntityRepository<ApplicationUser> usersRepository;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;

        public ApplicationUsersService(
            IDeletableEntityRepository<ApplicationUser> usersRepository,
            IMapper mapper,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            : base(usersRepository, mapper)
        {
            this.usersRepository = usersRepository;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        public async Task EditAsync(EditInputModel editInput)
        {
            var user = this.usersRepository
                .All()
                .First(x => x.Id == editInput.Id);

            user.FirstName = editInput.FirstName;
            user.LastName = editInput.LastName;
            user.SmsNotifications = editInput.SmsNotifications;
            user.EmailNotifications = editInput.EmailNotifications;
            user.FacebookNotifications = editInput.FacebookNotifications;

            await this.usersRepository.SaveChangesAsync();
        }

        public async Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var result = await this.userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            return result.Succeeded;
        }
    }
}
