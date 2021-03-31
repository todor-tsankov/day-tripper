﻿using System.Threading.Tasks;

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

        public ApplicationUsersService(
            IDeletableEntityRepository<ApplicationUser> usersRepository,
            IMapper mapper,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            : base(usersRepository, mapper)
        {
            this.usersRepository = usersRepository;
            this.mapper = mapper;
        }

        public Task Edit(EditInputModel editInput)
        {
            throw new System.NotImplementedException();
        }

        public Task Login(LoginInputModel loginInput)
        {
            throw new System.NotImplementedException();
        }

        public Task Logout()
        {
            throw new System.NotImplementedException();
        }

        public Task Register(RegisterInputModel registerInput)
        {
            throw new System.NotImplementedException();
        }
    }
}
