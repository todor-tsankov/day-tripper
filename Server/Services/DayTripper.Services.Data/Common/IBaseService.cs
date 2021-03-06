using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Data.Common.Models;

namespace DayTripper.Services.Data.Common
{
    public interface IBaseService<TModel>
        where TModel : class, IDeletableEntity
    {
        int Count(Expression<Func<TModel, bool>> predicate = null);

        bool Exists(Expression<Func<TModel, bool>> predicate);

        T GetSingle<T>(Expression<Func<TModel, bool>> predicate);

        IEnumerable<T> GetMany<T>(
           Expression<Func<TModel, bool>> predicate = null,
           Expression<Func<TModel, object>> orderBySelector = null,
           bool asc = true,
           int? skip = null,
           int? take = null);

        IEnumerable<T> GetManyExtended<T>(
            Expression<Func<TModel, bool>>[] predicates = null,
            Expression<Func<TModel, object>> orderBySelector = null,
            bool asc = true,
            int? skip = null,
            int? take = null);

        Task AddAsync(object inputModel);

        Task DeleteAsync(Expression<Func<TModel, bool>> predicate);
    }
}
