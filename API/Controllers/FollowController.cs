using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using Application.Followers;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username){
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername = username}));
        }
        
        
    }
}