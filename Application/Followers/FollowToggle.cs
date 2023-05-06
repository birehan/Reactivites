using System.Runtime.Intrinsics.X86;
using System.Net.Mime;
using System.Diagnostics.Contracts;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;
using Application.Interfaces;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {

            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetUsername());
                
                var target = await _context.Users.FirstOrDefaultAsync(
                    x => x.UserName == request.TargetUsername);
                
                if(target == null) return null;

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id); 
                if(following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };
                 _context.UserFollowings.Add(following);

                }
                else{
                    _context.UserFollowings.Remove(following);
                }
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to toggle follow.");
               
            }
        }
    }

}