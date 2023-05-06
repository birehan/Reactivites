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
using AutoMapper;

namespace Application.Comments

{
    public class CreateComment
    {
        public class Command : IRequest<Result<CommentDto>>
        {

            public string Body { get; set; }

            public Guid ActivityId { get; set; }

        }

        public class CommentValidator : AbstractValidator<Comment>
        {
            
            public CommentValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
                // RuleFor(x => x.Description).NotEmpty();
            }
        }
        

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());



                var comment = new Comment
                {
                    Author = user,
                    Body = request.Body,
                    Activity = activity
                };

                activity.Comments.Add(comment);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<CommentDto>.Failure("Failed to add Commmet");

                return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
            }
        }
    }

}