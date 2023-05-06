using Domain;
﻿using FluentValidation;

namespace Application.Comments
{
    public class CommentValidator : AbstractValidator<Comment>
    {
        
        public CommentValidator()
        {
            RuleFor(x => x.Body).NotEmpty();
            // RuleFor(x => x.Description).NotEmpty();
        }
    }
}